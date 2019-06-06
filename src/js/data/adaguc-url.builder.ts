import ESGFFilterPropertyDTO from "../model/dto/esgf-filter-property.dto";
import {SorterFactoryFactory} from "../sorters/sorter.factory.factory";
import {propertyComparator} from "../sorters/comparators/esgf.comparator";
import IAdagucUrlBuilder from "./adaguc-url.builder.interface";
import ESGFDataNodeResultDTO from "../model/dto/esgf-data-node-result.dto";

export type PageInfo = { index: number, size: number };
export const DefaultPageInfo: PageInfo = {get index() { return 0;}, get size() { return 25;}};

export default class AdagucUrlBuilder implements IAdagucUrlBuilder {

    private readonly hostUrl: URL;

    constructor(urlBase: URL) {
        this.hostUrl = urlBase;
    }

    /*
     * /esgfsearch/search?service=search&request=getfacets&query=project%3Dc3s-cordex%26project%3Dc3s-cmip5%26&pagelimit=25&pagenumber=0
     *
     * */
    public buildSearchUrl(selectedProperties: ESGFFilterPropertyDTO[], {index = 0, size = 25}: PageInfo = DefaultPageInfo): URL {
        const SEARCH_PATH = "/esgfsearch/search";

        const comparator = propertyComparator;
        const sorter = (new SorterFactoryFactory()).createSorter(true, comparator);

        const url = new URL(SEARCH_PATH, this.hostUrl);
        url.searchParams.append("service", "search");
        url.searchParams.append("request", "getfacets");

        url.searchParams.append("pagenumber", String(index));
        url.searchParams.append("pagelimit", String(size));

        let orderedProperties = sorter(selectedProperties);

        const toQueryItem = (property: ESGFFilterPropertyDTO) => property.filter.shortName + "=" + property.name;
        let query = orderedProperties.map(toQueryItem)
                                     .join("&");

        url.searchParams.append("query", encodeURI(query));

        return url;
    }

    buildCatalogUrl(catalogItem: ESGFDataNodeResultDTO): URL {
        const SEARCH_PATH = "/esgfsearch/catalog";

        const url = new URL(SEARCH_PATH, this.hostUrl);
        url.searchParams.append("service", "catalogbrowser");
        url.searchParams.append("node", encodeURI(catalogItem.url));
        url.searchParams.append("mode", "flat");

        // url.searchParams.append("format", "text/html");

        return url;
    }
}