import { TextChannel } from 'discord.js';
import SettingsConstants from '../Constants/SettingsConstants';
import { LogType } from '../Enums/LogType';
import LogModel from '../Models/LogModel';
import Guild from '../Objects/Guild';
import Discord from '../Providers/Discord';
import { Utils } from '../Utils/Utils';

export default class LogService {

    private static logChannel: TextChannel;

    public static async Log(logType: LogType, guild: Guild) {
        await LogModel.New(guild, logType);

        if (this.logChannel == null) {
            const logChannel = await Discord.GetClient().channels.fetch(SettingsConstants.LOG_CHANNEL_ID);
            this.logChannel = <TextChannel>logChannel;
        }

        this.logChannel.send(`${Utils.GetDateAsUserFriendlyString(new Date())} - ${logType}`);
    }
}