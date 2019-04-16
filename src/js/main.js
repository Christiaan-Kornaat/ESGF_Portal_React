import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app";
import 'bootstrap';


require("../style/test.css");
require("../style/test.scss");



window.addEventListener("load", () => {
    const domContainer = document.getElementById('test');
    ReactDOM.render((new App()).render(), domContainer);
});
