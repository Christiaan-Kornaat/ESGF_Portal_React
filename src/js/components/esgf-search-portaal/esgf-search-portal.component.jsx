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

        let { filterProvider, selectedPropertyManager, QuickSelectManager} = this.props;

        this._filterProvider = filterProvider;
        this._selectedPropertyManager = selectedPropertyManager;
        this._QuickSelectManager = QuickSelectManager;
    }

    render() {
        return (
            <Tabs activeKey={this.state.key}
                  onSelect={key => this.setState({key})}>
                <Tab eventKey="QF" title="Quick select">
                    <QFWrapper  filterProvider={this._filterProvider}
                                selectedPropertyManager={this._selectedPropertyManager}
                                QuickSelectManager={this._QuickSelectManager} />
                </Tab>
                <Tab eventKey="XPF" title="Extended property finder">
                    <XPFWrapper filterProvider={this._filterProvider}
                                selectedPropertyManager={this._selectedPropertyManager}/>
                </Tab>
                <Tab eventKey="CQF" title="Customize quick filters">
                    <QFWrapper filterProvider={this._filterProvider}
                               selectedPropertyManager={this._selectedPropertyManager}
                               QuickSelectManager={this._QuickSelectManager}/>
                </Tab>
                <Tab tabClassName='tab-hidden' eventKey="CLR" title="^"/>
            </Tabs>
        );
    }
}