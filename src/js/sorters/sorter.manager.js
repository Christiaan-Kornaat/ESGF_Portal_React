export default class SorterManager {

    /**
     *
     * @param {Map<String,
     * function(function(boolean): function(Array): Array)>?} sorterFactoryMap
     * @param {string?}defaultKey
     * @param {boolean?} defaultAscending
     */
    constructor(sorterFactoryMap = new Map(), defaultKey = null, defaultAscending = true) {

        this.sorters = sorterFactoryMap;

        this.ascending = defaultAscending;

        this.currentSorterKey = defaultKey;
    }

    invert() {
        this.ascending = !this.ascending;
    }

    /**
     * @param {string}sorterName
     * @param {function(function(boolean): function(Array): Array)} sorterFactory
     */
    addSorter(sorterName, sorterFactory) {
        this.sorters.set(sorterName, sorterFactory);
    }

    /**
     * @param {string} sorterName
     */
    removeSorter(sorterName) {
        this.sorters.delete(sorterName);
    }

    /**
     * @param {string} sorterName
     * @return {boolean} successful
     */
    changeSorter(sorterName) {
        if (!Array.from(this.sorters.keys()).includes(sorterName)) return false;

        this.currentSorterKey = sorterName;
        return true;
    }

    getCurrent() {
        return this.currentSorterKey ? this.sorters.get(this.currentSorterKey)(this.ascending) : null;
    }
}