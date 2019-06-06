import * as React from "react";

export type IconProps = { classNames: string[], onClick?: () => void };

export function FontAwesomeIcon({classNames, onClick = null}: IconProps) {
    classNames.push("fas");
    return <div className={"loadIcon"}>
        <i className={classNames.join(" ")}
           onClick={onClick ? onClick : () => null}/>
    </div>;
}

export function Icon({classNames, onClick = null}: IconProps) {
    if (onClick) classNames.push("cursor-pointer");
    return <FontAwesomeIcon classNames={classNames}
                            onClick={onClick}/>;
}