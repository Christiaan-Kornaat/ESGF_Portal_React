class ESGFDataNodeResultDTO {
    public readonly id: string;
    public readonly esgfid: string;

    public readonly data_node: string;
    public readonly url: string;

    constructor(id, esgfid, data_node, url) {
        this.id = id;
        this.esgfid = esgfid;

        this.data_node = data_node;
        this.url = url;
    }
}

export default ESGFDataNodeResultDTO;