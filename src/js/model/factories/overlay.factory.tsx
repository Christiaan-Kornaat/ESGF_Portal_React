import React from "react";
import { Overlay } from "../../components/shared/overlay/overlay.component";

export default class OverlayFactory {
    /**
     *
    *@summary Creates overlay
    */
    createOverlay(background: JSX.Element, foreground: JSX.Element, onClick: any, index: any): JSX.Element {
        return <Overlay key={index}
            background={background}
            foreground={foreground}
            onClick={onClick}
        />
    }
}