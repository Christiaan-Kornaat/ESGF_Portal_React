export class SorterFactoryFactory {
    /**
     * @param {function(*): {
     *  isLessThan: (function(*): boolean),
     *  isGreaterThan: (function(*): boolean),
     *  isEqualTo:(function(*): boolean)
     * }} comparator
     * @summary Creates a sort function using a comparator
     * @returns {function(function(
     * {
     *  isLessThan: (function(*): boolean),
     *  isGreaterThan: (function(*): boolean),
     *  isEqualTo:(function(*): boolean)
     * }): function(boolean): function(Array): Array)} function
     */
    createSorterFactory(comparator) {
        return (ascending) => this.createSorter(ascending, comparator);
    }

    /**
     *
     * @param {boolean}ascending
     * @param  {function(*): {
     *  isLessThan: (function(*): boolean),
     *  isGreaterThan: (function(*): boolean),
     *  isEqualTo:(function(*): boolean)
     * }} comparator
     * @return {function(Array): Array}
     */
    createSorter(ascending, comparator) {
        let condition = (item, item2) => (ascending ?
            (comparator(item).isGreaterThan(item2)) :
            (comparator(item).isLessThan(item2)));

        let sortMethod = (item1, item2) => !comparator(item1).isEqualTo(item2) ?
            (condition(item1, item2) ? 1 : -1) : 0;

        return array => array.sort(sortMethod);
    };
}