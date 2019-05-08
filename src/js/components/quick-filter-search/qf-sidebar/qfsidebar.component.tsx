import * as React from "react";
import {range} from "../../../util/array.util";
import UnorderedList from "../../shared/list-unordered/list-unordered.component";


export class QFSidebar extends React.Component<{ close: (MouseEvent) => void }> {
    private readonly closeNav: (MouseEvent) => void;

    constructor(props) {
        super(props);

        let {close} = props;

        this.state = {
            style: {
                width: 350
            }
        };
        this.closeNav = close;
    }

    render() {
        //testing items
        let items = range(0, 12);

        // @ts-ignore
        const {style} = this.state;

        return (
            <div className="overlay" style={style}>
                <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>x</a>
                <h2>Presets</h2>
                <UnorderedList className="List" items={items}
                               createListItem={(item) => <li className="filter">{item}</li>}/>
            </div>
        );
    }
}

