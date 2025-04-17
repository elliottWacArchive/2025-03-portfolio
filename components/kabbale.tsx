import React from "react";
import "@/style/kabbale.css";
const kabnav = () => {
    return (
        <div className="center">
            <div className="kabnav">
                <div className="node">
                    <a href="/whoami">Who Am I</a>
                </div>
                <div className="line">
                    <div className="inlinenode">
                        <a href="/panel">Panel</a>
                    </div>
                    <div className="inlinenode">
                        <a href="/contact">Contact</a>
                    </div>
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
        </div>
    );
};

export default kabnav;
