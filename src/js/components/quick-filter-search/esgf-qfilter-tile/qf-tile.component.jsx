import React, { Component } from "react";
import UnorderedList from "../../shared/list-unordered/list-unordered.component";
export class QFTile extends Component {
    constructor(props) {
        super(props);

        let { title, icon, page, type, properties, listItemFactory: createListItem } = props;
        this.title = title;
        this.icon = icon;
        this.page = page;
        this.type = type;
        this.createListItem = createListItem;

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

        if(this.type == "add" && this.page == "cqf"){
            return (
                <div className="qf-tile">
                    <div className="qf-tile-header" style={this.style}><i className={this.icon}></i> {this.title}</div>
                    <div className="text-center"><i className="fas fa-plus-circle add-button"></i></div>
                </div>
            )
        }else{
            return (
                <div className="qf-tile">
                    <div className="qf-tile-header" style={this.style}><i className={this.icon}></i> {this.title}</div>
                    <UnorderedList items={properties}
                                   createListItem={this.createListItem}/>
                </div>
            )
        }
    }
}
