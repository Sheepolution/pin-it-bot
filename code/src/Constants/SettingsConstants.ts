export default class SettingsConstants {
    public static readonly BOT_ID = process.env.BOT_ID || '';
    public static readonly MASTER_ID = process.env.MASTER_ID || '';
    public static readonly LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID || '';

    public static readonly BOT_INVITE_URL = process.env.BOT_INVITE_URL || '';
    public static readonly SUPPORT_SERVER_INVITE_URL = process.env.SUPPORT_SERVER_INVITE_URL || '';

    public static readonly DONATION_PATREON_URL = 'https://www.patreon.com/sheepolution';
    public static readonly DONATION_PAYPAL_URL = 'https://www.paypal.com/donate?hosted_button_id=TZFSRNXR9FEEE';
    public static readonly DONATION_KOFI_URL = 'https://ko-fi.com/sheepolution';
    public static readonly DONATION_BMAC_URL = 'https://buymeacoffee.com/sheepolution';

    public static readonly COLORS = {
        BAD: '#ff0000',
        GOOD: '#00ff00',
        DEFAULT: '#29adff',
    };

    public static readonly DEFAULT_PREFIX = 'pin>';

    public static readonly BOT_NAME = 'Pin it!';

    public static readonly SPAM_EXPIRE_TIME = 5; // Seconds
    public static readonly CACHE_TIMEOUT_DEFAULT = 10;

    public static readonly MAX_PREFIX_LENGTH = 10;

    public static readonly MAX_PINS = 50;
}