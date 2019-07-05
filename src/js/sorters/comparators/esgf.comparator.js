import {alphabeticalComparator} from "./primitive.comparator";
import { PresetDTO } from "../../model/dto/esgf-preset.dto";

/**
 * @param {ESGFFilterDTO}filter
 * @return {{isLessThan: (function(ESGFFilterDTO): boolean), isGreaterThan: (function(ESGFFilterDTO): boolean),
 *     isEqualTo: (function(ESGFFilterDTO): boolean)}}
 */
export function filterComparator(filter) {
    let base = alphabeticalComparator(filter.shortName);
    return {
        isGreaterThan: ({shortName}) => base.isGreaterThan(shortName),
        isLessThan: ({shortName}) => base.isLessThan(shortName),
        isEqualTo: ({shortName}) => base.isEqualTo(shortName)
    };
}

/**
 * @param {ESGFFilterPropertyDTO}property
 * @return {{isLessThan: (function(ESGFFilterPropertyDTO): boolean), isGreaterThan:
 *     (function(ESGFFilterPropertyDTO): boolean), isEqualTo: (function(ESGFFilterPropertyDTO): boolean)}}
 */
export function propertyComparator(property) {
    let base = alphabeticalComparator(property.name);
    return {
        isGreaterThan: ({name}) => base.isGreaterThan(name),
        isLessThan: ({name}) => base.isLessThan(name),
        isEqualTo: ({name}) => base.isEqualTo(name)
    };
}

/**
 * 
 * @param {PresetDTO} preset 
 */
export function presetComparator(preset) {
    let base = alphabeticalComparator(preset.title);
    return {
        isGreaterThan: ({title}) => base.isGreaterThan(title),
        isLessThan: ({title}) => base.isLessThan(title),
        isEqualTo: ({title}) => base.isEqualTo(title)
    };
}