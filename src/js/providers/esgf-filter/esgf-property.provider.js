import { QFFilterTileDTO } from "../../model/dto/QFFilterTileDTO";

export class ESGFPropertyProvider {

    constructor(filterProvider){
        this._filterProvider = filterProvider;
    }

    /**
     *
     * @return {QFFilterTileDTO[]}
     */
    provide(filterName) {
        if (this.filters == null) {
            return this.filterService.fetch().then(filters => {
                this.filters[filterName] = filters;
                let item = filters;
                let items = item != null ? item.properties : [];
                return items;
            });
        }
        let item = this.filters[filterName];
        let items = item != null ? item.properties : [];

        return new Promise(resolve => resolve(items));
    }
}
