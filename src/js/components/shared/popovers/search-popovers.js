import PropTypes from "prop-types";
import React from "react";

const Popovers = {};

/**
 *
 * @param {React.Component[]} sortButtons
 * @param {React.Component[]} actionButtons
 * @param {boolean }show
 * @return {React.Component}
 * @constructor
 */
Popovers.SearchOptions = ({sortButtons = [], actionButtons = [], show}) => {

    return <div className={"dropdown-menu dropdown-menu-right " + (show ? "show" : "")}
                aria-labelledby="dropdownMenuLink">
        {sortButtons}
        {actionButtons}
    </div>;
};

Popovers.SearchOptions.propTypes = {
    sortButtons: PropTypes.array,
    actionButtons: PropTypes.array,
    show: PropTypes.bool
};

export default Popovers;