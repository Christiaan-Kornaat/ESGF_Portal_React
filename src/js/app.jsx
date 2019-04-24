import React, {Component} from "react";
import {ESGFSearchPortal} from "./components/esgf-search-portaal/esgf-search-portal.component";
import SelectedPropertyManager from "./managers/selected-property.manager";
import {ESGFFilterProvider} from "./providers/esgf-filter/esgf-filter.provider";
import {ESGFFilterServiceMock} from "./services/esgf-filter/esgf-filter.service.mock";
import {ESGFFilterServiceDemo} from "./services/esgf-filter/esgf-filter.service.demo";

const Dependencies = {
    dev: {
        FilterService: ESGFFilterServiceMock,
        FilterProvider: ESGFFilterProvider,
        SelectedPropertyManager: SelectedPropertyManager
    },
    demo: {
        FilterService: ESGFFilterServiceDemo,
        FilterProvider: ESGFFilterProvider,
        SelectedPropertyManager: SelectedPropertyManager
    }
};

const environment = "demo";

class App extends Component {
    render() {
        let {FilterService, FilterProvider, SelectedPropertyManager} = Dependencies[environment];

        let filterService = new FilterService();

        let filterProvider = new FilterProvider(filterService);
        let selectedPropertyManager = new SelectedPropertyManager();

        return (
            <div>
                <ESGFSearchPortal filterProvider={filterProvider}
                                  selectedPropertyManager={selectedPropertyManager}/>
            </div>
        );
    }
}

export default App;