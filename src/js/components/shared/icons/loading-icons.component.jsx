import React from "react";

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
    
export default LoadingIcons;