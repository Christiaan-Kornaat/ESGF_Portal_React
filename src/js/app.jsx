import React, {Component} from "react";
import {ESGFSearchPortal} from "./components/esgf-search-portaal/esgf-search-portal.component";
import QuickSelectManagerMock from "./managers/quick-filter/quick-filter.manager.mock";
import SelectedPropertyManager from "./managers/selected-property.manager";
import {ESGFFilterProvider} from "./providers/esgf-filter/esgf-filter.provider";
import {ESGFFilterServiceDemo} from "./services/esgf-filter/esgf-filter.service.demo";
import {ESGFFilterServiceMock} from "./services/esgf-filter/esgf-filter.service.mock";

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
    }
};

const environment = "demo";

class App extends Component {
    render() {
        let {FilterService, FilterProvider, SelectedPropertyManager, QuickFilterManager} = Dependencies[environment];

        let filterService = new FilterService();

        let filterProvider = new FilterProvider(filterService);
        let selectedPropertyManager = new SelectedPropertyManager();
        let quickFilterManager = new QuickFilterManager();

        return (
            <div>
                <ESGFSearchPortal filterProvider={filterProvider}
                                  selectedPropertyManager={selectedPropertyManager}
                                  QuickSelectManager={quickFilterManager}/>
            </div>
        );
    }
}

export default App;