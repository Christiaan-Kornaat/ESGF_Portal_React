import React, {Component} from "react";

export class ESGFPropertyList extends Component {


    componentWillReceiveProps({properties}) {
        this.setState({properties: properties})
    }


    render() {
        let title = this.props.title;
        let onSelect = this.props.properties.onSelect;

        let createOnSelect = function (item) {
            return function () {
                onSelect(item)
            };
        };

        let items = this.props.properties.items.map(item =>
            <li class="list-group-item"
                onClick={createOnSelect(item)}>
                {item}
            </li>
        );

        return (
            <div class="col-md-4">
                <h3>{title}</h3>
                <ul class="list-group list-group-flush">
                    {items}
                </ul>
            </div>
        )
    }
}