import React, { Component } from "react";
import Collapsible from 'react-collapsible';

export class ResultItem extends Component {
    constructor(props){
        super(props);

        this.title = props.title;

    }

    render() {
        //testcode
        let datasetsTest = ["cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v20130331", "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v20130331"]
        //TODO move to shared??
        let createTableRow = (dataset, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{dataset}</td>
                    <td>Download</td>
                    <td>View</td>
                    <td><i class="fas fa-cart-plus"></i></td>
                </tr>
            );
        };

        return (
            <Collapsible trigger={<div> <i className={true ? 'fas fa-angle-down' : 'fas fa-angle-up'}></i>{this.title}</div>}>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Dataset</th>
                            <th scope="col">Download</th>
                            <th scope="col">View</th>
                            <th scope="col">Add to cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datasetsTest.map(createTableRow)}
                    </tbody>
                </table>            
            </Collapsible>
        )
    }
}