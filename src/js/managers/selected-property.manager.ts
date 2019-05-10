import {EventEmitter, EventSubscriber} from "../lib/event-emitter/events";
import {ESGFFilterDTO} from "../model/dto/esgf-filter.dto";
import ESGFFilterPropertyDTO from "../model/dto/esgf-filter-property.dto";


class SelectedPropertyManager {
    private readonly eventNames: { selectionChanged: string; deselected: string; selected: string };
    // @ts-ignore
    private readonly eventEmitter: EventEmitter;
    private readonly properties: Map<ESGFFilterDTO, Map<String, ESGFFilterPropertyDTO>>;

    public readonly events: { readonly selectionChanged: EventSubscriber; readonly deselected: EventSubscriber; readonly selected: EventSubscriber };

    constructor() {
        this.properties = new Map();

        this.eventEmitter = new EventEmitter();

        this.eventNames = {
            selectionChanged: "selection-changed",
            selected: "property-selected",
            deselected: "property-deselected"
        };

        this.events = {
            selectionChanged: new EventSubscriber(this.eventNames.selectionChanged, this.eventEmitter),
            selected: new EventSubscriber(this.eventNames.selected, this.eventEmitter),
            deselected: new EventSubscriber(this.eventNames.deselected, this.eventEmitter)
        };

        this.clear = this.clear.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.select = this.select.bind(this);
        this.deselect = this.deselect.bind(this);
        this.selectMany = this.selectMany.bind(this);
        this.deselectMany = this.deselectMany.bind(this);
    }

    /**
     * @param {ESGFFilterDTO} filter
     *
     * @returns {Map<String,ESGFFilterPropertyDTO>}filter
     */
    private filterPropertyMap(filter) {
        if (!this.properties.has(filter)) {
            this.properties.set(filter, new Map());
        }
        return this.properties.get(filter);
    }

    /**
     * @param {ESGFFilterPropertyDTO}property
     */
    select(property) {
        //  Calls selectMany because if it were to be the other way around,
        //      too many events would be thrown
        this.selectMany([property]);
    };

    /**
     * @param {Array<ESGFFilterPropertyDTO>}properties
     */
    selectMany(properties) {
        /** @param {ESGFFilterPropertyDTO} property */
        let select = property => {
            if (this.isSelected(property)) return;

            this.filterPropertyMap(property.filter)
                .set(property.name, property);
        };

        properties.forEach(select);

        this.eventEmitter.emit(this.eventNames.selectionChanged, this.selected);
        this.eventEmitter.emit(this.eventNames.selected, this.selected);
    };

    /**
     * @summary TODO summary
     */
    deselect(property: ESGFFilterPropertyDTO): void {
        //  Calls selectMany because if it were to be the other way around,
        //      too many events would be thrown
        this.deselectMany([property]);
    };

    /**
     * @param {Array<ESGFFilterPropertyDTO>}properties
     */
    deselectMany(properties) {
        const deselect = property => {
            if (!this.isSelected(property)) return;

            this.filterPropertyMap(property.filter).delete(property.name);
        };

        properties.forEach(deselect);

        this.eventEmitter.emit(this.eventNames.selectionChanged, this.selected);
        this.eventEmitter.emit(this.eventNames.deselected, this.selected);
    };

    /**
     * @summary Deselects all properties.
     */
    clear() {
        this.deselectMany(this.selected);
    }

    /**
     *
     * @param {ESGFFilterPropertyDTO} property
     * @return {boolean}
     */
    isSelected(property: ESGFFilterPropertyDTO): boolean {
        return this.properties.has(property.filter) ?
            this.filterPropertyMap(property.filter).has(property.name) :
            false;
    }

    /**
     * @summary returns current selection of filter-properties
     */
    get selected(): ESGFFilterPropertyDTO[] {
        let returnArray = [];

        Array.from(this.properties.values())
             .forEach(filterItemMap => returnArray.push(...Array.from(filterItemMap.values())));

        return returnArray;
    }

    set selected(properties) {
        this.properties.clear(); //not using this.clear() because it throws an event
        this.selectMany(properties);
    }
}

export default SelectedPropertyManager;