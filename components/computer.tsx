"use client";

import React, { useState } from "react";
import "@/style/computer.css";

const Computer: React.FC = () => {
    const [gifIndex, setGifIndex] = useState(1);

    const handleClick = () => {
        setGifIndex((prevIndex) => (prevIndex % 5) + 1);
    };

    return (
        <div id="computer" className="computer-container" onClick={handleClick}>
            <img className="skin" src="/image/computer.png" alt="" />
            <img
                src={`/image/computer/${gifIndex}.gif`}
                className="screen"
                alt="computer screen"
            />
        </div>
    );
};

export default Computer;
