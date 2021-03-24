export default class SettingsConstants {
    public static readonly BOT_ID = process.env.BOT_ID || '';
    public static readonly MASTER_ID = process.env.MASTER_ID || '';

    public static readonly BOT_INVITE_URL = process.env.BOT_INVITE_URL || '';
    public static readonly SUPPORT_SERVER_INVITE_URL = process.env.SUPPORT_SERVER_INVITE_URL || '';

    public static readonly DONATION_PAYPAL_URL = 'https://www.paypal.com/donate?hosted_button_id=TZFSRNXR9FEEE';
    public static readonly DONATION_KOFI_URL = 'https://ko-fi.com/sheepolution';
    public static readonly DONATION_BITCOIN_ADDRESS = 'bc1q306yynudpa5dd06ruhdfwft20d7y7e2rmd3pnyvvtzxxrxsjhxjsjjvl0v';
    public static readonly DONATION_GULDEN_ADDRESS = 'GKeikV3DUCzoG3RQuH6USV7UA2sxZhFdz5';

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