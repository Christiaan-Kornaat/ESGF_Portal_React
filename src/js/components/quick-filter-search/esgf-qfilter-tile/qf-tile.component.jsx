import React, { Component } from "react";
export class QFTile extends Component {
    render() {
        let title = this.props.title;

        let items = this.props.properties.map(item =>
            <li>{item.shortName} ({item.propertyCount})</li>
        );
        return (
            <div class="qf-tile">
                <div class="tile-header">{title}</div>
                <ul>{items}</ul>
            </div>
        )
    }
}
