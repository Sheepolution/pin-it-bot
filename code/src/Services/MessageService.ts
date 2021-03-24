import DiscordService from './DiscordService';
import IMessageInfo from '../Interfaces/IMessageInfo';
import { TextChannel, MessageEmbed } from 'discord.js';
import EmojiConstants from '../Constants/EmojiConstants';

export default class MessageService {

    public static async ReplyMessage(messageInfo: IMessageInfo, text: string, good?: boolean, mention?: boolean, embed?: MessageEmbed) {
        if (good != null) {
            text = (good ? EmojiConstants.STATUS.GOOD : EmojiConstants.STATUS.BAD) + ' ' + text;
        }

        if (mention) {
            return DiscordService.ReplyMessage(<TextChannel>messageInfo.channel, messageInfo.user, text, embed);
        } else {
            return DiscordService.SendMessage(<TextChannel>messageInfo.channel, text, embed);
        }
    }

    public static async ReplyEmbed(messageInfo: IMessageInfo, embed: MessageEmbed, text?: string) {
        return DiscordService.SendEmbed(messageInfo.channel, embed, text);
    }

    private static async SendMessage(channel: TextChannel, text: string, embed?: MessageEmbed) {
        return await DiscordService.SendMessage(channel, text, embed);
    }
}
