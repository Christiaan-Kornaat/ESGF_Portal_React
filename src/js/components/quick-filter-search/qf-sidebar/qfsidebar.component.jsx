import React from "react";
import UnorderedList from "../../shared/list-unordered/list-unordered.component";
import { range } from "../../../util/array.util";

export class QFSidebar extends React.Component {
    constructor(props) {
        super(props);

        let { close } = props;

        this.state = {
            style: {
                width: 350
            },
        };
        this.closeNav = close;
    }

    render() {
        //testing items
        let items = range(0, 12);
        
        return (
            <div className="overlay" style={this.state.style}>
                <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>x</a> 
                <h2>Presets</h2>
                <UnorderedList className="List" items={items} createListItem={(item) => <li class="filter">{item}</li>}/>                
            </div>
        );
    }
}

