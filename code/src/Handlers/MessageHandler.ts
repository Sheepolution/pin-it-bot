import ArtHandler from './ArtHandler';
import IMessageInfo from '../Interfaces/IMessageInfo';
import RedisConstants from '../Constants/RedisConstants';
import { Redis } from '../Providers/Redis';

export default class MessageHandler {

    private static readonly channelPrefix = RedisConstants.REDIS_KEY + RedisConstants.CHANNEL_KEY;

    public static async OnMessage(messageInfo: IMessageInfo) {
        if (messageInfo.guild == null) {
            return;
        }

        if (messageInfo.message.attachments.size == 0) {
            return;
        }

        if (await Redis.get(`${this.channelPrefix}${messageInfo.channel.id}`) != 1) {
            return;
        }

        this.OnPostingArt(messageInfo);
    }

    private static OnPostingArt(messageInfo: IMessageInfo) {
        const attachment = messageInfo.message?.attachments.first();
        if (attachment == null || !['.png', 'jpeg', '.jpg'].includes(attachment.name?.toLowerCase().slice(-4) || '')) {
            return;
        }

        ArtHandler.AddPinReaction(messageInfo);
    }
}
