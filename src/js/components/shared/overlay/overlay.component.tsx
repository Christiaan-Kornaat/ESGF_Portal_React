import React, { Component } from "react";

export class Overlay extends Component<{ background: JSX.Element, foreground: JSX.Element, onClick: any }> {
    onClick: any;

    state: {
        background: JSX.Element,
        foreground: JSX.Element
    };

    constructor(props) {
        super(props);

        let { background, foreground, onClick } = props;
        this.onClick = onClick;

        this.state = {
            background: background,
            foreground: foreground
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.background == prevState.background && nextProps.foreground == prevState.foreground) return null;
        return {
            background: nextProps.background,
            foreground: nextProps.foreground
        };
    }

    render() {
        let { onClick, state: { background, foreground } } = this;

        return (
            <div className="overlayContainer">
                <div className="background">{background}</div>
                <div className="foreground" onClick={onClick}>{foreground}</div>
            </div>
        );
    }
}
