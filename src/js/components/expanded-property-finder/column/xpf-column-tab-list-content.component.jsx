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
                    <i className="fas fa-search text-white"
                       aria-hidden="true"/>
                </span>
            </div>);

        return (
            <div>
                <div className="Search">
                    <input className="SearchBar"
                           type="text"
                           placeholder="Search"
                           aria-label="Search"
                           onChange={this.handleChange}/>
                    <SearchButton onClick={this.handleSubmit}/>
                </div>
                <UnorderedList className="List"
                               items={this.sort(renderItems)}
                               createListItem={this.createListItem}/>
            </div>
        );
    }

}

export default XpfColumnTabListContent;