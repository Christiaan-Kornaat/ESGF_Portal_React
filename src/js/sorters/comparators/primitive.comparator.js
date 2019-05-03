/**
 * Returns object that takes an item and compares it to others through the methods isGreaterThan, isLessThan, isEqualTo.
 *
 * @param {string} item
 *
 * @return {{isLessThan: (function(ESGFFilterDTO): boolean), isGreaterThan: (function(ESGFFilterDTO): boolean),
 *     isEqualTo: (function(ESGFFilterDTO): boolean)}}
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