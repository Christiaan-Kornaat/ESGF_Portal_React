import React, {Component} from 'react';
import {ESGFFilterProvider} from "./providers/esgf-filter/esgf-filter.provider";
import {ESGFFilterServiceMock} from "./services/esgf-filter/esgf-filter.service.mock";
import {ESGFSearchPortal} from "./components/esgf-search-portaal/esgf-search-portal.component";
import SelectedPropertyManager from "./managers/selected-property.manager";

class App extends Component {
    render() {
        let filterService = new ESGFFilterServiceMock();
        let filterProvider = new ESGFFilterProvider(filterService);

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