import React from 'react';
import ReactDOM from 'react-dom';
import {QFWrapper} from "./components/quick-filter-search/wrapper/qf-wrapper.component";

window.addEventListener("load", () => {
    const domContainer = document.getElementById('test');
    ReactDOM.render((new QFWrapper({})).render(), domContainer);
});

