import PageColumnListTab from "../../../shared/pages/page-columned/page-column-list-tab.component";
import * as React from "react";
import ESGFFilterPropertyDTO from "../../../../model/dto/esgf-filter-property.dto";
import {SearchComponentModel} from "../../../../model/factories/page-column-tab.factory";
import SorterManager from "../../../../sorters/sorter.manager";

export namespace ColumnTabs {
    export namespace ListTabs {
        export function PropertyListTab({title = "Properties", sorterManager, items = [], listItemFactory, isLoading = false, searchComponentModel}:
                                            { title?: string, items?: ESGFFilterPropertyDTO[], sorterManager: SorterManager, listItemFactory, isLoading?, searchComponentModel: SearchComponentModel<ESGFFilterPropertyDTO> }): JSX.Element {

            return <PageColumnListTab title={title}
                                      key={"PropertyList"}
                                      items={items}
                                      sortFunction={sorterManager.getCurrent()}
                                      listItemFactory={listItemFactory}
                                      isLoading={isLoading}
                                      searchComponentModel={searchComponentModel}/>;
        }
    }
}