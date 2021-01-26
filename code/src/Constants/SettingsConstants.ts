export default class SettingsConstants {
    public static readonly BOT_ID = process.env.BOT_ID || '';
    public static readonly SUPPORT_SERVER_INVITE_URL = process.env.SUPPORT_SERVER_INVITE_URL || '';

    public static readonly COLORS = {
        BAD: '#ff0000',
        GOOD: '#00ff00',
        DEFAULT: '#e33030',
    }

    public static readonly DEFAULT_PREFIX = 'pin!';

    public static readonly BOT_NAME = 'Pin it!';

    public static readonly MAX_PINS = 50;
}
