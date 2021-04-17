/* eslint-disable no-inner-declarations */
const uuidv4 = require('uuid/v4');

export module Utils {

    export function Is(a: any, ...b: any) {
        for (const n of b) {
            if (a == n) {
                return true;
            }
        }
        return false;
    }

    // Inclusive when floor = true
    export function Random(a?: number, b?: number, floor?: boolean) {
        if (a == null) { a = 0; b = 1; }
        if (b == null) { b = 0; }

        const r = a + Math.random() * (b - a + (floor ? 1 : 0));
        return floor ? Math.floor(r) : r;
    }

    export function Coin() {
        return Math.random() >= .5;
    }

    export function Chance(n: number) {
        return Utils.Random(0, 100) <= n;
    }

    export function Dice(n: number) {
        return Utils.Random(1, n, true);
    }

    // Boolean to bit - true = 1, false = 0
    export function Bit(bool: boolean) {
        return bool ? 1 : 0;
    }

    export function Bool(int: number) {
        return int != 0;
    }

    export function UUID() {
        return uuidv4();
    }

    export function ObjectToArray(obj: any) {
        var arr = [];
        for (const key in obj) {
            arr.push(key);
            arr.push(obj[key]);
        }
        return arr;
    }

    export function ArrayToObject(arr: Array<any>) {
        var obj: any = {};
        for (let i = 0; i < arr.length; i += 2) {
            obj[arr[i]] = arr[i + 1];
        }
        return obj;
    }

    export function GetNow() {
        const date = new Date;
        return date;
    }

    export function GetDateOrNull(date: string) {
        if (date == null) {
            return null;
        }

        return new Date(date);
    }

    export function ConvertDateToUtc(date: Date) {
        if (date == null) {
            return null;
        }

        if (date.getUTCDate == null) {
            date = new Date(date);
        }

        date.setDate(date.getUTCDate());
        date.setHours(date.getUTCHours());

        return date;
    }

    // SQL safe Date
    export function GetNowString() {
        return Utils.GetNow().toISOString();
    }

    export function GetDateAsString(date: Date) {
        if (date == null || date.toISOString == null) {
            return null;
        }

        return date.toISOString();
    }

    export function GetDateAsUserFriendlyString(date: Date) {
        if (date == null || date.toISOString == null) {
            return null;
        }

        var isoString = date.toISOString();
        return isoString.replace('T', ' ').slice(0, -5);
    }

    export function GetDateDifferenceInSeconds(a: Date, b: Date) {
        return (b.getTime() - a.getTime()) / 1000;
    }

    export function GetSecondsInMinutes(n: number) {
        return Math.ceil(n / 60);
    }

    export function GetSecondsInMinutesAndSeconds(n: number) {
        const f = Math.floor(n / 60);
        if (f == 0) {
            return `${n} seconds`;
        }

        return `${f} ${f == 1 ? 'minute' : 'minutes'}${(n / 60 != f) ? ` and ${(n - (f) * 60)} seconds` : ''}`;
    }

    export function GetMinutesInSeconds(n: number) {
        return n * 60;
    }

    export function GetHoursInSeconds(n: number) {
        return n * 60 * 60;
    }

    export function GetSecondsInHours(n: number) {
        return n * 60 * 60;
    }

    export function GetMinutesInMiliSeconds(n: number) {
        return n * 60 * 1000;
    }

    export function GetSecondsInMiliSeconds(n: number) {
        return n * 1000;
    }

    export function GetHoursInMiliSeconds(n: number) {
        return n * 60 * 60 * 1000;
    }

    export function ParseHour(hour: string) {
        const match = hour.match(/^(\d{1,2})(:\d{2}|\s?[pPaA][mM])?$/);
        if (match == null) {
            return null;
        } else {
            var time = parseInt(match[1]);
            if (time > 24) {
                return null;
            }
            if (match[2] != null) {
                const not = match[2].toLowerCase();

                if (not == 'pm' || not == 'am') {
                    if (time > 12) {
                        return null;
                    }
                }

                if (not == 'pm') {
                    if (time < 12) {
                        time += 12;
                    }
                } else if (not == 'am') {
                    if (time == 12) {
                        time = 0;
                    }
                }
            }
            return time;
        }
    }

    export async function Sleep(seconds: number) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }
}