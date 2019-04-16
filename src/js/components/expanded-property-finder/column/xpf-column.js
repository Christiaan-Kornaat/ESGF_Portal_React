import React, {Component} from 'react';
import UnorderedList from "../../shared/list-unordered/list-unordered.component";

class XpfColumn extends Component {
    constructor(props) {
        super(props);

        let {tabs, searchFunction, items, listItemFactory: createListItem} = props;

        this.search = searchFunction;
        this.tabs = tabs;
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

        if (query == null || query.trim() === "")
            renderItems = items;

        this.setState({
            items: items,
            renderItems: renderItems
        })
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

    executeSearch(query) {
        this.setState({
            renderItems: this.search(query, [...this.state.items])
        })
    }

    render() {
        let [title] = this.tabs;

        let {renderItems} = this.state;

        let SearchButton = ({onClick}) => (
            <div className="SearchButton">
                <span onClick={onClick}
                      className="Button"
                      id="basic-text1">
                    <i className="Button-Icon"
                       aria-hidden="true"/>
                </span>
            </div>);

        return (
            <div className={this.props.className}>
                
                {/* Deze title wordt vervangen door een meegegeven object */}
                <h3 className='Center-Title'>{title}</h3>

                <div className="Search">
                    <input className="SearchBar"
                           type="text" placeholder="Search"
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

export default XpfColumn;