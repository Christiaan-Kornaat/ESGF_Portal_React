import QueryValidator from "./query.validator";

export type SearchComparator<T> = (query: string, possibleMatch: T) => boolean;

class Searcher<T> {

    private readonly _comparator: SearchComparator<T>;

    constructor(comparator: SearchComparator<T>) {
        this._comparator = comparator;
    }

    /**
     * @summary Searches through filters, returns items that match
     */
    search(queries: string[], items: T[]): T[] {
        let {isQueryValid} = QueryValidator;

        let createSearcher = (items: T[]) => (query: string) => items.filter(item => this._comparator(query, item));
        let searcher = createSearcher(items);

        let searchedItems = new Set<T>();

        queries.filter(isQueryValid)
               .reduce((currentList, query) => currentList.concat(searcher(query)), [])
               .forEach(item => searchedItems.add(item));

        return Array.from(searchedItems.values());
    };

}

export default Searcher;