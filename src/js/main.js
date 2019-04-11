import React from 'react';
import ReactDOM from 'react-dom';
import {XPFWrapper} from "./components/expanded-property-finder/wrapper/xpf-wrapper.component";

window.addEventListener("load", () => {
    const domContainer = document.getElementById('test');
    ReactDOM.render((new XPFWrapper({})).render(), domContainer);
});

