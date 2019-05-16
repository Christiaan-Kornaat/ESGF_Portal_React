import * as React from "react";
import {Component} from "react";
import XpfColumn from "../column/xpf-column.component";

export default class XPFWrapper extends Component<{columnTabs: any, selectedTabs: any, selectTab: any}> {
    private selectTab: any;

    constructor(props) {
        super(props);

        let { columnTabs, selectedTabs, selectTab } = props;

        this.state = {
            columnTabs: columnTabs,
            selectedTabs: selectedTabs || { filterColumn: null, propertyColumn: null, selectedColumn: null },
        };

        this.selectTab = selectTab;
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
                    activeTab={selectedTabs.filterColumn}
                    onSelect={selectTab("filterColumn")} />
                <XpfColumn className="Properties"
                    key={"Properties"}
                    tabs={columnTabs.center}
                    activeTab={selectedTabs.propertyColumn}
                    onSelect={selectTab("propertyColumn")} />
                <XpfColumn className="SelectedProperties"
                    key={"SelectedProperties"}
                    tabs={columnTabs.right}
                    activeTab={selectedTabs.selectedColumn}
                    onSelect={selectTab("selectedColumn")} />
            </section>
        );
    }
}