import { Message, User } from 'discord.js';
import IMessageInfo from '../Interfaces/IMessageInfo';
import RegexConstants from '../Constants/RegexConstants';
import ICommandInfo from '../Interfaces/ICommandInfo';

export default class DiscordUtils {

    public static IsId(id: string) {
        return id.match(RegexConstants.DISCORD_ID) != null;
    }

    public static GetMemberId(id: string) {
        if (this.IsId(id)) { return id; }

        var match = id.match(RegexConstants.MENTION);

        if (match) {
            return match[1];
        }

        return null;
    }

    public static GetChannelId(id: string) {
        if (this.IsId(id)) { return id; }

        var match = id.match(RegexConstants.CHANNEL);

        if (match) {
            return match[1];
        }

        return null;
    }

    public static ParseMessageToInfo(message: Message, user: User) {
        const info: IMessageInfo = {
            user: user,
            channel: message.channel,
            message: message,
            guild: message.guild || undefined,
            member: message.member || undefined,
        };

        return info;
    }

    public static ParseContentToCommand(content: string, prefix: string) {
        const words = content.split(' ');
        var command = words[0].substr(prefix.length).toLowerCase();
        if (command.includes('\n')) {
            const commandSplit = words[0].substr(prefix.length).split('\n');
            command = commandSplit[0].toLowerCase();

            content = content.replace('\n', ' ');

            words.shift();
            words.unshift(commandSplit[1]);
            words.unshift(command);
        }

        const info: ICommandInfo = {
            command: command,
            args: words,
            content: content,
        };

        return info;
    }

    public static ParseChannelMentionsToIds(channels: Array<string>) {
        const ret = new Array<string>();

        for (let i = 0; i < channels.length; i++) {
            const id = this.GetChannelId(channels[i]);
            if (id) {
                ret.push(id);
            }
        }

        return ret;
    }
}