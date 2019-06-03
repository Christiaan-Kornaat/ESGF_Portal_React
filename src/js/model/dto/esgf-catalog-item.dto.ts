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
    name: string;
    dataSize: CatalogItemDataSize;
    variables: CatalogItemVariableContainer;
    url?: string; //TODO change to URL?

    id?: string;
    properties?: CatalogItemDatasetProperties;
    serviceName?: string;
    restrictAccess?: string;
}

export default class EsgfCatalogItem {
    // get metadata(): CatalogItemMetadata { return this._metadata; }

    // get properties(): CatalogItemProperties { return this._properties; }

    // get variables(): CatalogItemVariableContainer { return this._variables; }

    get datasets(): CatalogItemDataset[] { return this._datasets; }

    private readonly _metadata: CatalogItemMetadata;
    private readonly _properties: CatalogItemProperties;
    private readonly _variables: CatalogItemVariableContainer;
    private readonly _datasets: CatalogItemDataset[];

    constructor(datasets: CatalogItemDataset[]) {
        // this._metadata = metadata;
        // this._properties = properties;
        // this._variables = variables;
        this._datasets = datasets;
    }

    private static parseDatasets(json: any[]): CatalogItemDataset[] {

        let isUrl = item => typeof item == "string"
            && ((<string>item).startsWith("http://") || (<string>item).startsWith("https://"));

        let findUrls = (object) => {
            let values = Object.values(object);

            return values.filter(isUrl)
                         .map(item => <string>item);
        };

        return json.filter(({dataSize}) => dataSize != undefined)
                   .map(({dataSize, text, variables, ...otherVars}) => {

                       let dataset: CatalogItemDataset = ({name: text, dataSize: dataSize, variables: variables});

                       let urls = findUrls(otherVars);
                       dataset.url = (urls.length > 0) ? urls[0] : undefined;

                       return dataset;
                   });
    }

    public static parse(json): EsgfCatalogItem {
        let {/*metadata: json_metadata, properties: json_properties, variables: json_variables,*/ files: json_dataset_list} = json;

        let dataset_list = this.parseDatasets(json_dataset_list);

        return new EsgfCatalogItem(dataset_list);
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