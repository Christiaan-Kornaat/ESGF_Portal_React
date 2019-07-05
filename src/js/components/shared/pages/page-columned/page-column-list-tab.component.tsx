import React, {Component} from "react";
import SearchComponent from "../../../expanded-property-finder/wrapper/search.component";
import {SearchComponentModel} from "../../../../model/factories/page-column-tab.factory";
import UnorderedList from "../../list-unordered/list-unordered.component";
import LoadingIcons from "../../icons/loading-icons.component";
import IPageColumnTab, {PageColumnTabProps} from "./page-column-tab.interface";

type PageColumnListTabProps<TItem> = PageColumnTabProps & {
    items: TItem[],
    isLoading: boolean,
    listItemFactory,
    searchComponentModel: SearchComponentModel,
    sortFunction: (query: string, items: TItem[]) => TItem[]
}
type PageColumnListTabState = { items, sortFunction, searchComponentModel: SearchComponentModel, searchQuery, isLoading: boolean };

class PageColumnListTab<TItem = any> extends Component<PageColumnListTabProps<TItem>> implements IPageColumnTab {
    public get title(): string {
        return this._title;
    }

    public set title(value: string) {
        this._title = value;
    }

    private get renderItems() {
        let {sortFunction, searchComponentModel: {searchMethod}, searchQuery, items} = this.state;

        return sortFunction(searchMethod(searchQuery, items));
    }

    private createListItem: (item: TItem) => JSX.Element;
    state: PageColumnListTabState;
    private _title: string;
    private _children: JSX.Element[];

    constructor(props) {
        super(props);

        let {sortFunction, searchComponentModel, items, listItemFactory: createListItem, isLoading} = props;

        this.createListItem = createListItem;

        this.state = {
            items: items,
            sortFunction: sortFunction || (array => array.sort()),
            searchComponentModel: searchComponentModel,
            searchQuery: "",
            isLoading: isLoading || false
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    shouldComponentUpdate(nextProps: Readonly<PageColumnTabProps & { items: TItem[]; isLoading: boolean; listItemFactory; searchComponentModel: SearchComponentModel; sortFunction: <TItem>(query: string, items: TItem[]) => TItem[] }>, nextState: Readonly<{}>, nextContext: any): boolean {
        return true;
    }

    componentWillReceiveProps({items, isLoading, sortFunction}: PageColumnListTabProps<TItem>) {
        let newState: any = {
            items: items,
            isLoading: isLoading
        };

        if (sortFunction) newState.sortFunction = sortFunction;

        this.setState(newState);
    }

    /**
     * @param {string} query
     */
    handleSearch(query) { this.setState({searchQuery: query}); }


    render() {
        let {state: {isLoading, searchComponentModel: {headerButtons}}, createListItem} = this;

        let content = (!isLoading) ?
            <UnorderedList className="List"
                           items={this.renderItems}
                           createListItem={createListItem}/> :
            <LoadingIcons.Spinner/>;

        this._children = [
            <SearchComponent onSearch={this.handleSearch}
                             headerButtons={headerButtons}/>,
            content
        ];

        return <div className={this.props.className || ""}>{this._children}</div>;
    }
}

export default PageColumnListTab;