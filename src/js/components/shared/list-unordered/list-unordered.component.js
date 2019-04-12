import React from 'react';
import HtmlList from "../list-html/list-html.component";

class UnorderedList extends HtmlList {
    constructor(props) {
        super(props, "ul");
    }
}

export default UnorderedList;