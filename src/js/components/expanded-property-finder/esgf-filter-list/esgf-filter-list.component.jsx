import React, {Component} from "react";

export class ESGFFilterList extends Component {
    render() {
        let title = this.props.title;

        let items = this.props.properties.map(item =>
            <li class="list-group-item">{item.shortName} ({item.propertyCount})</li>
        );

        return (
            <div class="col-md-4">
                <h3>{title}</h3>
                <ul 
                    class="list-group list-group-flush"
                >
                    {items}
                </ul>
            </div>
        )
    }
}