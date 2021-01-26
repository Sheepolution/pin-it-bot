import CommandHandler from '../Handlers/CommandHandler';
import IMessageInfo from '../Interfaces/IMessageInfo';
import { Message, MessageReaction, User } from 'discord.js';
import DiscordUtils from '../Utils/DiscordUtils';
import SettingsConstants from '../Constants/SettingsConstants';
import MessageHandler from '../Handlers/MessageHandler';
import ReactionManager from './ReactionManager';

export default class BotManager {

    public static async OnReady() {
        console.log(`${SettingsConstants.BOT_NAME}: Connected`);
    }

    public static async OnMessage(message: Message) {
        if (message.channel.type == 'dm') {
            return;
        }

        const messageInfo: IMessageInfo = DiscordUtils.ParseMessageToInfo(message, message.author);
        var content = message.content.trim();

        if (content.startsWith(SettingsConstants.DEFAULT_PREFIX)) {
            CommandHandler.OnCommand(messageInfo, content);
        } else {
            MessageHandler.OnMessage(messageInfo);
        }
    }

    public static async OnReaction(reaction: MessageReaction, user: User) {
        if (user.id == SettingsConstants.BOT_ID) {
            return;
        }

        ReactionManager.OnReaction(reaction, user);
    }
}
