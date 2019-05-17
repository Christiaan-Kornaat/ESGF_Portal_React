import * as React from "react";
import {Component} from "react";
import XpfColumn from "../column/xpf-column.component";

export default class XPFWrapper extends Component<{columnTabs: any, selectedTabs: any}> {
    constructor(props) {
        super(props);

        let { columnTabs, selectedTabs} = props;

        this.state = {
            columnTabs: columnTabs,
            selectedTabs: selectedTabs || { filterColumn: null, propertyColumn: null, selectedColumn: null },
        };
    }

    componentWillReceiveProps({  columnTabs, selectedTabs }) {
        let newState = {
            columnTabs: columnTabs,
            selectedTabs: selectedTabs
        };

        this.setState(newState);
    }

    render() {
        //@ts-ignore
        let { selectTab, state: { selectedTabs, columnTabs } } = this;

        return (
            <section className='XPF-Wrapper'>
                <XpfColumn className="Filters"
                    key={"Filters"}
                    tabs={columnTabs.left}
                    activeTab={selectedTabs.filterColumn} />
                <XpfColumn className="Properties"
                    key={"Properties"}
                    tabs={columnTabs.center}
                    activeTab={selectedTabs.propertyColumn} />
                <XpfColumn className="SelectedProperties"
                    key={"SelectedProperties"}
                    tabs={columnTabs.right}
                    activeTab={selectedTabs.selectedColumn} />
            </section>
        );
    }
}