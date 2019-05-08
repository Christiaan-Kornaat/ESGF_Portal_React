import React from "react";

const LoadingIcons = {};

LoadingIcons.Spinner = () =>
    <div className="loadIcon">
        <div className="spinnerIcon" role="status">
            <span className="text">Loading...</span>
        </div>
    </div>;
    
export default LoadingIcons;