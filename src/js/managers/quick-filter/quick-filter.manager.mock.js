import {QFFilterTileDTO} from "../../model/dto/QFFilterTileDTO";

class QuickSelectManager {

    constructor() {
        this.tileInfo = [
            new QFFilterTileDTO()
            {color: "#f9a718", icon: "fas fa-thermometer-three-quarters", type: "properties"},
            {color: "#14fc61", icon: "fas fa-wind", type: "properties"},
            {color: "#dd14fc", icon: "fas fa-tint", type: "properties"},
            {color: "#f91634", icon: "fas fa-cloud-sun-rain", type: "properties"},
            {color: "#24ccd8", icon: "fas fa-radiation", type: "properties"}
        ];
    }

    /**
     *
     * @param {Array}tileInfo
     */
    addTileInfo(tileInfo) {
        this.tileInfo.push(tileInfo);
    };


    getTileInfo() {
        return this.tileInfo;
    }
}

export default QuickSelectManager;