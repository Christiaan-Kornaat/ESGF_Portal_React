import React, {PureComponent} from "react";
import IPageColumnTab, {PageColumnTabProps} from "./page-column-tab.interface";

class PageColumnTab extends PureComponent<PageColumnTabProps> implements IPageColumnTab {

    set title(value: string) { this._title = value; }

    get title(): string { return this._title; }

    private _title: string;

    constructor(props: PageColumnTabProps) {
        super(props);

        let {title} = props;

        this._title = title;
    }

    render(): JSX.Element {
        return <div className={this.props.className || ""}>{this.props.children}</div>;
    }
}

export default PageColumnTab;