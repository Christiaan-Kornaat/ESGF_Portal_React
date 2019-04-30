import React, {Component} from "react";
import {Tab, Tabs} from "react-bootstrap";

export class ESGFSearchPortal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: this.props.tabs,
            key: this.props.tabs[0],
            prevKey: "CLR"
        };

    }

    componentWillReceiveProps(tabs) {
        this.setState({
            tabs: tabs
        });
    }

    render() {
        let {tabs, key, prevKey} = this.state;

        let tabComponents = Object.keys(tabs)
        .map(name => (
            <Tab
                key={name}
                eventKey={name}
                title={name}>
                {tabs[name]}
            </Tab>
        ));

        return (
            <Tabs activeKey={key} 
                onSelect={ key => this.setState({key: key, prevKey: this.state.key})}>
                {tabComponents}
                <Tab tabClassName='tab-hidden' eventKey={ key === "CLR" ? prevKey : "CLR"} title={ <i className={ key === "CLR" ? 'fas fa-angle-down' : 'fas fa-angle-up'}></i> } />
            </Tabs>
        );
    }
}