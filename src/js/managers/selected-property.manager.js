class SelectedPropertyManager {

    constructor() {
        this.properties = [];
    }

    /**
     *
     * @param {string}property
     */
    select(property) {
        if (this.properties.includes(property)) return;

        this.properties.push(property);
    };

    /**
     *
     * @param {string}property
     */
    deselect(property) {
        if (!this.properties.includes(property)) return;

        this.properties = this.properties.filter(item => item !== property);
    };

    getSelected() {
        return this.properties;
    }
}

export default SelectedPropertyManager;