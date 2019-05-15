import React, {Component} from "react";
import Collapsible from "react-collapsible";
import ArrowIcons from "../../shared/icons/arrow-icons.component";
import ResultIcons from "../../shared/icons/result-icons.component";
import EsgfCatalogItem from "../../../model/dto/esgf-catalog-item.dto";
import ESGFDataNodeResultDTO from "../../../model/dto/esgf-data-node-result.dto";

export default class ResultItem extends Component<{ labelModel: ESGFDataNodeResultDTO }> {
    private _contentModel: EsgfCatalogItem;
    state: { isOpen: boolean, labelModel: ESGFDataNodeResultDTO };

    constructor(props) {
        super(props);


        this.state = {
            isOpen: true,
            labelModel: props.labelModel
        };

    }

    setArrowIsOpen(isOpen: boolean) {
        this.setState({isOpen: isOpen});
    }

    componentWillReceiveProps({labelModel}): void {
        this.setState({labelModel: labelModel});
    }

    render() {
        let {state: {isOpen, labelModel}} = this;

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

        let openArrow = () => this.setArrowIsOpen(true);
        let closeArrow = () => this.setArrowIsOpen(false);

        let {esgfid} = labelModel;

        return (
            <Collapsible lazyRender={true}
                         trigger={<div><Arrow/>{esgfid}</div>}
                         onOpening={openArrow}
                         onClosing={closeArrow}>
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