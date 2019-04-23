import React, { Component } from "react";
export class QFTile extends Component {
    constructor(props) {
        super(props);

        let { title, icon } = props;
        this.title = title;
        this.icon = icon;

        this.items = props.properties.map(item =>
            <li><input type="checkbox" /> {item}</li>
        );

        this.style = { 
            backgroundColor: props.color,
        };
    }

    render() {
        return (
            <div className="qf-tile">
                <div className="qf-tile-header" style={this.style}><i className={this.icon}></i> {this.title}</div>
                <ul>{this.items}</ul>
            </div>
        )
    }
}
