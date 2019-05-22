import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";

export class ESGFSearchPortal extends Component {
    constructor(props) {
        super(props);

        let { tabs } = props;

        let firstTab = Object.keys(tabs)[0];

        this.state = {
            tabs: tabs,
            key: firstTab,
            prevKey: firstTab
        };

    }

    componentWillReceiveProps(tabs) {
        this.setState({
            tabs: tabs
        });
    }

    render() {
        let { tabs, key, prevKey } = this.state;

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
                  mountOnEnter={true}
                onSelect={newKey => this.setState({ prevKey: key, key: newKey })}>
                {tabComponents}
                <Tab tabClassName='tab-hidden' eventKey={key === "CLR" ? prevKey : "CLR"} title={<i className={key === "CLR" ? 'fas fa-angle-down' : 'fas fa-angle-up'}></i>} />
            </Tabs>
        );
    }
}