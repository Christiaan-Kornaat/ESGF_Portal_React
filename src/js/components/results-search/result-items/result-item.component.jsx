import React, {Component} from "react";
import Collapsible from "react-collapsible";
import ArrowIcons from "../../shared/icons/arrow-icons.component";
import ResultIcons from "../../shared/icons/result-icons.component";

export class ResultItem extends Component {
    constructor(props) {
        super(props);

        this.json = props.json;

        this.state = {
            arrowState: true
        };

    }

    render() {
        let {state: {arrowState}, json} = this;
        let {dataset_id, dataset_version} = json.properties;

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

        let Arrow = arrowState ? ArrowIcons.Down : ArrowIcons.Up;
        let toggleArrow = () => this.setState({arrowState: !this.state.arrowState});

        return (
            <Collapsible trigger={<div><Arrow/>{dataset_id + " V." + dataset_version}</div>}
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
                    {json.dataset_list.map(createTableRow)}
                    </tbody>
                </table>
            </Collapsible>
        );
    }
}