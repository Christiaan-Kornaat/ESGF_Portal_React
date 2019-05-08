import PropTypes from "prop-types";
import React, {Component} from "react";
import LoadingIcons from "../../shared/icons/loading-icons.component";
import UnorderedList from "../../shared/list-unordered/list-unordered.component";

class XpfColumnTabListContent extends Component {
    constructor(props) {
        super(props);

        let {searchFunction, sortFunction, headerButtons = [], items, listItemFactory: createListItem, isLoading} = props;

        this.search = searchFunction;
        this.createListItem = createListItem;

        this.state = {
            items: items,
            renderItems: items,
            sortFunction: sortFunction || (array => array.sort()),
            headerButtons: headerButtons,
            sortDirection: false,
            isLoading: isLoading || false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.executeSearch = this.executeSearch.bind(this);
    }

    componentWillReceiveProps({items, isLoading, sortFunction}) {
        let {searchQuery: query, renderItems} = this.state;

        if (query == null || query.trim() === "") {
            renderItems = items;
        }

        let newState = {
            items: items,
            renderItems: renderItems,
            isLoading: isLoading
        };

        if (sortFunction) newState.sortFunction = sortFunction;

        this.setState(newState);
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

    handleSubmit(event) {
        event.preventDefault();

        let {searchQuery: query} = this.state;

        this.executeSearch(query);
    }

    /**
     * @param {string}query
     */
    executeSearch(query) {
        let items = this.search(query, this.state.items);

        this.setState({
            renderItems: items
        });
    }

    render() {
        let {state: {renderItems, sortFunction, isLoading, headerButtons}} = this;
        let SearchButton = ({onClick}) => (
            <div className="SearchButton">
                <span onClick={onClick}
                      className="Button">
                    <i className="fas fa-search"/>
                </span>
            </div>);

        let content = (!isLoading) ?
            <UnorderedList className="List"
                           items={sortFunction(renderItems)}
                           createListItem={this.createListItem}/> :
            <LoadingIcons.Spinner/>;

        return (
            <div>
                <div className="Search">
                    <input className="SearchBar"
                           type="text"
                           placeholder="Search"
                           aria-label="Search"
                           onChange={this.handleChange}/>
                    <SearchButton onClick={this.handleSubmit}/>
                    {headerButtons}
                </div>
                {content}
            </div>
        );
    }

}


XpfColumnTabListContent.propTypes = {
    searchFunction: PropTypes.func,
    sortFunction: PropTypes.func,
    items: PropTypes.array,
    listItemFactory: PropTypes.func,
    headerButtons: PropTypes.array,
    isLoading: PropTypes.bool
};

export default XpfColumnTabListContent;