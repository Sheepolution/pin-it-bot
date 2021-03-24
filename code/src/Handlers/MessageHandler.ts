import IMessageInfo from '../Interfaces/IMessageInfo';
import Guild from '../Objects/Guild';
import ChannelRepository from '../Repositories/ChannelRepository';
import PinHandler from './PinHandler';

export default class MessageHandler {

    public static async OnMessage(messageInfo: IMessageInfo, guild: Guild) {
        if (messageInfo.guild == null) {
            return;
        }

        const channel = await ChannelRepository.GetByDiscordId(messageInfo.channel.id);

        if (channel == null) {
            return;
        }

        this.OnPostingAttachment(messageInfo, guild);
    }

    private static OnPostingAttachment(messageInfo: IMessageInfo, guild: Guild) {
        const attachment = messageInfo.message?.attachments.first();
        if (attachment == null || attachment.width == null || attachment.width == 0) {
            return;
        }

        const roleId = guild.GetRoleId();

        if (roleId != null) {
            if (!messageInfo.member.roles.cache.find(r => r.id == roleId)) {
                return;
            }
        }

        PinHandler.AddPinReaction(messageInfo, guild);
    }
}
