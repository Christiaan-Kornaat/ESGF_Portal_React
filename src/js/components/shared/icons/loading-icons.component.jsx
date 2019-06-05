import React from "react";
import {Icon} from "./icons.component";

const LoadingIcons = {};


LoadingIcons.Spinner = () =>
    <div className="loadIcon">
        <div className="spinnerIcon" role="status">
            <span className="text">Loading...</span>
        </div>
    </div>;

LoadingIcons.SpinnerInline = () =>
    <div className="spinnerInline" role="status">
        <span className="text">Loading...</span>
    </div>;

LoadingIcons.Error = ({className = "", onClick = null}) => <Icon classNames={["fa-exclamation-triangle", className]}
                                                                 onClick={onClick}/>;

LoadingIcons.NoConnection = ({className = "", onClick = null}) => <Icon classNames={["fa-wifi", className]}
                                                                        onClick={onClick}/>;

export default LoadingIcons;