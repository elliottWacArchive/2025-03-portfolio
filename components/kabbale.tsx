import React from "react";
import "@/style/kabbale.css";
const kabnav = () => {
    return (
        <div className="kabnav">
            <div className="node">
                <a href="/connected">Connected</a>
            </div>
            <div className="node">Chokhmah</div>
            <div className="node">Binah</div>
            <div className="node">Chesed</div>
            <div className="node">Geburah</div>
            <div className="node">Tiphareth</div>
            <div className="node">Netzach</div>
            <div className="node">Hod</div>
            <div className="node">Yesod</div>
            <div className="node">Malkhut</div>
        </div>
    );
};

export default kabnav;
