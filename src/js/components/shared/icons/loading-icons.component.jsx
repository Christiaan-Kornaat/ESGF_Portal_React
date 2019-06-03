import React from "react";

const LoadingIcons = {};

function FontAwesomeIcon({classNames, onClick = null}) {
    return <div className={"loadIcon"}>
        <i className={classNames.join(" ")} onClick={onClick ? onClick : () => null}/>
    </div>;
}

function Icon({classNames, onClick = null}) {
    classNames.push("fas");
    return <FontAwesomeIcon classNames={classNames}
                            onClick={onClick}/>;
}

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