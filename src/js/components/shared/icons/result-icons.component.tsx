import * as React from "react";

namespace ResultIcons {

    export function Basket({className = ""}) {
        return <i className={"fas fa-shopping-basket" + className}/>;
    }

    export function Download({className = ""}) {
        return <i className={"fas fa-file-download " + className}/>;
    }
}
export default ResultIcons;