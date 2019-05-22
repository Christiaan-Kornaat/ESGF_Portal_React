import {ESGFFilterDTO} from "../dto/esgf-filter.dto";
import * as React from "react";
import PageColumnTab from "../../components/shared/pages/page-columned/page-column-tab.component";
import StringFormatter from "../formatters/string.formatter";
import InfoTabVM from "../view-model/InfoTabVM";

export class FilterListItemFactoryFactory {
    createFactory(onClick: (filter: ESGFFilterDTO) => void) {
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
    createInfoTab(viewModel: InfoTabVM): JSX.Element {
        let {paragraphs, textTitle} = viewModel;

        let InfoParagraph = ({title, content}) =>
            <div className="paragraph">
                <h5 className="header">{title}</h5>
                <p className="text">
                    {content}
                </p>
            </div>;


        let paragraphObjects = Object.keys(paragraphs)
                                     .map(key => <InfoParagraph key={key}
                                                                title={key}
                                                                content={paragraphs[key]}/>);

        let content = (
            <div className="infotab">
                <h4 className="title">{textTitle}</h4>
                {paragraphObjects}
            </div>
        );

        return <PageColumnTab title={viewModel.tabTitle}
                              key={viewModel.tabTitle}>{[content]}</PageColumnTab>;
    }


}