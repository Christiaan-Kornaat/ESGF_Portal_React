import React, {Component} from "react";
import { Tabs , Tab } from 'react-bootstrap';
import XPFWrapper from '../expanded-property-finder/wrapper/xpf-wrapper.component';
import {QFWrapper} from '../quick-filter-search/wrapper/qf-wrapper.component'
export class ESGFSearchPortal extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        key: 'QF',
      };
      let { filterProvider} = props;

      this._filterProvider = filterProvider;
    }
  
    render() {
      return (
        <Tabs
          activeKey={this.state.key}
          onSelect={key => this.setState({ key })}
        >
          <Tab eventKey="QF" title="Quick select">
            <QFWrapper filterProvider={this._filterProvider}/>
          </Tab>
          <Tab eventKey="XPF" title="Extended property finder">
            <XPFWrapper filterProvider={this._filterProvider}/>
          </Tab>
          <Tab eventKey="CQF" title="Customize quick filters">
            <h1>Tab 3</h1>
          </Tab>
          <Tab tabClassName='Hide' eventKey="CLR" title="^"></Tab>
        </Tabs>
      );
    }
  }