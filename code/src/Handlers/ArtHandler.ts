import IMessageInfo from '../Interfaces/IMessageInfo';
import ReactionManager from '../Managers/ReactionManager';
import { Utils } from '../Utils/Utils';
import { MessageReaction, TextChannel } from 'discord.js';
import SettingsConstants from '../Constants/SettingsConstants';
import EmojiConstants from '../Constants/EmojiConstants';

export default class ArtHandler {
    public static async OnReaction(obj: any, reaction: MessageReaction) {
        if (reaction.emoji.name == EmojiConstants.PIN) {
            obj.messageInfo.message.reactions.removeAll();
            await this.PinArt(obj.messageInfo);
        }
    }

    public static async AddPinReaction(messageInfo: IMessageInfo) {
        if (messageInfo.message == null) {
            return;
        }

        messageInfo?.message.react(EmojiConstants.PIN);

        ReactionManager.AddMessage(messageInfo?.message, messageInfo, null, 1);
    }

    public static async PinArt(messageInfo: IMessageInfo) {
        const pinned = await (<TextChannel>messageInfo.channel).messages.fetchPinned(true);
        const pinnedArray = pinned.array();
        if (pinnedArray.length >= SettingsConstants.MAX_PINS) {
            pinnedArray.sort((a, b) => {
                return a.createdTimestamp - b.createdTimestamp;
            })
            await pinnedArray[0].unpin();
        }

        await Utils.Sleep(1);
        await messageInfo.message?.pin();
    }
}