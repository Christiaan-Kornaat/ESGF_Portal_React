class SelectedPropertyManager {

    constructor() {
        this.properties = []; //awaiting private variables in ESNext (or planning to go to TypeScript)

        this.isSelected = this.isSelected.bind(this);
        this.select = this.select.bind(this);
        this.deselect = this.deselect.bind(this);
    }

    /**
     *
     * @param {string}property
     */
    select(property) {
        if (this.isSelected(property)) return;

        this.properties.push(property);
    };

    /**
     *
     * @param {array}properties
     */
    selectMany(properties) {
        properties.forEach(this.select);
    };

    /**
     *
     * @param {string}property
     */
    deselect(property) {
        if (!this.isSelected(property)) return;

        this.properties = this.properties.filter(item => item !== property);
    };

    /**
     *
     * @param {array}properties
     */
    deselectMany(properties) {
        properties.forEach(this.deselect);
    };

    /**
     *
     * @param {string} property
     * @return {boolean}
     */
    isSelected(property) {
        return this.properties.includes(property);
    }

    get selected() {
        return this.properties;
    }
}

export default SelectedPropertyManager;