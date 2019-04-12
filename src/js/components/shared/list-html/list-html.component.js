import React, {Component} from 'react';

class HtmlList extends Component {

    constructor(props, tagName) {
        super(props);

        let {items, createListItem} = props;

        let TAG_WHITELIST = ["ol", "ul"];

        if (!TAG_WHITELIST.includes(tagName)) {
            throw new Error("Invalid argument props.tagName. Must be one of " + TAG_WHITELIST.join(", "));
        }

        this.tagName = tagName;
        this.createListItem = createListItem;

        this.state = {
            items: items
        }
    }

    componentWillReceiveProps({items}) {
        this.setState({
            items: items
        })
    }

    render() {
        let {items} = this.state;

        let Tag = this.tagName;

        let listItems = items.map(this.createListItem);

        return (
            <Tag className={this.props.className}>
                {listItems}
            </Tag>
        );
    }
}

export default HtmlList;
