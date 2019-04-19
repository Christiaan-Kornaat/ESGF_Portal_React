import React, {Component} from "react";
import UnorderedList from "../../shared/list-unordered/list-unordered.component";

class XpfColumnTab extends Component {
    constructor(props) {
        super(props);

        let {searchFunction, items, listItemFactory: createListItem} = props;

        this.search = searchFunction;
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
        let {searchQuery: query} = this.state;

        this.executeSearch(query);
    }

    executeSearch(query) {
        this.setState({
            renderItems: this.search(query, [...this.state.items])
        });
    }

    render() {
        let {renderItems} = this.state;

        let SearchButton = ({onClick}) => (
            <div className="SearchButton">
                <span onClick={onClick}
                      className="Button">
                    <i className="fas fa-search text-grey"
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
                               items={renderItems}
                               createListItem={this.createListItem}/>
            </div>
        );
    }

}

export default XpfColumnTab;