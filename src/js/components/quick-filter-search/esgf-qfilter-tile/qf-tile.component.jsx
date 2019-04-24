import React, { Component } from "react";
export class QFTile extends Component {
    constructor(props) {
        super(props);

        let { title, icon, page, type, properties } = props;
        this.title = title;
        this.icon = icon;
        this.page = page;
        this.type = type;

        

        this.style = { 
            backgroundColor: props.color,
        };

        this.state = {
            properties: properties
        }
    }

    componentWillReceiveProps({properties}) {
        this.setState({properties: properties})
    }

    render() {
        let {properties} = this.state;

        let items = [];

        if (this.page == "qf") {
            items = properties.map(item => <li><input type="checkbox" /> {item}</li>);
        } else { // default
            items = properties.map(item => <li>{item}</li>);
        }

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
                    <ul>{items}</ul>
                </div>
            )
        }
    }
}
