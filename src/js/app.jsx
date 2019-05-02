import React, {Component} from "react";
import {ESGFSearchPortal} from "./components/esgf-search-portaal/esgf-search-portal.component";
import XPFWrapper from "./components/expanded-property-finder/wrapper/xpf-wrapper.component";
import {QFWrapper} from "./components/quick-filter-search/wrapper/qf-wrapper.component";
import {ESGFFilterProvider} from "./data/providers/esgf-filter/esgf-filter.provider";
import ESGFFilterService from "./data/services/esgf-filter/esgf-filter.service";
import {ESGFFilterServiceDemo} from "./data/services/esgf-filter/esgf-filter.service.demo";
import {ESGFFilterServiceMock} from "./data/services/esgf-filter/esgf-filter.service.mock";
import QuickSelectManagerMock from "./managers/quick-filter/quick-filter.manager.mock";
import SelectedPropertyManager from "./managers/selected-property.manager";

const Dependencies = {
    dev: {
        FilterService: ESGFFilterServiceMock,
        FilterProvider: ESGFFilterProvider,
        SelectedPropertyManager: SelectedPropertyManager,
        QuickFilterManager: QuickSelectManagerMock
    },
    demo: {
        FilterService: ESGFFilterServiceDemo,
        FilterProvider: ESGFFilterProvider,
        SelectedPropertyManager: SelectedPropertyManager,
        QuickFilterManager: QuickSelectManagerMock
    },
    prod: {
        FilterService: ESGFFilterService,
        FilterProvider: ESGFFilterProvider,
        SelectedPropertyManager: SelectedPropertyManager,
        QuickFilterManager: QuickSelectManagerMock
    }
};

const environment = "prod";

class App extends Component {
    render() {
        let {FilterService, FilterProvider, SelectedPropertyManager, QuickFilterManager} = Dependencies[environment];

        let filterService = new FilterService();

        let filterProvider = new FilterProvider(filterService);
        let selectedPropertyManager = new SelectedPropertyManager();
        let quickFilterManager = new QuickFilterManager();

        let QS = <QFWrapper
            filterProvider={filterProvider}
            selectedPropertyManager={selectedPropertyManager}
            QuickSelectManager={quickFilterManager}/>;

        let XPF = <XPFWrapper
            filterProvider={filterProvider}
            selectedPropertyManager={selectedPropertyManager}/>;

        return (
            <div>
                <ESGFSearchPortal
                    tabs={{"Quick select": QS, "Extended property finder": XPF, "Customize quick filters": QS}}/>
            </div>
        );
    }
}

export default App;