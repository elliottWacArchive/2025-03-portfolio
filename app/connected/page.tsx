"use client";
import "./connected.css";
import Computer from "@/components/computer";
import React, { useEffect, useState, JSX } from "react";

export default function Connected() {
    const [lains, setLains] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setLains((prevLains) => {
                if (prevLains.length >= 50) {
                    return [];
                }
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                const newLain = (
                    <div
                        key={prevLains.length}
                        className="lain"
                        style={{ position: "absolute", left: x, top: y }}
                    >
                        lain
                    </div>
                );
                return [...prevLains, newLain];
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {lains}
            <h1 id="title">Everyone Is Connnected.</h1>
            <Computer />
        </>
    );
}
