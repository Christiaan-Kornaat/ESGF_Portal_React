import * as PropTypes from "prop-types";
import React, {Component} from "react";

class HtmlList extends Component {

    constructor(props, tagName) {
        super(props);

        let {createListItem} = props;

        const TAG_WHITELIST = ["ol", "ul"];

        if (!TAG_WHITELIST.includes(tagName)) {
            throw new Error("Invalid argument props.tagName. Must be one of " + TAG_WHITELIST.join(", "));
        }

        this.tagName = tagName;
        this.createListItem = createListItem;
    }

    render() {
        let {items} = this.props;

        let Tag = this.tagName;

        let listItems = items.map(this.createListItem);

        return (
            <Tag className={this.props.className}>
                {listItems}
            </Tag>
        );
    }
}

HtmlList.propTypes = {
    items: PropTypes.array.isRequired,
    createListItem: PropTypes.func.isRequired
};

export default HtmlList;
