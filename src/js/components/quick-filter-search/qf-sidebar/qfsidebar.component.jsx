import React from "react";
import Sidebar from "react-sidebar";

export class QFSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    render() {
        return (
            <Sidebar
                sidebar={<b>presets hier</b>} 
                open={this.state.sidebarOpen}
                defaultSidebarWidth={200}
                sidebarClassName={"qf-sidebar"}
                overlayClassName={"qf-overlay"}
                rootClassName={"qf-root"}
                contentClassName={"qf-sidebar-content"}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { background: "white", position:"relative" },root: { position:"fixed"} }}
            >
                <div className="qf-open-presets" onClick={() => this.onSetSidebarOpen(true)}>
                    Open presets
                </div>
            </Sidebar>
        );
    }
}

