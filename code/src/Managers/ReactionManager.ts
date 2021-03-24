import IMessageInfo from '../Interfaces/IMessageInfo';
import { MessageReaction, Message, User } from 'discord.js';
import { Utils } from '../Utils/Utils';

export default class ReactionManager {

    private static messages: any = {};

    public static AddMessage(message: Message, method: Function, messageInfo?: IMessageInfo, values?: any, duration: number = 5) {
        const id = message.id;
        const timeout = setTimeout(() => {
            message.reactions.removeAll().catch();
            delete ReactionManager.messages[id];
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

        obj.timeout = setTimeout(() => {
            obj.message.reactions.removeAll().catch();
            delete ReactionManager.messages[obj.message.id];
        }, Utils.GetMinutesInMiliSeconds(obj.duration));

        obj.method(obj, reaction);
    }
}