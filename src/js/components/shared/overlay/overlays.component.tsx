import * as React from "react";

namespace Overlays {

    export namespace QFTiles { 
        export function PencilIcon() { 
            return <div className="h-100"><i className="fa fa-pencil-alt overlayIcon" aria-hidden="true"/></div>;
        }
        export function PlusIcon() { 
            return <div className="h-100"><i className="fa fa-plus overlayIcon" aria-hidden="true"/></div>;
        }
    }
}

export default Overlays;