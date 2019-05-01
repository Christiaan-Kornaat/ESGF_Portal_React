import React, {Component} from "react";
import UnorderedList from "../../shared/list-unordered/list-unordered.component";

class XpfColumnTabListContent extends Component {
    constructor(props) {
        super(props);

        let {searchFunction, sortFunction, items, listItemFactory: createListItem, optionButtons } = props;

        this.search = searchFunction;
        this.createListItem = createListItem;

        this.optionButtons = optionButtons || {};

        this.state = {
            items: items,
            renderItems: items,
            sortFunction: sortFunction || (array => array.sort()),
            showOptionsButton: false,
            sortDirection : false
        };

        this.toggleOptions = this.toggleOptions.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.executeSearch = this.executeSearch.bind(this);
    }

    componentWillReceiveProps({items}) {
        let {searchQuery: query, renderItems} = this.state;

        if (query == null || query.trim() === "") {
            renderItems = items;
        }

        this.setState({
            items: items,
            renderItems: renderItems
        });
    }

    handleChange(event) {
        let {target: {value}} = event;

        this.changeQuery(value);

        this.executeSearch(value);
    }

    handleSortButton() {
        let alphabeticalComparator = (item) => {
            let _isGreaterThan = (item2) => ((item.shortName != null) ? item.shortName.localeCompare(item2.shortName) : item.localeCompare(item2)) == 1;
            let _isLessThan = (item2) => ((item.shortName != null) ? item.shortName.localeCompare(item2.shortName) : item.localeCompare(item2)) == -1;
            let _isEqualTo = (item2) => ((item.shortName != null) ? item.shortName.localeCompare(item2.shortName) : item.localeCompare(item2)) == 0;

            return {
                isGreaterThan: _isGreaterThan,
                isLessThan: _isLessThan,
                isEqualTo: _isEqualTo
            }
        }

        /**
         * 
         * @param {Object} comparator
         * 
         * @returns {Function}
         */
        let createSortFunc = (comparator) => (ascending) => {
            let condition = (item, item2) => (ascending ? (comparator(item).isGreaterThan(item2)) : (comparator(item).isLessThan(item2)));

            return (array => array.sort((item1 , item2) => (!comparator(item1).isEqualTo(item2)) ?
                (condition(item1, item2) ? 1 : -1) : 0));
        } 
            
        this.setState({
            sortFunction: createSortFunc(alphabeticalComparator)(this.state.sortDirection),
            sortDirection : !this.state.sortDirection
        })

    }

    /**
     * 
     * @param {string} newQuery 
     */
    changeQuery(newQuery) {
        this.setState({
            searchQuery: newQuery
        });
    }

    handleSubmit() {
        event.preventDefault();

        let {searchQuery: query} = this.state;

        this.executeSearch(query);
    }

    /**
     *
     * @param {string}query
     */
    executeSearch(query) {
        let items = this.search(query, this.state.items);


        this.setState({
            renderItems: items
        });
    }

    toggleOptions() {
        let show = !this.state.showOptionsButton;

        this.setState({
            showOptionsButton: show
        })
    }

    render() {
        let { state: { renderItems, showOptionsButton, sortFunction}, optionButtons} = this;
        let SearchButton = ({onClick}) => (
            <div className="SearchButton">
                <span onClick={onClick}
                      className="Button">
                    <i className="fas fa-search" />
                </span>
            </div>);
        
        let getOptionButtons = Object.keys(optionButtons).map(name => (
            <a key={name} className="dropdown-item" onClick={() => optionButtons[name](renderItems)}>  <input className="optionsTabButton" type="button" value={name} /></a>
        ));

        let OptionsButton = ({show, onClick}) => (
            <div className="optionsButton dropdown show" role="button" id="dropdownMenuLink"  aria-haspopup="true" aria-expanded="false">
                <span className="Button" onClick={onClick}>
                    <i className="fas fa-ellipsis-h" />
                </span>
                <div className={"dropdown-menu dropdown-menu-right " + (show ? "show" : "")} aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" onClick={() => this.handleSortButton()} >Sort a-z <i className={this.state.sortDirection ? 'fas fa-angle-up sortingArrow' : 'fas fa-angle-down sortingArrow'}></i> </a>
                    {getOptionButtons}
                </div>
            </div>
        );

        return (
            <div>
                <div className="Search">
                    <input className="SearchBar"
                           type="text"
                           placeholder="Search"
                           aria-label="Search"
                           onChange={this.handleChange}/>
                    <SearchButton onClick={this.handleSubmit}/>
                    <OptionsButton show={showOptionsButton}
                                    onClick={this.toggleOptions}/>
                </div>
                <UnorderedList className="List"
                               items={sortFunction(renderItems)}
                               createListItem={this.createListItem}/>
            </div>
        );
    }

}

export default XpfColumnTabListContent;