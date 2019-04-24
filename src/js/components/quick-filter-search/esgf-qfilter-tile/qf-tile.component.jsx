import React, { Component } from "react";
export class QFTile extends Component {
    constructor(props) {
        super(props);

        let { title, icon, page, type } = props;
        this.title = title;
        this.icon = icon;
        this.page = page;
        this.type = type;

        if(props.page == "qf"){
            this.items = props.properties.map(item =>
                <li><input type="checkbox" /> {item}</li>
            );
        } else if (props.page == "cqf"){ //Custom quick filter doesnt need the checkbox
            this.items = props.properties.map(item =>
                <li>{item}</li>
            );
        }else{ // default
            this.items = props.properties.map(item =>
                <li>{item}</li>
            );
        }

        this.style = { 
            backgroundColor: props.color,
        };
    }

    render() {
        if(this.type == "add" && this.page == "cqf"){
            return (
                <div className="qf-tile">
                    <div className="qf-tile-header" style={this.style}><i className={this.icon}></i> {this.title}</div>
                    <div className="text-center"><i class="fas fa-plus-circle add-button"></i></div>
                </div>
            )
        }else{
            return (
                <div className="qf-tile">
                    <div className="qf-tile-header" style={this.style}><i className={this.icon}></i> {this.title}</div>
                    <ul>{this.items}</ul>
                </div>
            )
        }
    }
}
