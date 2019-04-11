'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const createElement = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {liked: false};
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }

        return createElement(
            'button',
            {onClick: () => this.setState({liked: true})},
            'Like'
        );
    }
}

export function initialiseLikeButton() {
    const domContainer = document.querySelector('#like_button_container');
    ReactDOM.render(createElement(LikeButton), domContainer);

    console.log('test');
}

