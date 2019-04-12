import React, {Component} from 'react';
import XPFWrapper from "./components/expanded-property-finder/wrapper/xpf-wrapper.component";
import {ESGFFilterProvider} from "./providers/esgf-filter/esgf-filter.provider";
import {ESGFFilterServiceMock} from "./services/esgf-filter/esgf-filter.service.mock";

class App extends Component {
    render() {
        let filterService = new ESGFFilterServiceMock();
        let filterProvider = new ESGFFilterProvider(filterService);

        return (
            <div>
                <XPFWrapper filterProvider={filterProvider}/>
            </div>
        );
    }
}

export default App;