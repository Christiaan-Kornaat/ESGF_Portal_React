import React, {Component} from "react";
import {Tab, Tabs} from "react-bootstrap";
import PageColumnTab from "./page-column-tab.component";

type PageColumnProps = { tabs: Map<string, PageColumnTab>, activeTab?: string, id: string, className?: string };

export type PageColumnModel = { tabs: Map<string, PageColumnTab>, activeTab?: string, id: string, className?: string }

class PageColumn extends Component<PageColumnProps> {
    get selectedTab() {
        return this.state.tabs.get(this.state.activeTabName);
    }

    public state: { activeTabName: string, tabs: Map<string, PageColumnTab> };

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
     * @param {Component} content
     *
     * @return Component
     */
    private createTab({title, content}: PageColumnTab) {
        return <Tab key={title}
                    className="centered-tab"
                    eventKey={title}
                    title={title}>{content}</Tab>;
    };

    render() {
        let {activeTabName, tabs} = this.state;

        let tabComponents = Array.from(tabs.values())
                                 .map(tab => this.createTab(tab));

        let handleSelect = selectedTab => {
            if (selectedTab === this.state.activeTabName) return;

            this.selectedTab.emitDeselected();
            this.setState({activeTabName: selectedTab});
            this.selectedTab.emitSelected();
        };

        return (
            <div className={this.props.className ? this.props.className : ""}>
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