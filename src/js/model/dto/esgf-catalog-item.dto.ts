import {trimChars} from "../../util/string.util";

export interface CatalogItemMetadata {
    dataType: string;
    dataFormat: string;
    inherited: boolean;
}

export interface CatalogItemProperties {
    dataset_id: string;
    dataset_version: string;
    dataset_id_template: string;
    directory_format_template: string;
    project: string;
    experiment: string;
    product: string; //NOTE Maybe make a CatalogItemPropertyProductType?
    model: string;
    time_frequency: string; //NOTE maybe make a CatalogItemPropertyTimeFrequencyType
    realm: string;
    cmor_table: string;
    ensemble: string;
    institute: string;
    forcing: string;
    title: string;
    creation_time: Date; //NOTE maybe ESGFDate? or a factory that creates this
    format: string;
    drs_id: string;
}


export interface CatalogItemVariable {
    name: string;
    vocabulary_name: string;
    units: string[];
    text: string;
}

//TODO find a better name for this
export interface CatalogItemVariableContainer {
    variables: CatalogItemVariable[];
    vocabulary: string
}

export interface CatalogItemDataSize {
    units: string;
    amount: number;
}

export interface CatalogItemDatasetProperties {
    file_id: string;
    file_version: number;
    size: number;
    tracking_id: string;
    mod_time: Date;

    checksum: string;
    checksum_type: string;
}

export interface CatalogItemDataset {
    serviceName: string;
    dataSize: CatalogItemDataSize;
    properties: CatalogItemDatasetProperties;
    variables: CatalogItemVariableContainer;

    name: string;
    id: string;
    urlPath: string; //TODO change to URL?
    restrictAccess: string;
}

export default class EsgfCatalogItem {
    get metadata(): CatalogItemMetadata { return this._metadata; }

    get properties(): CatalogItemProperties { return this._properties; }

    get variables(): CatalogItemVariableContainer { return this._variables; }

    get datasets(): CatalogItemDataset[] { return this._datasets; }

    private readonly _metadata: CatalogItemMetadata;
    private readonly _properties: CatalogItemProperties;
    private readonly _variables: CatalogItemVariableContainer;
    private readonly _datasets: CatalogItemDataset[];

    constructor(metadata: CatalogItemMetadata, properties: CatalogItemProperties, variables: CatalogItemVariableContainer, datasets: CatalogItemDataset[]) {
        this._metadata = metadata;
        this._properties = properties;
        this._variables = variables;
        this._datasets = datasets;
    }

    private static parseMetadata(json): CatalogItemMetadata {
        return {
            dataType: json.dataType,
            dataFormat: json.dataFormat,
            inherited: (json._inherited.toLowerCase() == "true")
        };
    }

    private static parseCatalogVariable({_name, _vocabulary_name, _units, __text}): CatalogItemVariable {
        return {
            name: _name,
            vocabulary_name: _vocabulary_name,
            text: __text,
            units: _units.split(" ")
        };
    };

    private static parseVariables(json): CatalogItemVariableContainer {
        return {
            vocabulary: json._vocabulary,
            variables: json.variable.map(this.parseCatalogVariable)
        };
    }

    private static parseProperties(json): CatalogItemProperties {

        let toEsgfDate: (string) => Date = (dateString: string) => {
            let [date, time] = dateString.split(" ");
            let [year, month, day] = date.split("-");
            let [hour, minute, second] = time.split(":");

            return new Date(+year, +month, +day, +hour, +minute, +second);
        };

        let addProperty = (object, propertyKey) => {
            let value: any = json[propertyKey];

            switch (propertyKey) {
                case "creation_time":
                    value = toEsgfDate(value);
                    break;
                default:
                    value = trimChars(value, "_");
            }

            return object[propertyKey] = value;
        };
        return <CatalogItemProperties>Object.keys(json).reduce(addProperty, {});
    }

    private static parseDatasetList(json): CatalogItemDataset[] {

        let toDataSize: ({_units, __text}) => CatalogItemDataSize = ({_units, __text}) => ({
            units: _units,
            amount: +__text
        });

        let toProperties: (any) => CatalogItemDatasetProperties = (object) => <CatalogItemDatasetProperties>object;

        let toVariables: (any) => CatalogItemVariableContainer = ({variable, _vocabulary}) => ({
            variables: [this.parseCatalogVariable(variable)],
            vocabulary: _vocabulary
        });

        let toDataset: (any) => CatalogItemDataset = (({serviceName, dataSize, dataset_properties, variables, _name, _ID, urlPath, _restrictAccess}) => ({
            serviceName: serviceName,
            dataSize: toDataSize(dataSize),
            properties: toProperties(dataset_properties),
            variables: toVariables(variables),

            name: _name,
            id: _ID,
            urlPath: urlPath,
            restrictAccess: _restrictAccess
        }));


        return json.map(toDataset);
    }

    public static parse(json): EsgfCatalogItem {
        let {metadata: json_metadata, properties: json_properties, variables: json_variables, dataset_list: json_dataset_list} = json;

        let metadata = this.parseMetadata(json_metadata);

        let properties = this.parseProperties(json_properties);

        let variables = this.parseVariables(json_variables);

        let dataset_list = this.parseDatasetList(json_dataset_list);

        return new EsgfCatalogItem(metadata, properties, variables, dataset_list);
    }
}

const json = {
    "dataset_list": [
        {
            "serviceName": "gridded",
            "dataset_properties":
                {
                    "aggregation_id": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
                    "time_length": "600",
                    "calendar": "365_day"
                },
            "variables": {
                "variable": {
                    "_name": "pr",
                    "_vocabulary_name": "rainfall_flux",
                    "_units": "kg m-2 s-1",
                    "__text": "Surface Rainfall Rate into the Sea Ice Portion of the Grid Cell"
                },
                "_vocabulary": "CF-1.0"
            },
            "metadata": {
                "geospatialCoverage": {
                    "northsouth": {
                        "start": "-87.863801",
                        "size": "175.727602",
                        "units": "degrees_north"
                    },
                    "eastwest": {
                        "start": "0.0",
                        "size": "357.1875",
                        "units": "degrees_east"
                    },
                    "_zpositive": "up"
                },
                "timeCoverage": {
                    "start": "1850-01-16T12:00:00",
                    "end": "1899-12-16T12:00:00"
                },
                "_inherited": "true"
            },
            "_name": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
            "_ID": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
            "_urlPath": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.pr.20130331.aggregation",
            "_restrictAccess": "esg-user"
        }
    ]
};