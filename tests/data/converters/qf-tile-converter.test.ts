import IESGFFilterService from "../../../src/js/data/esgf-filter/esgf-filter.service.interface";
import {ESGFFilterDTO} from "../../../src/js/model/dto/esgf-filter.dto";
import ESGFFilterPropertyDTO from "../../../src/js/model/dto/esgf-filter-property.dto";
import {QFFilterTileDTO} from "../../../src/js/model/dto/qf-filter-tile.dto";
import {QFTileConverter} from "../../../src/js/data/converters/qf-tile-converter";
import {ESGFFilterProvider} from "../../../src/js/data/esgf-filter/esgf-filter.provider";

describe("QF-Tile-Converter", () => {

    let filterService: IESGFFilterService;
    let filterProvider: ESGFFilterProvider;


    let createFilter = () => new ESGFFilterDTO("test", 1, []);
    let createProperty = (filter: ESGFFilterDTO) => new ESGFFilterPropertyDTO("test-name", filter);
    let createQFTile = (properties) => new QFFilterTileDTO("test-tile", "#000", "test-icon", properties);
    let createQFTileJSON = () => ({
        title: "test-title",
        colour: "#000",
        icon: "test-icon",
        properties: [{name: "test-name", esgfFilterName: "test"}]
    });

    beforeEach(() => {
        filterService = new class implements IESGFFilterService {
            async fetchList(): Promise<ESGFFilterDTO[]> {
                let filter = createFilter();
                let property = createProperty(filter);

                filter.properties.push(property);

                return [
                    filter
                ];
            }
        };

        filterProvider = new ESGFFilterProvider(filterService);
    });

    afterEach(() => {
        filterService = null;
        filterProvider = null;
    });

    test("toJSONObject returns non-recursive object", () => {

        let converter = new QFTileConverter(filterProvider);

        let testTile = createQFTile([createProperty(createFilter())]);

        let {title, colour, icon, properties: [{name, esgfFilterName}]} = converter.toJSONObject(testTile);

        expect(title).toBe("test-tile");
        expect(colour).toBe("#000");
        expect(icon).toBe("test-icon");
        expect(name).toBe("test-name");
        expect(esgfFilterName).toBe("test");
    });

    test("toJSONObject returns non-recursive object", async () => {

        let converter = new QFTileConverter(filterProvider);

        let testTile = createQFTileJSON();

        let {title, color, icon, properties: [{name, filter}]} = await converter.fromJSONObject(testTile);

        expect(title).toBe("test-title");
        expect(color).toBe("#000");
        expect(icon).toBe("test-icon");
        expect(name).toBe("test-name");
        expect(filter.shortName).toBe("test");
    });
});
