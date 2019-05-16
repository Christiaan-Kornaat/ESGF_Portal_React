import ESGFFilterPropertyDTO from "../dto/esgf-filter-property.dto";
import ESGFPropertyDTOFormatter from "../formatters/esgf-property-dto.formatter";

export default class EsgfFilterPropertyVM {
    get dto(): ESGFFilterPropertyDTO {
        return this._dto;
    }

    get name(): string {
        return ESGFPropertyDTOFormatter.toHumanText(this._dto).name;
    }

    private readonly _dto: ESGFFilterPropertyDTO;

    constructor(dto: ESGFFilterPropertyDTO) {
        this._dto = dto;
    }


}