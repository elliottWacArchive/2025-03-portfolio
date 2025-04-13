import React from "react";
import "@/style/kabbale.css";
const kabnav = () => {
    return (
        <div className="kabnav">
            <div className="node">
                <a href="/whoami">who am i</a>
            </div>
            <div className="node">
                <a href="/panel">Panel</a>
            </div>
            <div className="node">
                <a href="/contact">Contact</a>
            </div>
            <div className="node">
                <a href="/mailme">Mail Me</a>
            </div>
            <div className="node">
                <a href="/miku">Miku</a>
            </div>
            <div className="node">
                <a href="/connected">Connected</a>
            </div>
        </div>
    );
};

export default kabnav;
