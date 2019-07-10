import React from 'react';
import ReactDOM from 'react-dom';
import SearchPortalApp from "./app";


require("../style/ESGFSearch.scss");

if (process.env.NODE_ENV !== 'production') {
    const {whyDidYouUpdate} = require('why-did-you-update');
    whyDidYouUpdate(React);
}

window.addEventListener("load", () => {
    const domContainer = document.getElementById('test');
    ReactDOM.render((new SearchPortalApp()).render(), domContainer);
});