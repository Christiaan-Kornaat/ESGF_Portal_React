import * as React from "react";
import {Component} from "react";
import PageColumn, {PageColumnModel} from "./page-column.component";

export type ColumnedPageProps = { columns: Map<string, PageColumnModel>, className };
export type ColumnedPageState = { columns: Map<string, PageColumnModel>, className };

export default class ColumnedPage extends Component<ColumnedPageProps> {

    public state: ColumnedPageState;

    constructor(props: ColumnedPageProps) {
        super(props);

        let {columns, className} = props;

        this.state = {
            columns: columns,
            className: className
        };
    }

    private createColumn({id, tabs, className, activeTab}: PageColumnModel) {
        if (!activeTab) activeTab = null;

        return <PageColumn id={id}
                           key={id}
                           tabs={tabs}
                           className={className}
                           activeTab={activeTab}/>;
    }

    render() {
        let {columns, className} = this.state;

        const values = columns.values();
        let columnComponents = Array.from(values).map(model => this.createColumn(model));

        return (
            <section className={className}>
                {columnComponents}
            </section>
        );
    }
}