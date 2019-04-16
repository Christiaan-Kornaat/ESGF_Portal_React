import React from 'react';
import HtmlList from "../list-html/list-html.component";

class OrderedList extends HtmlList {
    constructor(props) {
        super(props, "ol");
    }
}

export default OrderedList;