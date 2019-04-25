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

export default {
    isNullOrEmpty: isNullOrEmpty,
    firstToUpper: firstToUpper
};