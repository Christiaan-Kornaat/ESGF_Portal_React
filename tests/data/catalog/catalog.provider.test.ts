import ICatalogService from "../../../src/js/data/catalog/catalog.service.interface";
import ESGFDataNodeResultDTO from "../../../src/js/model/dto/esgf-data-node-result.dto";
import EsgfCatalogItem from "../../../src/js/model/dto/esgf-catalog-item.dto";
import CatalogProvider from "../../../src/js/data/catalog/catalog.provider";

describe("CatalogProvider", () => {
    let mockService: ICatalogService;
    let mockDataNodeResult: ESGFDataNodeResultDTO;
    let mockDataNodeResult2: ESGFDataNodeResultDTO;

    beforeEach(() => {
        mockService = new class implements ICatalogService {
            async fetch(node: ESGFDataNodeResultDTO): Promise<EsgfCatalogItem> {
                return new EsgfCatalogItem([
                    {
                        name: node.esgfid,
                        dataSize: {units: "test", amount: 0},
                        variables: {variables: [], vocabulary: "test-vocab"}
                    }
                ]);
            }
        };

        mockDataNodeResult = new ESGFDataNodeResultDTO("test-id", "test-id", "test-node", "http://test-url");
        mockDataNodeResult2 = new ESGFDataNodeResultDTO("test-id2", "test-id2", "test-node2", "http://test-url2");
    });

    afterEach(() => {
        mockService = null;
    });

    test("will cache results", async () => {
        let provider = new CatalogProvider(mockService);

        let actual1 = await provider.provide(mockDataNodeResult);
        let actual2 = await provider.provide(mockDataNodeResult);

        let actual12 = await provider.provide(mockDataNodeResult2);
        let actual22 = await provider.provide(mockDataNodeResult2);

        expect(actual1).toStrictEqual(actual2);
        expect(actual12).toStrictEqual(actual22);
        expect(actual2).not.toStrictEqual(actual12);
        expect(actual2).not.toStrictEqual(actual22);
    });
});