import React, {Component} from "react";
import UnorderedList from "../../shared/list-unordered/list-unordered.component";

class XpfColumnTabListContent extends Component {
    constructor(props) {
        super(props);

        let {searchFunction, sortFunction, items, listItemFactory: createListItem} = props;

        this.search = searchFunction;
        this.sort = sortFunction || (array => array.sort());
        this.createListItem = createListItem;

        this.state = {
            items: items,
            renderItems: items
        };

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

        let SearchButton = ({onClick}) => (
            <div className="SearchButton">
                <span onClick={onClick}
                      className="Button">
                    <i className="fas fa-search" />
                </span>
            </div>);
        
        let OptionsButton = ({onClick}) => (
            <div className="Button dropdown show">
                <a className="OptionsButton" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-ellipsis-h" />
                 </a>

                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                    <a class="dropdown-item" href="#">  <input type="checkbox" id="1" name="sort-a-z" ></input><label for="sort-a-z"> Sort A-Z</label></a>
                    <a class="dropdown-item" href="#">  <input type="checkbox" id="2" name="sort-by-size" ></input><label for="sort-by-size"> Sort by size</label></a>
                    <a class="dropdown-item" href="#">  <input type="checkbox" id="3" name="date" ></input><label for="data"> Sort by date</label></a>
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
                               items={this.sort(renderItems)}
                               createListItem={this.createListItem}/>
            </div>
        );
    }

}

export default XpfColumnTabListContent;