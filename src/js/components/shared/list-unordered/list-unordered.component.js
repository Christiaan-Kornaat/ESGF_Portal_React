import * as PropTypes from "prop-types";
import React from "react";
import HtmlList from "../list-html/list-html.component";

class UnorderedList extends HtmlList {
    constructor(props) {
        super(props, "ul");
    }
}

UnorderedList.propTypes = {
    items: PropTypes.array.isRequired,
    createListItem: PropTypes.func.isRequired
};

export default UnorderedList;