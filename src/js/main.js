import React from 'react';
import ReactDOM from 'react-dom';
import {QFWrapper} from "./components/quick-filter-search/wrapper/qf-wrapper.component";

require("../style/test.css");
require("../style/test.scss");

window.addEventListener("load", () => {
    const domContainer = document.getElementById('test');
    ReactDOM.render((new QFWrapper({})).render(), domContainer);
});

