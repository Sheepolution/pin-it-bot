import { MessageEmbed } from 'discord.js';
import CommandConstants from '../Constants/CommandConstants';
import EmojiConstants from '../Constants/EmojiConstants';
import SettingsConstants from '../Constants/SettingsConstants';
import CommandService from '../Services/CommandService';

export default class AdminEmbeds {

    public static GetHelpEmbed() {
        const embed = new MessageEmbed()
            .setColor(SettingsConstants.COLORS.DEFAULT)
            .setTitle('Help')
            .setDescription(`When someone sends a message with an attachment, they can click on the ${EmojiConstants.PIN} reaction to have the bot pin the message.`)
            .addField(CommandService.GetCommandString(CommandConstants.ADMIN.ADD[0]), 'Add the channel where this command is used to the list of channels where the bot is active.', true)
            .addField(CommandService.GetCommandString(CommandConstants.ADMIN.REMOVE[0]), 'Remove the channel where this command is used from the list of channels where the bot is active.', true);

        return embed;
    }
}