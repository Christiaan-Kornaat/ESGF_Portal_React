import React, {Component} from 'react';
import {ESGFFilterProvider} from "./providers/esgf-filter/esgf-filter.provider";
import {ESGFFilterServiceMock} from "./services/esgf-filter/esgf-filter.service.mock";
import {ESGFSearchPortal} from "./components/esgf-search-portaal/esgf-search-portal.component";

class App extends Component {
    render() {
        let filterService = new ESGFFilterServiceMock();
        let filterProvider = new ESGFFilterProvider(filterService);

        return (
            <div>
                <ESGFSearchPortal filterProvider={filterProvider}/>
            </div>
        );
    }
}

export default App;