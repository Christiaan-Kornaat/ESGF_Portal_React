import React, { Component } from "react";
import Collapsible from 'react-collapsible';

export class ResultItem extends Component {
    constructor(props){
        super(props);

        this.json = props.json;

        this.state = {
            arrowState: true
        }

    }

    render() {
        let { state: {arrowState}, json } = this;

        //TODO move to somewhere else??
        let createTableRow = (dataset, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{dataset._name}</td>
                    <td>Size</td>
                    <td className="clickable">Download</td>
                    <td className="clickable">View</td>
                    <td className="clickable"><i className="fas fa-shopping-basket"></i></td>
                </tr>
            );
        };

        return (
            <Collapsible trigger={<div> <i className={(arrowState ? 'fas fa-angle-down' : 'fas fa-angle-up')}></i>{json.properties.dataset_id + " V." + json.properties.dataset_version}</div>} onOpening={ () => this.setState( { arrowState: !this.state.arrowState } )} onClosing={ () => this.setState( { arrowState: !this.state.arrowState } )} >
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
        )
    }
}