import * as React from "react";
import {Component} from "react";

class HtmlList<T = any> extends Component<{ items: T[], createListItem: (T) => JSX.Element, className: string }> {

    state: { items: T[] };
    private readonly _tagName: any;
    private readonly _createListItem: (T) => Element;

    constructor(props, tagName) {
        super(props);

        let {createListItem} = props;

        const TAG_WHITELIST = ["ol", "ul"];

        if (!TAG_WHITELIST.includes(tagName)) {
            throw new Error("Invalid argument props.tagName. Must be one of " + TAG_WHITELIST.join(", "));
        }

        this._tagName = tagName;
        this._createListItem = createListItem;
    }

    shouldComponentUpdate({items}: Readonly<{ items: T[]; createListItem: (T) => any; className: string }>, nextState: Readonly<{}>, nextContext: any): boolean {
        return !(items.length === 0 && items.length === this.state.items.length);
    }

    render() {
        let {items} = this.props;

        let Tag = this._tagName;

        let listItems = items.map(this._createListItem);

        return (
            <Tag className={this.props.className}>
                {listItems}
            </Tag>
        );
    }
}

export default HtmlList;
