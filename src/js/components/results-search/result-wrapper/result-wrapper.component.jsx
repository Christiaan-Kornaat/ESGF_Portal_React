import React, { Component } from "react";
import { ResultItem } from "../result-items/result-item.component";

export class ResultWrapper extends Component {
    
    render() {

        //testdata
        let json = {
            "datasets": [
                { "dataset": ["cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v20130331", "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v20130331"], "title": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v201303432331" },
                { "dataset": ["cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v20130331", "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v20130331"], "title": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v201303432331" },
                { "dataset": ["cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v20130331", "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v20130331"], "title": "cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v201303432331" },
            ]
        }
        
        let createTableRow = (json, index) => {
            return (
                <ResultItem key={index} 
                            title={json.title} 
                            dataArray={json.dataset} />
            );
        };

        return (
            <div className="result-wrapper">
                <div className="result-header">
                    Results
                </div>
                {json.datasets.map(createTableRow)}
            </div>
        )
    }
}
