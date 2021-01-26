interface String {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    toTitleCase(keep?: boolean): string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    replaceAll(search: string, replacement: string): string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    isFilled(): boolean;
}

interface Array<T> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    randomChoice(): T;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    shuffle(): T;
}

String.prototype.toTitleCase = function (keep?: boolean) {
    if (keep == true) {
        return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase(); });
    }
    return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};

String.prototype.replaceAll = function (search: string, replacement: string) {
    return this.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.isFilled = function () {
    return this.length > 0;
};

Array.prototype.randomChoice = function () {
    return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.shuffle = function () {
    var j, x, i;
    for (i = this.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = this[i];
        this[i] = this[j];
        this[j] = x;
    }

    return this;
}