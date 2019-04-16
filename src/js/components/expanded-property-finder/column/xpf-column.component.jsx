import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import XpfColumnTab from "../column/xpf-column-tab.component";

class XpfColumn extends Component {
    constructor(props) {
        super(props);

        let { tabs, searchFunction, items, listItemFactory } = props;

        this.search = searchFunction;
        this.tabs = tabs;
        this.listItemFactory = listItemFactory;

        let [activeTab] = Object.keys(this.tabs);

        this.state = {
            items: items,
            renderItems: items,
            activeTab: activeTab
        };

    }
    
    componentWillReceiveProps({ items }) {
        let { searchQuery: query, renderItems } = this.state;

        if (query == null || query.trim() === "")
            renderItems = items;

        this.setState({
            items: items,
            renderItems: renderItems
        })
    }

    render() {

        let { activeTab } = this.state;

        let tabs = Object.keys(this.tabs).map(name => (
            <Tab 
            className="centered-tab"
            eventKey={name} 
            title={name}>
                <XpfColumnTab 
                    searchFunction={this.search}
                    items={this.state.items}
                    listItemFactory={this.listItemFactory}
                />
            </Tab>
        ));

        return (
            <div className={this.props.className}>
                
                <Tabs
                    className="nav-center"
                    activeKey={activeTab}
                    onSelect={activeTab => this.setState({ activeTab })}
                >
                    {tabs}
                </Tabs>
                

            </div>
        );
    }
}

export default XpfColumn;