"use client";

import React, { useEffect, useState } from "react";
import "./style.css";

const Page = () => {
    const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
    const [hovered, setHovered] = useState<boolean[]>(Array(10).fill(false));
    const [alerted, setAlerted] = useState(true);

    useEffect(() => {
        const newPositions = Array.from({ length: 10 }).map((_, index) => {
            const angle = (index / 10) * 2 * Math.PI;
            const x = 50 + 100 * Math.cos(angle);
            const y = 50 + 100 * Math.sin(angle);
            return { x, y };
        });
        setPositions(newPositions);
    }, []);

    const playAudio = () => {
        const audio = new Audio("/audio/miku-miku.mp3");
        audio.play();
    };

    return (
        <div>
            <img
                id="mikuPowered"
                src="/image/powered-by-miku.png"
                alt=""
                onClick={() => {
                    setAlerted(false);
                    console.log(alerted);
                }}
            />
            <img id="miku" src="/image/miku.gif" alt="" />
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "200px",
                    height: "200px",
                }}
            >
                {positions.map((pos, index) => (
                    <div
                        key={index}
                        style={{
                            position: "absolute",
                            width: "30px",
                            height: "30px",
                            backgroundImage: "url('/image/light-off.png')",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            top: `calc(50% + ${pos.y}px)`,
                            left: `calc(50% + ${pos.x}px)`,
                            transform: "translate(-50%, -50%)",
                        }}
                        onMouseEnter={(e) => {
                            if (alerted) return;
                            if (!alerted) {
                                (
                                    e.currentTarget as HTMLDivElement
                                ).style.backgroundImage =
                                    "url('/image/light-on.gif')";
                            }
                            setHovered((prev) => {
                                const newHovered = [...prev];
                                newHovered[index] = true;
                                if (newHovered.every((hovered) => hovered)) {
                                    playAudio();
                                    setAlerted(true);
                                    const mikuElement =
                                        document.getElementById("miku");
                                    if (mikuElement) {
                                        mikuElement.style.left = "100%";
                                    }
                                }
                                return newHovered;
                            });
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Page;
