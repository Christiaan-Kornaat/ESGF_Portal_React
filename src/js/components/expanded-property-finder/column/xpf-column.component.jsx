import React, {Component} from "react";
import {Tab, Tabs} from "react-bootstrap";

class XpfColumn extends Component {
    constructor(props) {
        super(props);

        let {tabs, activeTab, onSelect} = props;

        if (activeTab == null) {
            [activeTab] = Object.keys(tabs);
        }

        this.state = {
            activeTab: activeTab,
            tabs: tabs
        };

        this.onSelect = onSelect == null ? () => null : onSelect;

        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    componentWillReceiveProps({tabs, activeTab}) {
        this.setState({
            tabs: tabs,
            activeTab: activeTab == null ? this.state.activeTab : activeTab
        });
    }

    render() {

        let {activeTab, tabs} = this.state;

        let tabComponents = Object.keys(tabs)
                                  .map(name => (
                                      <Tab
                                          className="centered-tab"
                                          eventKey={name}
                                          title={name}>
                                          {tabs[name]}
                                      </Tab>
                                  ));

        let handleSelect = selectedTab => {
            this.onSelect(selectedTab);
            this.setState({activeTab: selectedTab});
        };

        return (
            <div className={this.props.className}>
                <Tabs className="nav-center"
                      activeKey={activeTab}
                      onSelect={handleSelect}>
                    {tabComponents}
                </Tabs>
            </div>
        );
    }
}

export default XpfColumn;