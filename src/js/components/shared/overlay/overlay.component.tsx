import React, {Component} from "react";

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

    componentWillReceiveProps({ background, foreground }) {
        this.setState({
            background: background,
            foreground: foreground
        });
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
