import * as React from "react";
import {Component} from "react";
import PageColumn, {PageColumnModel} from "./page-column.component";

export type ColumnedPageProps = { columns?: Map<string, PageColumnModel>, className? };
export type ColumnedPageState = { columns: Map<string, PageColumnModel>, className? };

export default class ColumnedPage<P extends ColumnedPageProps = ColumnedPageProps> extends Component<P> {

    public state: ColumnedPageState;

    constructor(props: P) {
        super(props);

        let {columns, className} = props;

        this.state = {
            columns: columns || new Map<string, PageColumnModel>(),
            className: className || ""
        };

        this.columnExists = this.columnExists.bind(this);
        this.selectTab = this.selectTab.bind(this);
    }

    private createColumn({id, tabs, className, activeTab}: PageColumnModel): JSX.Element {
        if (!activeTab) activeTab = null;

        return <PageColumn id={id}
                           key={id}
                           tabs={tabs}
                           className={className}
                           activeTab={activeTab}/>;
    }

    public columnExists(columnName): boolean {
        let {columns} = this.state;

        return columns.has(columnName);
    }

    public tabExists(columnName, tabName): boolean {
        if (!this.columnExists(columnName)) return false;

        let {columns} = this.state;
        return columns.get(columnName).tabs.has(tabName);
    }

    public setTab(columnName: string, tab: JSX.Element, key: string): void {
        if (!this.columnExists(columnName)) throw new Error(`column ${columnName} not found`);

        let {columns} = this.state;
        let column = columns.get(columnName);
        column.tabs.set(key, tab);
        columns.set(columnName, column);

        this.setState({columns: columns});
    }

    public selectTab(columnName: string, tabName: string): void {
        let {columns} = this.state;

        if (!this.tabExists(columnName, tabName)) {
            throw new Error(`column or tab ${columnName}[${tabName}] not found`);
        }

        let column = columns.get(columnName);

        column.activeTab = tabName;
        columns.set(columnName, column);

        this.setState({columns: columns});
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