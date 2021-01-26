import DiscordService from './DiscordService';
import IMessageInfo from '../Interfaces/IMessageInfo';
import { TextChannel, MessageEmbed } from 'discord.js';
import EmojiConstants from '../Constants/EmojiConstants';

export default class MessageService {

    public static async ReplyMessage(messageInfo: IMessageInfo, message: string, good?: boolean, mention?: boolean, embed?: MessageEmbed) {
        if (good != null) {
            message = (good ? EmojiConstants.STATUS.GOOD : EmojiConstants.STATUS.BAD) + ' ' + message;
        }
        if (mention) {
            return DiscordService.ReplyMessage(<TextChannel>messageInfo.channel, messageInfo.user, message, embed)
        } else {
            return DiscordService.SendMessage(<TextChannel>messageInfo.channel, message, embed)
        }
    }

    public static async ReplyEmbed(messageInfo: IMessageInfo, embed: MessageEmbed, message?: string) {
        return DiscordService.SendEmbed(messageInfo.channel, embed, message)
    }

    public static async SendMessageToDM(messageInfo: IMessageInfo, message: string, embed?: MessageEmbed) {
        const dmChannel = messageInfo.user.dmChannel || await messageInfo.user.createDM();
        return DiscordService.SendMessage(dmChannel, message, embed);
    }

    public static async SendMessageToDMById(id: string, message: string, embed?: MessageEmbed) {
        const user = await DiscordService.FindUserById(id)
        if (user != null) {
            const dmChannel = user.dmChannel || await user.createDM();
            return await DiscordService.SendMessage(dmChannel, message, embed);
        }
    }

    private static async SendMessage(channel: TextChannel, message: string, embed?: MessageEmbed) {
        return await DiscordService.SendMessage(channel, message, embed)
    }
}
