import * as React from "react";

export type IconProps = { classNames: string[], onClick?: () => void };

export function FontAwesomeIcon({classNames, onClick = ()=>{}}: IconProps) {
    classNames.push("fas");
    return <Icon classNames={classNames}
                 onClick={onClick}/>;
}

export function Icon({classNames, onClick = ()=>{}}: IconProps) {
    if (onClick) classNames.push("cursor-pointer");
    return <div className={"loadIcon"}>
        <i className={classNames.join(" ")}
           onClick={onClick ? onClick : () => {}}/>
    </div>;
}