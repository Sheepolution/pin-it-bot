import IMessageInfo from '../Interfaces/IMessageInfo';
import { MessageReaction, Message, User } from 'discord.js';
import { Utils } from '../Utils/Utils';
import EmojiConstants from '../Constants/EmojiConstants';
import DiscordService from '../Services/DiscordService';

export default class ReactionManager {

    private static messages: any = {};

    public static AddMessage(message: Message, method: Function, messageInfo: IMessageInfo, values?: any, duration: number = 5) {
        const id = message.id;
        const timeout = setTimeout(async () => {
            if (!await DiscordService.CheckPermission(messageInfo, 'MANAGE_MESSAGES', 'unpin your message', false)) {
                return;
            }

            ReactionManager.OnTimeout(message);
        }, Utils.GetMinutesInMiliSeconds(duration));

        ReactionManager.messages[id] = { message: message, messageInfo: messageInfo, timeout: timeout, values: values, duration: duration, method: method };
    }

    public static OnReaction(reaction: MessageReaction, user: User) {
        const obj = ReactionManager.messages[reaction.message.id];
        if (obj == null) {
            return;
        }

        if (obj.messageInfo && user.id != obj.messageInfo.member.id && (!obj.requester || user.id != obj.requester.id)) {
            return;
        }

        clearTimeout(obj.timeout);

        obj.timeout = setTimeout(async () => {
            if (!await DiscordService.CheckPermission(obj.messageInfo, 'MANAGE_MESSAGES', 'unpin your message', false)) {
                return;
            }

            ReactionManager.OnTimeout(obj.message);
        }, Utils.GetMinutesInMiliSeconds(obj.duration));

        obj.method(obj, reaction);
    }

    public static OnTimeout(message: Message) {
        if (!message.deleted) {
            message.reactions.cache.find(r => r.emoji.name == EmojiConstants.PIN).remove();
        }

        delete ReactionManager.messages[message.id];
    }
}