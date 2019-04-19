import React from "react";

export class QFSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {
                width: 350
            }
        };
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
    }

    openNav() {
        const style = { width: 350 };
        this.setState({ style });
        document.addEventListener("click", this.closeNav);
    }

    closeNav() {
        document.removeEventListener("click", this.closeNav);
        const style = { width: 0 };
        this.setState({ style });
    }

    render() {
        return (
            <div className="overlay" style={this.state.style}>
                <div className="sidenav-container">
                    <a
                        href="javascript:void(0)"
                        className="closebtn"
                        onClick={this.closeNav}>x</a>
                    <div className="text-center">
                        <h2>Presets</h2>
                        <p>Hier moeten die presets komen</p>
                    </div>
                    <div className="list-group">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

