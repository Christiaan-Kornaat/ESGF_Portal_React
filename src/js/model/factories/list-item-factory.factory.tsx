import * as React from "react";
import StringFormatter from "../formatters/string.formatter";
import Buttons from "../../components/shared/buttons/buttons.component";
import ESGFFilterPropertyDTO from "../dto/esgf-filter-property.dto";
import EsgfFilterPropertyVM from "../view-model/esgf-filter-property.viewmodel";

export default class ListItemFactoryFactory {
    /**
     *
     * @param {function(ESGFFilterPropertyDTO): void} onClick
     * @param {function(ESGFFilterPropertyDTO): function(): void} createOnInfoClick
     * @param {function(ESGFFilterPropertyDTO): boolean} isSelectedFunction
     * @return {function(ESGFFilterPropertyDTO): Element}
     */
    createPropertyListItemFactory(onClick: (property: ESGFFilterPropertyDTO) => void, createOnInfoClick, isSelectedFunction) {
        return (property: ESGFFilterPropertyDTO) => {
            let viewModel = new EsgfFilterPropertyVM(property);
            let checked = isSelectedFunction(property);
            let onInfoClick = createOnInfoClick(property);

            return (
                <li key={property.name}
                    className={checked ? "selected property" : "property"}
                    onClick={() => onClick(property)}>
                    <input className={"checkbox"}
                           type={"checkbox"}
                           onChange={() => null} //prevents error message
                           checked={checked}/>
                    <Buttons.Info onClick={onInfoClick}/>
                    {viewModel.name}
                </li>
            );
        };
    }

    /**
     *
     * @param {function(ESGFFilterDTO): void} onClick
     *
     * @return {function(ESGFFilterDTO): Element}
     */
    createFilterListItemFactory(onClick: (ESGFFilterDTO) => void) {
        return filter => <li key={filter.shortName}
                             className="filter"
                             onClick={() => onClick(filter)}>
            {StringFormatter.toHumanText(filter.shortName)}
        </li>;
    }

    /**
     *
     * @param {ESGFFilterPropertyDTO}item
     * @return {Component}
     * @constructor
     */
    createQuickFilterListItem(item: ESGFFilterPropertyDTO) {

        let createSliceWord = (nLetters: number) => (word: string) => word.split("")
                                                                          .slice(0, nLetters)
                                                                          .join("");

        let smallWord = createSliceWord(3)(item.filter.shortName);

        return (
            <li key={`${item.filter}-${item.name}`}
                className="qf-property">
                <span className="name">
                    {item.name}
                    <span className={"float-right text-right mr-1"}>({smallWord})</span>
                </span>
            </li>
        );
    };

}