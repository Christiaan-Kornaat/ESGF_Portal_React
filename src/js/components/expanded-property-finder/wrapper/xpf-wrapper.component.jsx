import React, {Component} from "react";
import XpfColumnTabInfoContent from "../column/xpf-column-tab-info-content.component";
import XpfColumnTabListContent from "../column/xpf-column-tab-list-content.component";
import XpfColumn from "../column/xpf-column.component";

export default class XPFWrapper extends Component {
    constructor(props) {
        super(props);

        let {selectedPropertyManager, filterProvider} = props;

        this.state = {
            selectedFilter: null,
            selectedProperties: selectedPropertyManager.getSelected(),
            properties: [],
            infoTabs: [],
            selectedTabs: {
                filterColumn: null,
                propertyColumn: null,
                selectedColumn: null
            }
        };

        this.filterProvider = filterProvider;
        this.selectedPropertyManager = selectedPropertyManager;

        this.setState = this.setState.bind(this);
        this.selectTab = this.selectTab.bind(this);
        this.selectFilter = this.selectFilter.bind(this);
        this.selectProperty = this.selectProperty.bind(this);
        this.deselectProperty = this.deselectProperty.bind(this);
        this.toggleProperty = this.toggleProperty.bind(this);
        this.isPropertySelected = this.isPropertySelected.bind(this);
        this.showPropertyInfo = this.showPropertyInfo.bind(this);
        this.addInfoTab = this.addInfoTab.bind(this);
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
        this.setState(() => ({selectedProperties: this.selectedPropertyManager.getSelected()}));
    }

    showPropertyInfo(property) {
        this.addInfoTab({
            title: property,
            paragraphs: {
                "Paragraph 1!": "Lorem ipsum",
                "Paragraph 2!": "In enim justo"
            }
        });
    }

    addInfoTab(viewModel) {
        let infoTabs = this.state.infoTabs.concat({
            title: "Info",
            content: viewModel
        });

        this.setState({infoTabs: infoTabs});
    }

    removeInfoTab(viewModel) {
        let {state, setState} = this;

        let infoTabs = state.infoTabs.filter(tab => tab.title !== viewModel.title);

        setState({infoTabs: infoTabs});
    }

    selectTab(columnName, tabName) {
        let {state: {selectedTabs}, setState} = this;

        selectedTabs[columnName] = tabName;

        setState({selectedTabs});
    }

    render() {
        let {selectFilter, toggleProperty, deselectProperty, filterProvider, state, selectTab} = this;

        let filters = filterProvider.provide(); //FIXME TEMP

        let {properties, selectedProperties, infoTabs, selectedTabs} = state;

        let isQueryValid = query => !(query == null || query.trim() === "");

        let searchFunctions = {
            filters: (query, items) => isQueryValid(query) ?
                items.filter(({shortName}) => shortName.includes(query)) :
                items,
            properties: (query, items) => isQueryValid(query) ?
                items.filter(property => property.includes(query)) :
                items
        };

        let filterFactory = property =>
            <li className="filter"
                onClick={() => selectFilter(property)}>
                {property.shortName}
            </li>;

        let showPropertyInfo = this.showPropertyInfo;

        let propertyListItemFactoryFactory = (onClick) =>
            item => {
                let checked = this.isPropertySelected(item);

                let onChange = () => onClick(item);

                let onInfoClick = event => {
                    event.stopPropagation();
                    new Promise((resolve) => resolve(showPropertyInfo(item)))
                        .then(() => this.selectTab("selectedColumn", "Info"));
                };

                return (
                    <li className="property"
                        onClick={onChange}>
                        <input className={"checkbox"}
                               type={"checkbox"}
                               checked={checked}/> {item}
                        <span className={"icon-info"}
                              onClick={onInfoClick}>
                            <i className="fas fa-info-circle"></i>
                        </span>

                    </li>);
            };

        let FilterList = <XpfColumnTabListContent searchFunction={searchFunctions.filters}
                                                  items={filters}
                                                  listItemFactory={filterFactory}/>;

        let PresetList = <XpfColumnTabListContent searchFunction={searchFunctions.filters}
                                                  items={filters}
                                                  listItemFactory={filterFactory}/>;

        let PropertyList = <XpfColumnTabListContent searchFunction={searchFunctions.properties}
                                                    items={properties}
                                                    listItemFactory={propertyListItemFactoryFactory(toggleProperty)}/>;
        let SelectedPropertyList = <XpfColumnTabListContent searchFunction={searchFunctions.properties}
                                                            items={selectedProperties}
                                                            listItemFactory={propertyListItemFactoryFactory(deselectProperty)}/>;

        let infoTab = Object.values(infoTabs)
                            .pop();
        let propertyTabs = infoTab != null ? {"Info": <XpfColumnTabInfoContent model={infoTab.content}/>} : {};
        propertyTabs["Selected properties"] = SelectedPropertyList;

        let createClearSelected = columnName => newTab => selectTab(columnName, newTab);

        return (
            <section className='XPF-Wrapper'>
                <XpfColumn className="Filters"
                           tabs={{"Filters": FilterList, "Presets": PresetList}}
                           activeTab={selectedTabs.filterColumn}
                           onSelect={createClearSelected("filterColumn")}/>
                <XpfColumn className="Properties"
                           tabs={{"Properties": PropertyList}}
                           activeTab={selectedTabs.propertyColumn}
                           onSelect={createClearSelected("propertyColumn")}/>
                <XpfColumn className="SelectedProperties"
                           tabs={propertyTabs}
                           activeTab={selectedTabs.selectedColumn}
                           onSelect={createClearSelected("selectedColumn")}/>
            </section>
        );
    }
}