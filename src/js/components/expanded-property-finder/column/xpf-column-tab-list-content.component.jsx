import React, {Component} from "react";
import UnorderedList from "../../shared/list-unordered/list-unordered.component";

class XpfColumnTabListContent extends Component {
    constructor(props) {
        super(props);

        let {searchFunction, sortFunction, items, listItemFactory: createListItem} = props;

        this.search = searchFunction;
        this.createListItem = createListItem;

        this.state = {
            items: items,
            renderItems: items,
            sortFunction: sortFunction || (array => array.sort())
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleRadioButtons = this.handleRadioButtons.bind(this);
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
            renderItems: renderItems,
        });
    }

    handleChange(event) {
        let {target: {value}} = event;

        this.changeQuery(value);

        this.executeSearch(value);
    }

    handleRadioButtons() {
        console.log("test");
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


    render() {
        let {state: {renderItems}} = this;

        // let createSortFunc = (comparator) => (ascending) => {
        //     let condition = ascending ? (comparator(item).isGreaterThan(item2)) : (comparator(item).isLessThan(item2));

        //     return (array => array.sort(({ shortName: item1 }, { shortName: item2 }) => (!comparator(item1).isEqualTo(item2)) ?
        //         (condition ? 1 : -1) :
        //         0));
        // }
        
        let sortASC = (array => array.sort(({ shortName: item1 }, { shortName: item2 }) => (item1 !== item2) ?
            ((item1 > item2) ? 1 : -1) :
            0));

        let sortDESC = (array => array.sort(({ shortName: item1 }, { shortName: item2 }) => (item1 !== item2) ?
            ((item1 < item2) ? 1 : -1) :
            0));

        let SearchButton = ({onClick}) => (
            <div className="SearchButton">
                <span onClick={onClick}
                      className="Button">
                    <i className="fas fa-search" />
                </span>
            </div>);
        
        let OptionsButton = () => (
            <div className="optionsButton dropdown show" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="Button">
                    <i className="fas fa-ellipsis-h" />
                </span>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">

                    <input className="dropdown-item" type="radio" id="sort-a-z" name="sort-a-z" /><label htmlFor="sort-a-z"> Sort A-Z</label>

                    <a className="dropdown-item" href="#">  <input type="radio" id="sort-z-a" name="sort-z-a" /><label htmlFor="sort-z-a"> Sort Z-A</label></a>
                    
                    <a className="dropdown-item" href="#">  <input className="selectAllButton" type="button" value="Select all" /></a>
                    <a className="dropdown-item" href="#">  <input className="deselectAllButton" type="button" value="Deselect all" /></a>
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
                    <OptionsButton onClick={this.handleSubmit}/>
                </div>
                <UnorderedList className="List"
                               items={this.state.sortFunction(renderItems)}
                               createListItem={this.createListItem}/>
            </div>
        );
    }

}

export default XpfColumnTabListContent;