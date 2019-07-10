import React from 'react';
import ReactDOM from 'react-dom';
import SearchPortalApp from "./app";


require("../style/ESGFSearch.scss");

window.addEventListener("load", () => {
    const domContainer = document.getElementById('test');
    ReactDOM.render((new SearchPortalApp()).render(), domContainer);
});