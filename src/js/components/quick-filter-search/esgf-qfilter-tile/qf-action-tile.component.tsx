import React, { Component } from "react";
import { QFFilterTileDTO } from "../../../model/dto/qf-filter-tile.dto";

export class ActionTile extends Component<{ QFFilterTileDTO: QFFilterTileDTO, onClick: any }> {
    onClick: any;

    state: {
        title: string,
        icon: string,
        style: { backgroundColor: string }
    };

    constructor(props) {
        super(props);

        let { QFFilterTileDTO, onClick } = props;
        this.onClick = onClick;

        this.state = {
            title: QFFilterTileDTO.title,
            icon: QFFilterTileDTO.icon,
            style: { backgroundColor: QFFilterTileDTO.color }
        };
    }


    componentWillReceiveProps({ QFFilterTileDTO }) {
        this.setState({
            title: QFFilterTileDTO.title,
            icon: QFFilterTileDTO.icon,
            style: { backgroundColor: QFFilterTileDTO.color }
        });
    }

    render() {
        let { onClick, state: { title, icon, style } } = this;

        return (
            <div className="qf-tile" onClick={onClick}>

                <div className="qf-tile-header" style={style}><i className={icon} /> {title}</div>
                {
                    <div className="text-center"><i className="icon actionIcon" /></div>
                }

            </div>
        );
    }
}
