/**
 *
 * @param string
 * @return {boolean}
 */
export function isNullOrEmpty(string) {
    return (string == null || string === "");
}

/**
 *
 * @param {string}string
 * @return {string}
 */
export function firstToUpper(string) {
    return string && string.length > 0 ?
        string.charAt(0)
              .toLocaleUpperCase() + string.slice(1) : "";
}

/**
 *
 * @param {string}string
 * @return {string}
 */
export function firstToLower(string) {
    return string && string.length > 0 ?
        string.charAt(0)
              .toLocaleLowerCase() + string.slice(1) : "";
}

export function trimCharsLeft(string, ...charsToTrim) {
    let regex = new RegExp("^" + charsToTrim.join("|"), "g");
    return string.replace(regex, "");
}

export function trimCharsRight(string, ...charsToTrim) {
    let regex = new RegExp(charsToTrim.join("|") + "$", "g");
    return string.replace(regex, "");
}

export function trimChars(string, ...charsToTrim) {
    return trimCharsRight(trimCharsLeft(string, charsToTrim), charsToTrim);
}