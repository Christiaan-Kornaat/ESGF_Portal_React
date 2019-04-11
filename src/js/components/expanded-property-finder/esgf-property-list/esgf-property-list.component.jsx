import React, {Component} from "react";

export class ESGFPropertyList extends Component {
    render() {
        let title = this.props.title;

        let items = this.props.properties.map(item =>
            <li>{item}</li>
        );

        return (
            <div>
                <h3>{title}</h3>
                <ul>{items}</ul>
            </div>
        )
    }
}