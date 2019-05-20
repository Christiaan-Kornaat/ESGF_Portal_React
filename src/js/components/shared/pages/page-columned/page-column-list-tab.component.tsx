import React from "react";
import {EventSubscriber} from "../../../../lib/event-emitter/events";
import PageColumnTab, {PageColumnTabProps} from "./page-column-tab.component";
import SearchComponent from "../../../expanded-property-finder/wrapper/search.component";
import HtmlList from "../../list-html/list-html.component";

type PageColumnTabEvents = { selected: EventSubscriber, deselected: EventSubscriber };

type ItemFactory<TItem> = (item: TItem) => JSX.Element;
type PageColumnListTabProps = PageColumnTabProps & { searchComponent: SearchComponent, list: HtmlList }

class PageColumnListTab<TItem> extends PageColumnTab {
    get content(): JSX.Element {
        return <div>
            {this._searchComponent}
            {this._list}
        </div>;
    }

    private readonly _list: HtmlList;
    private readonly _searchComponent: SearchComponent;

    constructor({title, list, searchComponent}: PageColumnListTabProps) {
        super({title});

        this._list = list;

        this._searchComponent = searchComponent;
    }
}

export default PageColumnListTab;