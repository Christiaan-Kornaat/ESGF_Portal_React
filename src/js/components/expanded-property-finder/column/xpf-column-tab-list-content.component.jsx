import React, {Component} from "react";
import UnorderedList from "../../shared/list-unordered/list-unordered.component";

class XpfColumnTabListContent extends Component {
    constructor(props) {
        super(props);

        let {searchFunction, items, listItemFactory: createListItem} = props;

        this.search = searchFunction;
        this.createListItem = createListItem;

        this.state = {
            items: items,
            renderItems: items
        };
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


    render() {
        let {state: {renderItems}, setState, createListItem: itemFactory} = this;

        let SearchComponent = (props) => {
            let {onQueryChange, onSubmit} = props;

            let SearchButton = ({onClick}) => (
                <div className="SearchButton">
                <span onClick={onClick}
                      className="Button">
                    <i className="fas fa-search text-grey"
                       aria-hidden="true"/>
                </span>
                </div>);

            return (<div className="Search">
                <input className="SearchBar"
                       type="text"
                       placeholder="Search"
                       aria-label="Search"
                       onChange={onQueryChange}/>
                <SearchButton onClick={onSubmit}/>
            </div>);
        };

        let executeSearch = (query) => setState({
            renderItems: search(query, [...state.items])
        });
        let changeQuery = newQuery => setState({
            searchQuery: newQuery
        });
        let handleChange = event => {
            let {target: {value: query}} = event;

            changeQuery(query);
            executeSearch(query);
        };
        let handleSubmit = () => executeSearch(state.searchQuery);

        return (
            <div>
                <SearchComponent handleChange={handleChange}
                                 handleSubmit={handleSubmit}/>
                <UnorderedList className="List"
                               items={renderItems}
                               createListItem={itemFactory}/>
            </div>
        );
    }

}

export default XpfColumnTabListContent;