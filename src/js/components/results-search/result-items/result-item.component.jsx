import React, { Component } from "react";
import Collapsible from 'react-collapsible';

export class ResultItem extends Component {
    constructor(props){
        super(props);

        this.title = props.title;
        this.dataset = props.dataArray;

        this.state ={
            arrowState: true
        }

    }

    render() {
        //TODO move to somewhere else??
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
            <Collapsible trigger={<div> <i className={this.state.arrowState ? 'fas fa-angle-down' : 'fas fa-angle-up'}></i>{this.title}</div>} onClick={this.state.arrowState = !this.state.arrowState}>
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
                        {this.dataset.map(createTableRow)}
                    </tbody>
                </table>            
            </Collapsible>
        )
    }
}