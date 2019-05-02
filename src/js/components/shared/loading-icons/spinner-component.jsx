import React, {Component} from "react";

class Spinner extends Component {


    render() {
        return (
            <div className="loadIcon">
                <div className="spinnerIcon" role="status">
                    <span className="text">Loading...</span>
                </div>
            </div>
        );
    }
}

export default Spinner;