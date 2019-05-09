import { Component } from "react";
import * as React from "react";

class SearchComponent extends Component {

    private onSearch: Function;

    constructor(props) {
        super(props);

        let { headerButtons, onSearch } = props;

        this.onSearch = onSearch;

        this.state = {
            headerButtons: headerButtons,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let query = event.target.value;

        this.setState({
            searchQuery: query
        });

        this.onSearch(query);
    }

    handleSubmit(event) {
        event.preventDefault();

        //@ts-ignore
        let { searchQuery } = this.state;

        this.onSearch(searchQuery);
    }

    render() {
        //@ts-ignore
        let { headerButtons } = this.state;

        let SearchButton = ({ onClick }) => (
            <div className="SearchButton">
                <span onClick={onClick}
                    className="Button">
                    <i className="fas fa-search" />
                </span>
            </div>);

        return (
            <div className="Search">
                <input className="SearchBar"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={this.handleChange} />
                <SearchButton onClick={this.handleSubmit} />
                {headerButtons}
            </div>
        );
    }
}

export default SearchComponent;