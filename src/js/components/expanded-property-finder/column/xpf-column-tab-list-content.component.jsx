import PropTypes from "prop-types";
import React, {  Component } from "react";
import LoadingIcons from "../../shared/icons/loading-icons.component";
import UnorderedList from "../../shared/list-unordered/list-unordered.component";
import SearchComponent from "../wrapper/xpf-list-search.component";

class XpfColumnTabListContent extends Component {
    constructor(props) {
        super(props);

        let { searchFunction,  sortFunction, headerButtons = [], items, listItemFactory: createListItem, isLoading } = props;

        this.createListItem = createListItem;

        this.state = {
            items: items,
            sortFunction: sortFunction || (array => array.sort()),
            headerButtons: headerButtons,
            searchFunction: searchFunction,
            searchQuery: "",
            sortDirection: false,
            isLoading: isLoading || false
        };

        this.onSearch = this.onSearch.bind(this);
    }

    componentWillReceiveProps({  items, isLoading, sortFunction }) {
        let newState = {
            items: items,
            isLoading: isLoading
        };

        if (sortFunction) newState.sortFunction = sortFunction;

        this.setState(newState);
    }

    /**
     * 
     * @param {list} items 
     */
    onSearch(query){
        this.setState({
            searchQuery: query
        });
    }

    render() {
        let { state: { items, sortFunction, isLoading, headerButtons, searchFunction, searchQuery }, createListItem, onSearch } = this;
        
        let content = (!isLoading) ?
            <UnorderedList
                className="List"
                items={sortFunction(searchFunction(searchQuery, items))}
                createListItem={createListItem} /> :
            <LoadingIcons.Spinner />;

        return (
            <div>
                <SearchComponent
                    onSearch={onSearch}
                    headerButtons={headerButtons} />
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
    optionButtons: PropTypes.object,
    isLoading: PropTypes.bool
};

export default XpfColumnTabListContent;