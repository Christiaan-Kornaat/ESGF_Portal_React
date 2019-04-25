import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import XpfColumnTab from "../column/xpf-column-tab.component";

class XpfColumn extends Component {
    constructor(props) {
        super(props);

        let { tabs } = props;
        
        let [activeTab] = Object.keys(tabs);

        this.state = {
            activeTab: activeTab,
            tabs:tabs
        };

        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }
    
    componentWillReceiveProps({tabs}) {
        this.setState({
            tabs:tabs
        })
    }
    
    render() {

        let { activeTab, tabs } = this.state;

        let tabComponents = Object.keys(tabs).map(name => (
            <Tab 
            className="centered-tab"
            eventKey={name} 
            title={name}>
                {tabs[activeTab]}
            </Tab>
        ));

        return (
            <div className={this.props.className}>
                
                <Tabs
                    className="nav-center"
                    activeKey={activeTab}
                    onSelect={activeTab => this.setState({ activeTab })}>
                    {tabComponents}
                </Tabs>
                

            </div>
        );
    }
}

export default XpfColumn;