import React from "react";

const ArbreDeVie = () => {
    return (
        <div className="tree-container">
            <div className="node root">Kether</div>
            <div className="row">
                <div className="node">Chokhmah</div>
                <div className="node">Binah</div>
            </div>
            <div className="row">
                <div className="node">Chesed</div>
                <div className="node">Gevurah</div>
            </div>
            <div className="row">
                <div className="node">Tiphereth</div>
            </div>
            <div className="row">
                <div className="node">Netzach</div>
                <div className="node">Hod</div>
            </div>
            <div className="row">
                <div className="node">Yesod</div>
            </div>
            <div className="node root">Malkuth</div>
        </div>
    );
};

export default ArbreDeVie;
