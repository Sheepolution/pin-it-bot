import CommandConstants from '../Constants/CommandConstants';
import RedisConstants from '../Constants/RedisConstants';
import AdminEmbeds from '../Embeds/AdminEmbeds';
import ICommandInfo from '../Interfaces/ICommandInfo';
import IMessageInfo from '../Interfaces/IMessageInfo';
import { Redis } from '../Providers/Redis';
import MessageService from '../Services/MessageService';

export default class AdminHandler {

    private static readonly channelPrefix = RedisConstants.REDIS_KEY + RedisConstants.CHANNEL_KEY;

    public static async OnCommand(messageInfo: IMessageInfo, commandInfo: ICommandInfo) {
        const commands = CommandConstants.ADMIN;
        const command = commandInfo.command;

        if (commands.HELP.includes(command)) {
            this.OnHelp(messageInfo);
        } else if (commands.ADD.includes(command)) {
            this.OnAdd(messageInfo);
        } else if (commands.REMOVE.includes(command)) {
            this.OnRemove(messageInfo);
        } else {
            return false;
        }

        return true;
    }

    private static async OnHelp(messageInfo: IMessageInfo) {
        MessageService.ReplyEmbed(messageInfo, AdminEmbeds.GetHelpEmbed());
    }

    private static async OnAdd(messageInfo: IMessageInfo) {
        Redis.set(`${this.channelPrefix}${messageInfo.channel.id}`, 1);
        MessageService.ReplyMessage(messageInfo, 'The bot will now allow people to pin messages with attachments in this channel.', true, true);
    }

    private static async OnRemove(messageInfo: IMessageInfo) {
        Redis.del(`${this.channelPrefix}${messageInfo.channel.id}`);
        MessageService.ReplyMessage(messageInfo, 'The bot will not allow message to be pinned in this channel anymore.', true, true);
    }
}
