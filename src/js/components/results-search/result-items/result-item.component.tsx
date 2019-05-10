import React, {Component} from "react";
import Collapsible from "react-collapsible";
import ArrowIcons from "../../shared/icons/arrow-icons.component";
import ResultIcons from "../../shared/icons/result-icons.component";
import EsgfCatalogItem from "../../../model/dto/esgf-catalog-item.dto";
import ESGFDataNodeResultDTO from "../../../model/dto/esgf-data-node-result.dto";

export default class ResultItem extends Component<{ labelModel: ESGFDataNodeResultDTO}> {
    private readonly _labelModel: ESGFDataNodeResultDTO;
    private _contentModel: EsgfCatalogItem;
    state: { isOpen: boolean };

    constructor(props) {
        super(props);

        this._labelModel = props.labelModel;


        this.state = {
            isOpen: true
        };

    }

    render() {
        let {state: {isOpen}} = this;

        // this._contentModel = props.contentModel; //TODO add resultcontentprovider

        //TODO move to somewhere else??
        let createTableRow = (dataset, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{dataset._name}</td>
                    <td>Size</td>
                    <td className="clickable">Download</td>
                    <td className="clickable">View</td>
                    <td className="clickable"><ResultIcons.Basket/></td>
                </tr>
            );
        };

        let Arrow = isOpen ? ArrowIcons.Down : ArrowIcons.Up;
        let toggleArrow = () => this.setState({isOpen: !this.state.isOpen});

        let {esgfid} = this._labelModel;

        return (
            <Collapsible lazyRender={true}
                         trigger={<div><Arrow/>{esgfid}</div>}
                         onOpening={toggleArrow}
                         onClosing={toggleArrow}>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Dataset</th>
                        <th scope="col">Size</th>
                        <th scope="col">Download</th>
                        <th scope="col">View</th>
                        <th scope="col">Basket</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*{json.dataset_list.map(createTableRow)}*/}
                    </tbody>
                </table>
            </Collapsible>
        );
    }
}