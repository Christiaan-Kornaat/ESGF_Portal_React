import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app";

require("../style/test.css");


window.addEventListener("load", () => {
    const domContainer = document.getElementById('test');
    ReactDOM.render((new App()).render(), domContainer);
});
