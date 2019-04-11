import React, {Component} from "react";

export class ESGFPropertyList extends Component {
    render() {
        let title = this.props.title;
        let onSelect = this.props.properties.onSelect;

        let createOnSelect = function (item) {
            return function () {
                onSelect(item)
            };
        };

        let items = this.props.properties.items.map(item =>
            <li onClick={createOnSelect(item)}>{item}</li>
        );

        return (
            <div>
                <h3>{title}</h3>
                <ul>{items}</ul>
            </div>
        )
    }
}