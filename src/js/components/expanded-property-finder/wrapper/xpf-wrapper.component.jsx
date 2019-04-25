import React, {Component} from "react";
import ESGFFilterDTOFormatter from "../../../model/formatters/esgf-filter-dto.formatter";
import ESGFPropertyDTOFormatter from "../../../model/formatters/esgf-property-dto.formatter";
import ESGFFilterSearcher from "../../../searchers/esgf-filter.searcher";
import ESGFPropertySearcher from "../../../searchers/esgf-property.searcher";
import XpfColumnTab from "../column/xpf-column-tab.component";
import XpfColumn from "../column/xpf-column.component";

export default class XPFWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFilter: null,
            selectedProperties: [],
            properties: [],
            filters: []
        };

        this.filterProvider = props.filterProvider;
        this.selectedPropertyManager = props.selectedPropertyManager;

        this.selectFilter = this.selectFilter.bind(this);
        this.selectProperty = this.selectProperty.bind(this);
        this.deselectProperty = this.deselectProperty.bind(this);
        this.toggleProperty = this.toggleProperty.bind(this);
        this.isPropertySelected = this.isPropertySelected.bind(this);
    }

    /**
     *
     * @param {ESGFFilterDTO}filter
     */
    selectFilter(filter) {
        if (this.state.selectedFilter === filter) return;

        this.setState(() => ({properties: filter.properties}));
    }

    /**
     *
     * @param {string}property
     */
    selectProperty(property) {
        this.selectedPropertyManager.select(property);

        this.updateProperties();
    };

    /**
     *
     * @param {string}property
     */
    deselectProperty(property) {
        this.selectedPropertyManager.deselect(property);

        this.updateProperties();
    };

    toggleProperty(property) {
        let selectionAction = this.isPropertySelected(property) ?
            this.deselectProperty :
            this.selectProperty;

        selectionAction(property);
    }

    isPropertySelected(property) {
        return (this.state.selectedProperties.includes(property));
    }

    updateProperties() {
        this.setState(() => ({selectedProperties: this.selectedPropertyManager.selected}));
    }

    componentDidMount() {
        this.filterProvider.provide()
            .then(filters => this.setState({filters: filters})); //FIXME TEMP

        this.updateProperties();
    }

    render() {
        let {toggleProperty, deselectProperty, filterProvider, state} = this;

        let {filters, properties, selectedProperties} = state;

        let searchFunctions = {
            filters: new ESGFFilterSearcher().search,
            properties: new ESGFPropertySearcher().search
        };

        let filterListItemFactory = item =>
            <li className="filter"
                onClick={() => this.selectFilter(item)}>
                {ESGFFilterDTOFormatter.toHumanText(item).shortName}
            </li>;

        let showPropertyInfo = console.log;

        let propertyListItemFactoryFactory = (onClick) => {
            return item => {
                let name = ESGFPropertyDTOFormatter.toHumanText(item);

                let checked = this.isPropertySelected(item);

                return <li className="property">
                    <span className="name"
                          onClick={() => onClick(item)}>
                        <input type={"checkbox"}
                               checked={checked}/> {name}
                    </span>
                    <span className={"icon-info"}
                          onClick={() => showPropertyInfo(item)}><i className="fas fa-info-circle"></i></span>
                </li>;
            };
        };

        let FilterList = <XpfColumnTab
            searchFunction={searchFunctions.filters}
            sortFunction={(array => array.sort(({shortName: item1}, {shortName: item2}) => (item1 !== item2) ?
                ((item1 > item2) ? 1 : -1) :
                0))}
            items={filters}
            listItemFactory={filterListItemFactory}
        />;

        let PresetList = <XpfColumnTab
            searchFunction={searchFunctions.properties}
            items={filters}
            listItemFactory={filterListItemFactory}
        />;

        let PropertyFilterList = <XpfColumnTab
            searchFunction={searchFunctions.properties}
            items={properties}
            listItemFactory={propertyListItemFactoryFactory(toggleProperty, "O")}
        />;

        let SelectedPropertyFilterList = <XpfColumnTab
            searchFunction={searchFunctions.properties}
            items={selectedProperties}
            listItemFactory={propertyListItemFactoryFactory(deselectProperty, "X")}
        />;

        return (
            <section className='XPF-Wrapper'>
                <XpfColumn className="Filters" tabs={{"Filters": FilterList, "Presets": PresetList}}/>
                <XpfColumn className="Properties" tabs={{"Properties": PropertyFilterList}}/>
                <XpfColumn className="SelectedProperties" tabs={{"Selected properties": SelectedPropertyFilterList}}/>
            </section>
        );
    }
}