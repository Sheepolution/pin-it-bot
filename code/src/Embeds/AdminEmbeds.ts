import { MessageEmbed } from 'discord.js';
import CommandConstants from '../Constants/CommandConstants';
import EmojiConstants from '../Constants/EmojiConstants';
import SettingsConstants from '../Constants/SettingsConstants';
import Guild from '../Objects/Guild';
import CommandService from '../Services/CommandService';

export default class AdminEmbeds {

    public static GetHelpEmbed(guild: Guild) {
        const embed = new MessageEmbed()
            .setColor(SettingsConstants.COLORS.DEFAULT)
            .setTitle('Help')
            .setDescription(`${SettingsConstants.BOT_NAME} is a Discord bot that allows members to pin their messages with attachments.

For information on how to set it up use ${CommandService.GetCommandString(guild, CommandConstants.COMMANDS.GUIDE[0])}.
For a list of all the commands use ${CommandService.GetCommandString(guild, CommandConstants.COMMANDS.COMMANDS[0])}.
For information about the developer use ${CommandService.GetCommandString(guild, CommandConstants.COMMANDS.DEVELOPER[0])}.

If you have a question or want to report a problem, you can contact the developer in the [support server](${SettingsConstants.SUPPORT_SERVER_INVITE_URL}).
You can use [this](${SettingsConstants.BOT_INVITE_URL}) link to add the bot to your own server.
`);
        return embed;
    }

    public static GetCommandsEmbed(guild: Guild) {
        const commands = CommandConstants.COMMANDS;

        const embed = new MessageEmbed()
            .setColor(SettingsConstants.COLORS.DEFAULT)
            .setTitle('Mod commands')
            .setDescription(`Words between [brackets] are 'parameters'. This is extra information you send to the bot. You don't type the brackets.
Example:
${CommandService.GetCommandString(guild, commands.PREFIX[0], ['prefix'])}
${guild.GetPrefix()}${commands.PREFIX[0]} !
`)
            .addField(CommandService.GetCommandString(guild, commands.PREFIX[0], ['prefix']), 'Set the prefix for the commands.', true)
            .addField(CommandService.GetCommandString(guild, commands.CHANNEL[0], ['\'add\'/\'remove\'']), 'Use this in a channel you want to add/remove as channel where members can pin their messages with attachments.', true)
            .addField(CommandService.GetCommandString(guild, commands.DONATE[0]), `Support the developer of this bot ${EmojiConstants.HEART}`, true);

        return embed;
    }

    public static GetGuideEmbed(guild: Guild) {
        const embed = new MessageEmbed()
            .setColor(SettingsConstants.COLORS.DEFAULT)
            .setTitle(`${SettingsConstants.BOT_NAME} Setup Guide`)
            .setDescription(`Follow these steps to setup your pin channel.
1. Use ${CommandService.GetCommandString(guild, CommandConstants.COMMANDS.CHANNEL[0], ['add'], true)} in the channels you want to set as the pin channels.
2. Optionally, you can use ${CommandService.GetCommandString(guild, CommandConstants.COMMANDS.ROLE[0], ['role'])} to restrict this feature to members with a certain role.
3. Members can now pin their messages with attachments in these channels by reacting to the ${EmojiConstants.PIN}.
4. If a member wants to unpin a message they can use ${CommandService.GetCommandString(guild, CommandConstants.COMMANDS.UNPIN[0])} to unpin their latest pinned message.

If you have a question or want to report a problem, you can contact the developer in the [support server](${SettingsConstants.SUPPORT_SERVER_INVITE_URL}).
`);

        return embed;
    }
}