import React, {Component} from "react";
import {Tab, Tabs} from "react-bootstrap";

type PageColumnProps = { tabs: Map<string, JSX.Element>, onTabSelect: (tabName) => void, activeTab?: string, id: string, className?: string };

export type PageColumnModel = { tabs: Map<string, JSX.Element>, activeTab?: string, id: string, className?: string }

class PageColumn extends Component<PageColumnProps> {
    public state: { activeTabName: string, tabs: Map<string, JSX.Element> };

    constructor(props: PageColumnProps) {
        super(props);

        let {activeTab, tabs} = props;

        if (activeTab == null) {
            [activeTab] = Array.from(tabs.keys());
        }

        this.state = {
            activeTabName: activeTab,
            tabs: tabs
        };
    }

    componentWillReceiveProps({tabs, activeTab}: PageColumnProps) {
        this.setState({
            tabs: tabs,
            activeTabName: activeTab == null ? this.state.activeTabName : activeTab
        });
    }

    /**
     * TODO move to factory
     * @summary creates tab-component from PageColumnTab
     *
     * @param {string} title
     * @param {JSX.Element} element
     *
     * @return Component
     */
    private createTab(title: string, element: JSX.Element) {
        return <Tab key={title}
                    className="centered-tab"
                    eventKey={title}
                    title={title}>{element}</Tab>;
    };

    render() {
        let {activeTabName, tabs} = this.state;
        let {onTabSelect} = this.props;

        let tabComponents = Array.from(tabs.entries())
                                 .map(([title, tab]) => this.createTab(title, tab));

        let handleSelect = selectedTab => {
            if (selectedTab === this.state.activeTabName) return;

            if (onTabSelect) onTabSelect(selectedTab);
            this.setState({activeTabName: selectedTab});
        };

        return (
            <div className={this.props.className || ""}>
                <Tabs id={this.props.id}
                      className="nav-center"
                      activeKey={activeTabName}
                      onSelect={handleSelect}>
                    {tabComponents}
                </Tabs>
            </div>
        );
    }
}

export default PageColumn;