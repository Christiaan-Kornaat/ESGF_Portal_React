import React from 'react';
import ReactDOM from 'react-dom';
import {ESGFFilterList} from './components/expanded-property-finder/esgf-filter-list/esgf-filter-list.component';

window.addEventListener("load", () => {
    const domContainer = document.getElementById('test');
    ReactDOM.render((new ESGFFilterList({})).render(), domContainer);
});

