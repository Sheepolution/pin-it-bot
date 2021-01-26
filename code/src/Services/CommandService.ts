import SettingsConstants from '../Constants/SettingsConstants';

export default class CommandService {

    public static GetCommandString(command: string, args?: Array<string>) {
        var str = `\`${SettingsConstants.DEFAULT_PREFIX}${command}`;
        if (args != null) {
            for (const arg of args) {
                str += ` [${arg}]`;
            }
        }

        return `${str}\``;
    }
}