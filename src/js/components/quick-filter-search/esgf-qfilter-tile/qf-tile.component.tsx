import React, {Component} from "react";
import UnorderedList from "../../shared/list-unordered/list-unordered.component";
import { QFFilterTileDTO } from "../../../model/dto/qf-filter-tile.dto";

export class Tile extends Component<{ QFFilterTileDTO: QFFilterTileDTO, listItemFactory: any}> {
    createListItem: any;
    
    state: {
        title: string,
        icon: string,
        style: { backgroundColor: string }
        properties: []
    };
    
    constructor(props) {
        super(props);

        let { QFFilterTileDTO, listItemFactory: createListItem} = props;
        this.createListItem = createListItem;

        this.state = {
            title: QFFilterTileDTO.title,
            icon: QFFilterTileDTO.icon,
            style: { backgroundColor: QFFilterTileDTO.color },
            properties: QFFilterTileDTO.properties
        };
    }

    componentWillReceiveProps({ QFFilterTileDTO }) {
        this.setState({
            title: QFFilterTileDTO.title,
            icon: QFFilterTileDTO.icon,
            style: { backgroundColor: QFFilterTileDTO.color },
            properties: QFFilterTileDTO.properties
        });
    }

    render() {
        let { createListItem, state: { title, icon, style, properties } } = this;

        return (
            <div className="qf-tile">
                <div className="qf-tile-header" style={style}><i className={icon}/> {title}</div>
                    <UnorderedList items={properties}
                                   createListItem={createListItem}/>
            </div>
        );
    }
}
