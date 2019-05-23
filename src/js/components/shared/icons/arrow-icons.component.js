import React from "react";

const ArrowIcons = {};

ArrowIcons.Up = () => <i className={"sortingArrow fas fa-angle-up"}/>;
ArrowIcons.Down = () => <i className={"sortingArrow fas fa-angle-down"}/>;

ArrowIcons.Trash = ({onClick}) => <i onClick={onClick} className={"fas fa-trash"}/>

export default ArrowIcons;