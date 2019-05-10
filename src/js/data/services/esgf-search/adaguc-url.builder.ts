import ESGFFilterPropertyDTO from "../../../model/dto/esgf-filter-property.dto";
import {SorterFactoryFactory} from "../../../sorters/sorter.factory.factory";
import {propertyComparator} from "../../../sorters/comparators/esgf.comparator";

export default class AdagucUrlBuilder {

    private readonly hostUrl: URL;

    constructor(urlBase: URL) {
        this.hostUrl = urlBase;
    }

    /*
     * /esgfsearch/search?service=search&request=getfacets&query=project%3Dc3s-cordex%26project%3Dc3s-cmip5%26&pagelimit=25&pagenumber=0&callback=jQuery112408304695826026522_1557395202794&_=1557395202903
     *
     * */
    public buildSearchUrl(selectedProperties: ESGFFilterPropertyDTO[]): URL {
        const SEARCH_PATH = "/esgfsearch/search";

        const comparator = propertyComparator;
        const sorter = (new SorterFactoryFactory()).createSorter(true, comparator);

        const url = new URL(SEARCH_PATH, this.hostUrl);
        url.searchParams.append("service", "search");
        url.searchParams.append("request", "getfacets");

        let orderedProperties = sorter(selectedProperties);

        const toQueryItem = (property: ESGFFilterPropertyDTO) => property.filter.shortName + "=" + property.name;
        let query = orderedProperties.map(toQueryItem)
                                     .join("&");

        url.searchParams.append("query", encodeURI(query));

        return url;
    }
}