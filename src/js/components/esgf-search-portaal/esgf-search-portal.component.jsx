import React, {Component} from "react";
import {Tab, Tabs} from "react-bootstrap";
import XPFWrapper from "../expanded-property-finder/wrapper/xpf-wrapper.component";
import {QFWrapper} from "../quick-filter-search/wrapper/qf-wrapper.component";

export class ESGFSearchPortal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            key: "QF"
        };

        let {filterProvider, selectedPropertyManager} = this.props;

        this._filterProvider = filterProvider;
        this._selectedPropertyManager = selectedPropertyManager;
    }

    render() {
        return (
            <Tabs activeKey={this.state.key}
                  onSelect={key => this.setState({key})}>
                <Tab eventKey="QF" title="Quick select">
                    <QFWrapper  filterProvider={this._filterProvider}
                                selectedPropertyManager={this._selectedPropertyManager} />
                </Tab>
                <Tab eventKey="XPF" title="Extended property finder">
                    <XPFWrapper filterProvider={this._filterProvider}
                                selectedPropertyManager={this._selectedPropertyManager}/>
                </Tab>
                <Tab eventKey="CQF" title="Customize quick filters">
                    <h1>Tab 3</h1>
                </Tab>
                <Tab tabClassName='tab-hidden' eventKey="CLR" title="^"/>
            </Tabs>
        );
    }
}