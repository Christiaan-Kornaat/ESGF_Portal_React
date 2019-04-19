/**
 *
 * @param string
 * @return {boolean}
 */
export function isNullOrEmpty(string) {
    return (string == null || string === "");
}

export default {
    isNullOrEmpty: isNullOrEmpty
};