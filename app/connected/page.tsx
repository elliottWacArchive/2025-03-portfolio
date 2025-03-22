"use client";
import "./connected.css";
import Computer from "@/components/computer";
import React, { useEffect, useState, JSX } from "react";

export default function Connected() {
    const [lains, setLains] = useState<JSX.Element[]>([]);

    useEffect(() => {
        // audio
        const audio = new Audio("/audio/connected.mp3");
        const connected = document.getElementById("connected");
        const playAudio = () => {
            audio.play();
            if (connected) {
                connected.removeEventListener("click", playAudio);
            }
        };
        if (connected) {
            connected.addEventListener("click", playAudio);
        }

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
            clearInterval(computerInterval);
        };
    }, []);

    return (
        <>
            {lains}
            <div id="title">
                If Donnie has had access to the Internet, nothing makes him any
                less concerned by the rules that govern this 'digital' world.
                <div id="connected">Everyone is Always Connected.</div>
                To accept this is to accept reality.
            </div>
            <Computer />
        </>
    );
}
