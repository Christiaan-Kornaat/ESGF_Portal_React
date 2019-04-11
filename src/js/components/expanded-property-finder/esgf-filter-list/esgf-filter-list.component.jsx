import React, {Component} from "react";

export class ESGFFilterList extends Component {
    render() {
        let title = this.props.title;

        let items = this.props.properties.map(item =>
            <li className="list-group-item">{item.shortName} ({item.propertyCount})</li>
        );

        return (
            <div className="col-sm">
                <h3>{title}</h3>
                <ul 
                    className="list-group list-group-flush"
                >
                    {items}
                </ul>
            </div>
        )
    }
}