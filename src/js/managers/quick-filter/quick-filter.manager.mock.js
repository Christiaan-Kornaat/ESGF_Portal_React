import {QFFilterTileDTO} from "../../model/dto/QFFilterTileDTO";

class QuickSelectManagerMock {

    constructor() {
        this.tileInfo = [
            new QFFilterTileDTO("access", "#f9a718", "fas fa-thermometer-three-quarters", [
                "NetcdfSubset", "HTTPServer", "GridFTP", "OPENDAP", "Globus", "WMS", "LAS"
            ]),
            new QFFilterTileDTO("experiment", "#14fc61", "fas fa-wind", [
                "esmFdbk2", "historicalNat", "L1C26", "esmFdbk1", "commit", "MERRA-reanalysis", "convoffamip4K"
            ]),
            new QFFilterTileDTO("time_frequency", "#dd14fc", "fas fa-tint", [
                "6hr", "subhr", "seasonClim", "monClim-5yr", "mon", "monClim-50yr", "5yr"
            ]),
            new QFFilterTileDTO("domain", "#f91634", "fas fa-cloud-sun-rain", [
                "EUR-05", "NAM-11", "CEU-36km", "EAS-44i", "EUR-44i", "AUS-44", "CAM-44"
            ]),
            new QFFilterTileDTO("variable", "#24ccd8", "fas fa-radiation", [
                "tds", "ccb", "sidmassgrowthwat", "DP_WCLDBASE", "snownc", "tasmaxCrop", "H2O2"
            ])
        ];
    }

    /**
     *
     * @param {Array}tileInfo
     */
    addTileInfo(tileInfo) {
        this.tileInfo.push(tileInfo);
    };


    /**
     *
     * @return {Array<QFFilterTileDTO>}
     */
    get TileInfo() {
        return this.tileInfo;
    }
}

export default QuickSelectManagerMock;