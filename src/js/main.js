import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import initializeStore from './initializeReduxStore';
import App from './App.jsx';
import {initialiseLikeButton} from "./search-list/like_button";

window.addEventListener("load", () => {
    console.log('loaded');

    // ReactDOM.render(<Provider store={initializeStore()}><App/></Provider>, document.getElementById('app'));//TODO
    initialiseLikeButton();

    console.log("done");
});

