"use client";
import "./connected.css";
import Computer from "@/components/computer";
import React, { useEffect, useState, JSX } from "react";

export default function Connected() {
    const [lains, setLains] = useState<JSX.Element[]>([]);

    useEffect(() => {
        // audio
        const audio = new Audio("/audio/connected.mp3");
        const playAudio = () => {
            audio.play();
            document.removeEventListener("click", playAudio);
        };
        document.addEventListener("click", playAudio);

        // title distortion
        const titleElement = document.getElementById("title");
        const distortTitle = () => {
            if (titleElement) {
                const skewX = Math.random() * 120 - 60;
                const skewY = Math.random() * 120 - 60;
                const scale = Math.random() * 0.5 + 0.5;
                titleElement.style.transform = `skew(${skewX}deg, ${skewY}deg) scale(${scale})`;
            }
        };
        const distortionInterval = setInterval(distortTitle, 500);

        // lain text
        const interval = setInterval(() => {
            setLains((prevLains) => {
                if (prevLains.length >= 100) {
                    return prevLains.slice(1);
                }
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                const newLain = (
                    <div
                        key={`${prevLains.length}-${Date.now()}`}
                        className="lain"
                        style={{
                            position: "absolute",
                            left: x,
                            top: y,
                            filter: `blur(${Math.random() * 2}px)`,
                        }}
                    >
                        lain
                    </div>
                );
                return [...prevLains, newLain];
            });
        }, 300);

        // computer movement
        const computerElement = document.getElementById("computer");
        let dx = 2;
        let dy = 2;
        const moveComputer = () => {
            if (computerElement) {
                const rect = computerElement.getBoundingClientRect();
                if (rect.right >= window.innerWidth || rect.left <= 0) {
                    dx = -dx;
                }
                if (rect.bottom >= window.innerHeight || rect.top <= 0) {
                    dy = -dy;
                }
                computerElement.style.left = `${rect.left + dx}px`;
                computerElement.style.top = `${rect.top + dy}px`;
            }
        };
        const computerInterval = setInterval(moveComputer, 15);

        return () => {
            clearInterval(interval);
            clearInterval(distortionInterval);
            clearInterval(computerInterval);
        };
    }, []);

    return (
        <>
            {lains}
            <div id="title">
                Everyone
                <br />
                Is
                <br />
                Always <br />
                Connnected.
            </div>
            <Computer />
        </>
    );
}
