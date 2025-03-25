"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./panel.css";

// la partie deplacement des elements a été fait avec v0
export default function Panel() {
    const [folders, setFolders] = useState<string[]>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [elementPositions, setElementPositions] = useState<{
        [key: string]: { top: string; left: string };
    }>({});
    const navElementsRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const originalPositionsRef = useRef<{ x: number; y: number }[]>([]);
    const animationRef = useRef<number | null>(null);
    const positionsGeneratedRef = useRef(false);

    useEffect(() => {
        fetch("/api/get-projects")
            .then((res) => res.json())
            .then((data) => {
                setFolders(data);

                if (!positionsGeneratedRef.current) {
                    const positions: {
                        [key: string]: { top: string; left: string };
                    } = {};
                    data.forEach((folder: string) => {
                        positions[folder] = {
                            top: `${Math.random() * 100}vh`,
                            left: `${Math.random() * 100}vw`,
                        };
                    });
                    setElementPositions(positions);
                    positionsGeneratedRef.current = true;
                }
            })
            .catch(() => setFolders([]));
    }, []);

    useEffect(() => {
        if (folders.length > 0 && navElementsRef.current.length > 0) {
            const timer = setTimeout(() => {
                originalPositionsRef.current = navElementsRef.current.map(
                    (el) => {
                        if (!el) return { x: 0, y: 0 };
                        const rect = el.getBoundingClientRect();
                        return {
                            x: rect.left + rect.width / 2,
                            y: rect.top + rect.height / 2,
                        };
                    }
                );
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [folders, elementPositions]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    useEffect(() => {
        if (folders.length === 0 || originalPositionsRef.current.length === 0)
            return;

        const animate = () => {
            let closestIndex = -1;
            let closestDistance = Number.POSITIVE_INFINITY;

            navElementsRef.current.forEach((el, index) => {
                if (!el) return;

                const originalX = originalPositionsRef.current[index].x;
                const originalY = originalPositionsRef.current[index].y;

                const distance = Math.sqrt(
                    Math.pow(mousePosition.x - originalX, 2) +
                        Math.pow(mousePosition.y - originalY, 2)
                );

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }

                el.style.transform = "translate(0, 0)";
            });

            // DISTANCE 300PX
            const threshold = 300;
            if (closestIndex !== -1 && closestDistance <= threshold) {
                const el = navElementsRef.current[closestIndex];
                if (!el) return;

                const originalX = originalPositionsRef.current[closestIndex].x;
                const originalY = originalPositionsRef.current[closestIndex].y;

                const dirX = mousePosition.x - originalX;
                const dirY = mousePosition.y - originalY;

                const distanceFactor = 1 - closestDistance / threshold;

                const easedFactor = Math.pow(distanceFactor, 3);

                // SPEED 1.7
                const moveX = dirX * easedFactor * 1.7;
                const moveY = dirY * easedFactor * 1.7;

                el.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [folders, mousePosition]);

    return (
        <>
            {folders.map((folder, index) => (
                <Link
                    href={`/panel/${folder}`}
                    key={folder}
                    className="nav-element"
                    ref={(el) => {
                        navElementsRef.current[index] = el;
                    }}
                    style={{
                        position: "absolute",
                        top: elementPositions[folder]?.top || "0vh",
                        left: elementPositions[folder]?.left || "0vw",
                        transition:
                            "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                >
                    {folder}
                </Link>
            ))}
        </>
    );
}
