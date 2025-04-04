import React from "react";
import "@/style/kabbale.css";
const kabnav = () => {
    return (
        <div className="kabnav">
            <div className="node">
                <a href="/connected">Connected</a>
            </div>
            <div className="node">
                <a href="/panel">Panel</a>
            </div>
            <div className="node">
                <a href="/contact">Contact</a>
            </div>
            <div className="node">
                <a href="/information">Information</a>
            </div>
            <div className="node">
                <a href="/miku">Miku</a>
            </div>
            <div className="node">Tiphareth</div>
            <div className="node">Netzach</div>
            <div className="node">Hod</div>
            <div className="node">Yesod</div>
            <div className="node">Malkhut</div>
        </div>
    );
};

export default kabnav;
