import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app";
import '../../node_modules/bootstrap/dist/js/bootstrap';


require("../style/ESGFSearch.scss");


window.addEventListener("load", () => {
    const domContainer = document.getElementById('test');
    ReactDOM.render((new App()).render(), domContainer);
});
