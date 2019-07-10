import React, { Component } from "react";
import UnorderedList from "../../shared/list-unordered/list-unordered.component";

export namespace Tiles {
    export type TileModel = { title, icon, style };
    export type TileProps = { tileModel: TileModel };

    export class Tile<P extends TileProps = TileProps> extends Component<P> {
        render(): JSX.Element {
            let { title, icon, style } = this.props.tileModel;

            return (
                <div className="qf-tile">
                    <div className="qf-tile-header" style={style}><i className={icon} /> {title}</div>
                    {this.props.children}
                </div>
            );
        }
    }

    type ListTileProps<TItem> = TileProps & { listItems: TItem[], listItemFactory: any }

    export class ListTile<TItem> extends Component<ListTileProps<TItem>> {
        render(): JSX.Element {
            let { listItems, listItemFactory } = this.props;

            return (
                <Tile tileModel={this.props.tileModel}>
                    <UnorderedList items={listItems}
                        createListItem={listItemFactory} />
                </Tile>
            );
        }
    }

    type IconTileProps = TileProps & { onClick: () => any, icon: string };

    export class IconTile extends Component<IconTileProps> {
        render(): JSX.Element {
            let { tileModel, onClick, icon } = this.props;
            let iconContent = <div className="text-center"><i className={icon + " actionIcon"} /></div>;

            return (
                <Tile onClick={onClick} tileModel={tileModel}>
                    {iconContent}
                </Tile>
            );
        }
    }

}