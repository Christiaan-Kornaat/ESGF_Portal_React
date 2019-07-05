import React from "react";

const ArrowIcons = {};

/**
 * @param {string} className
 * @return {*}
 */
function createArrowIcon(className) {
    return <i className={[className, "fas", "sortingArrow"].join(" ")}/>;
}

ArrowIcons.Up = ({className = ""}) => createArrowIcon(className + " fa-angle-up");
ArrowIcons.Down = ({className = ""}) => createArrowIcon(className + " fa-angle-down");
ArrowIcons.Left = ({className = ""}) => createArrowIcon(className + " fa-angle-left");
ArrowIcons.Right = ({className = ""}) => createArrowIcon(className + " fa-angle-right");

ArrowIcons.Trash = ({onClick}) => <i onClick={onClick} className={"fas fa-trash"}/>;

export default ArrowIcons;