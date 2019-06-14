import {ESGFFilterDTO} from "../dto/esgf-filter.dto";
import * as React from "react";
import StringFormatter from "../formatters/string.formatter";
import InfoTabVM from "../view-model/InfoTabVM";
import {PageColumnTabs} from "../../components/info/tab/info-tab.component";

export class FilterListItemFactoryFactory {
    createFactory(onClick: (filter: ESGFFilterDTO) => void): (filter: ESGFFilterDTO) => JSX.Element {
        return (filter: ESGFFilterDTO) =>
            <li key={filter.shortName}
                className="filter"
                onClick={() => onClick(filter)}>
                {StringFormatter.toHumanText(filter.shortName)}
            </li>;
    }
}

export type SearchFunction<TItem> = (query: string, items: TItem[]) => TItem[];
export type SearchComponentModel<TItem = any> = {
    searchMethod: SearchFunction<TItem>,
    headerButtons?: JSX.Element[]
}

export default class PageColumnTabFactory {
    /** @deprecated use InfoTab component directly instead*/
    createInfoTab(viewModel: InfoTabVM): JSX.Element {
        return <PageColumnTabs.InfoTabs.InfoTab viewModel={viewModel}/>;
    }


}