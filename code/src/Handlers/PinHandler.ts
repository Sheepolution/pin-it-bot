import IMessageInfo from '../Interfaces/IMessageInfo';
import ReactionManager from '../Managers/ReactionManager';
import { Utils } from '../Utils/Utils';
import { MessageReaction, TextChannel } from 'discord.js';
import SettingsConstants from '../Constants/SettingsConstants';
import EmojiConstants from '../Constants/EmojiConstants';
import CommandConstants from '../Constants/CommandConstants';
import CommandManager from '../Managers/CommandManager';
import LogService from '../Services/LogService';
import { LogType } from '../Enums/LogType';
import Guild from '../Objects/Guild';
import DiscordService from '../Services/DiscordService';

export default class PinHandler {

    public static async OnReaction(obj: any, reaction: MessageReaction) {
        if (reaction.emoji.name == EmojiConstants.PIN) {
            obj.messageInfo.message.reactions.removeAll();
            await PinHandler.PinMessage(obj.messageInfo, obj.values.guild);
        }
    }

    public static AddPinReaction(messageInfo: IMessageInfo, guild: Guild) {
        if (!DiscordService.CheckPermission(messageInfo, 'ADD_REACTIONS')) {
            return;
        }

        if (messageInfo.message == null) {
            return;
        }

        messageInfo?.message.react(EmojiConstants.PIN);
        ReactionManager.AddMessage(messageInfo?.message, PinHandler.OnReaction, messageInfo, { guild: guild }, 1);
    }

    public static async PinMessage(messageInfo: IMessageInfo, guild: Guild) {
        if (!DiscordService.CheckPermission(messageInfo, 'MANAGE_MESSAGES', 'pin your message')) {
            return;
        }

        const pinned = await (<TextChannel>messageInfo.channel).messages.fetchPinned(true);
        const pinnedArray = pinned.array();
        if (pinnedArray.length >= SettingsConstants.MAX_PINS) {
            pinnedArray.sort((a, b) => {
                return a.createdTimestamp - b.createdTimestamp;
            });
            await pinnedArray[0].unpin();
        }

        await Utils.Sleep(1);
        await messageInfo.message?.pin();
        LogService.Log(LogType.MessagePinned, guild);
    }

    public static OnCommand(messageInfo: IMessageInfo, guild: Guild) {
        const commands = CommandConstants.COMMANDS;

        switch (messageInfo.commandInfo.commands) {
            case commands.UNPIN:
                this.OnUnpin(messageInfo, guild);
                break;
            default: return false;
        }

        return true;
    }

    private static async OnUnpin(messageInfo: IMessageInfo, guild: Guild) {
        if (!DiscordService.CheckPermission(messageInfo, 'MANAGE_MESSAGES', 'unpin your message')) {
            return;
        }

        const pinned = await (<TextChannel>messageInfo.channel).messages.fetchPinned(true);
        const pinnedArray = pinned.array();
        if (pinnedArray.length > 0) {
            pinnedArray.sort((a, b) => {
                return b.createdTimestamp - a.createdTimestamp;
            });

            for (const message of pinnedArray) {
                if (message.author.id == messageInfo.user.id) {
                    message.unpin();
                    messageInfo.message.react(EmojiConstants.STATUS.GOOD).catch();
                    LogService.Log(LogType.MessageUnpinned, guild);
                    return;
                }
            }

            messageInfo.message.react(EmojiConstants.STATUS.BAD).catch();
        }

        CommandManager.SetCooldown(messageInfo, 10);
    }
}