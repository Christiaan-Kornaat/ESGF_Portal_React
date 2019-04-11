import React, { Component } from "react";
export class QFTile extends Component {
    render() {
        let title = this.props.title;
        let icon = this.props.icon;
        let items = this.props.properties.map(item =>
            <li><input type="checkbox"/> {item.shortName} ({item.propertyCount})</li>
        );

        let style = {
            backgroundColor: this.props.color,
        };

        return (
            <div className="qf-tile">
                <div className="qf-tile-header" style={style}><i className={icon}></i>{title}</div>
                <ul>{items}</ul>
            </div>
        )
    }
}
