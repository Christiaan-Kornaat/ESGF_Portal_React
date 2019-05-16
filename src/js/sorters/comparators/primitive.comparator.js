/**
 * Returns object that takes an item and compares it to others through the methods isGreaterThan, isLessThan,
 * isEqualTo.
 *
 * @param {string} item
 *
 * @return {{isLessThan: (function(string): boolean), isGreaterThan: (function(string): boolean), isEqualTo:
 *     (function(string): boolean)}}
 */
export function alphabeticalComparator(item) {
    let _isGreaterThan = (item2) => item.localeCompare(item2) === 1;
    let _isLessThan = (item2) => item.localeCompare(item2) === -1;
    let _isEqualTo = (item2) => item.localeCompare(item2) === 0;

    return {
        isGreaterThan: _isGreaterThan,
        isLessThan: _isLessThan,
        isEqualTo: _isEqualTo
    };
}

/**
 *
 * @param {string} item
 *
 * @return {{isLessThan: (function(string): boolean), isGreaterThan: (function(string): boolean), isEqualTo:
 *     (function(string): boolean)}}
 */
export function alphabeticalIgnoreCaseComparator(item) {
    let base = alphabeticalComparator(item.toLowerCase());

    return {
        isGreaterThan: (item2) => base.isGreaterThan(item2.toLowerCase()),
        isLessThan: (item2) => base.isLessThan(item2.toLowerCase()),
        isEqualTo: (item2) => base.isEqualTo(item2.toLowerCase())
    };
}