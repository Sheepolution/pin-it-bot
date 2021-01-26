import IMessageInfo from '../Interfaces/IMessageInfo';
import SettingsConstants from '../Constants/SettingsConstants';
import AdminHandler from './AdminHandler';
import DiscordService from '../Services/DiscordService';
import DiscordUtils from '../Utils/DiscordUtils';

export default class CommandHandler {

    public static async OnCommand(messageInfo: IMessageInfo, content: string) {
        const commandInfo = DiscordUtils.ParseContentToCommand(content, SettingsConstants.DEFAULT_PREFIX);

        if (messageInfo.member != null) {
            if (DiscordService.IsMemberAdmin(messageInfo.member)) {
                if (await AdminHandler.OnCommand(messageInfo, commandInfo)) {
                    return;
                }
            }
        }
    }
}
