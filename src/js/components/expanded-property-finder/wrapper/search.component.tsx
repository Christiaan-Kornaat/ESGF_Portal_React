import * as React from "react";
import {PureComponent} from "react";

type SearchComponentProps = { headerButtons: JSX.Element[], onSearch: (query: string) => void };

class SearchComponent extends PureComponent<SearchComponentProps> {

    private readonly onSearch: Function;

    state: { headerButtons: Element[] };
    private searchQuery: string;

    constructor(props) {
        super(props);

        let {headerButtons, onSearch} = props;

        this.onSearch = onSearch;

        this.state = {
            headerButtons: headerButtons
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        let query = event.target.value;

        this.searchQuery = query;

        this.onSearch(query);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.onSearch(this.searchQuery);
    }

    render() {
        let {headerButtons} = this.state;

        let SearchButton = ({onClick}) => (
            <div className="SearchButton">
                <span onClick={onClick}
                      className="Button">
                    <i className="fas fa-search"/>
                </span>
            </div>);

        return (
            <div className="Search">
                <input className="SearchBar"
                       type="text"
                       placeholder="Search"
                       aria-label="Search"
                       onChange={this.handleChange}/>
                <SearchButton onClick={this.handleSubmit}/>
                {headerButtons}
            </div>
        );
    }
}

export default SearchComponent;