import InfoTabVM from "../view-model/InfoTabVM";
import {ESGFFilterDTO} from "../dto/esgf-filter.dto";
import ESGFFilterPropertyDTO from "../dto/esgf-filter-property.dto";

export default class InfoTabVmFactory {
    createPropertyVM({name, filter}: ESGFFilterPropertyDTO) {
        return new InfoTabVM("Info - Property", name, {"Filter": filter.shortName});
    }

    createFilterVM({shortName, propertyCount}: ESGFFilterDTO) {
        return new InfoTabVM("Info - Filter", shortName, {"Property count": propertyCount});
    }
}