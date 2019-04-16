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
            <div className="input-group-append">
                <span onClick={onClick}
                      className="input-group-text cyan lighten-2"
                      id="basic-text1">
                    <i className="fas fa-search text-gray"
                       aria-hidden="true"/>
                </span>
            </div>);

        return (
            <div className={this.props.className}>
                <h3 className='text-center'>{title}</h3>

                <div className="input-group md-form form-sm form-2 pl-0 mb-4">
                    <input className="form-control my-0 py-1"
                           style={{fontSize: 12}}
                           type="text"
                           placeholder="Search"
                           aria-label="Search"
                           onChange={this.handleChange}/>
                    <SearchButton onClick={this.handleSubmit}/>
                </div>
                <UnorderedList className="list-group list-group-flush"
                               items={renderItems}
                               createListItem={this.createListItem}/>
            </div>
        );
    }
}

export default XpfColumn;