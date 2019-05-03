import React, { Component } from "react";
import { ResultItem } from "../result-items/result-item.component";

export class ResultWrapper extends Component {

    render() {
        return (
            <div className="result-wrapper">
                <div className="result-header">
                    Results
                </div>
                <ResultItem title="cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v201303432331"/>
                <ResultItem title="cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v201303432333" />
                <ResultItem title="cmip5.output.CCCma.CanESM2.sstClimSulfate.mon.seaIce.r1i1p1.v201303432334" />


            </div>
        )
    }
}