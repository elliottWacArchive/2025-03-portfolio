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
    // Référence pour les dimensions des éléments
    const elementSizesRef = useRef<{ width: number; height: number }[]>([]);

    useEffect(() => {
        fetch("/api/get-projects")
            .then((res) => res.json())
            .then((data) => {
                setFolders(data);

                if (!positionsGeneratedRef.current) {
                    // On attendra de positionner les éléments après leur rendu initial
                    setTimeout(() => {
                        positionElementsWithinViewport(data);
                    }, 10);
                }
            })
            .catch(() => setFolders([]));
    }, []);

    // Fonction pour positionner les éléments dans la viewport
    const positionElementsWithinViewport = (data: string[]) => {
        // Dimensions de la fenêtre
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Marge de sécurité (en pixels)
        const margin = 20;

        const positions: { [key: string]: { top: string; left: string } } = {};

        data.forEach((folder: string, index: number) => {
            // Attendre que les éléments soient rendus pour obtenir leurs dimensions
            const element = navElementsRef.current[index];
            if (element) {
                const rect = element.getBoundingClientRect();
                const elementWidth = rect.width;
                const elementHeight = rect.height;

                // Stockage des dimensions pour une utilisation ultérieure
                elementSizesRef.current[index] = {
                    width: elementWidth,
                    height: elementHeight,
                };

                // Calculer des positions aléatoires mais à l'intérieur de la viewport
                const maxLeft = windowWidth - elementWidth - margin;
                const maxTop = windowHeight - elementHeight - margin;

                positions[folder] = {
                    top: `${Math.max(margin, Math.random() * maxTop)}px`,
                    left: `${Math.max(margin, Math.random() * maxLeft)}px`,
                };
            }
        });

        setElementPositions(positions);
        positionsGeneratedRef.current = true;
    };

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

    // Ajoutons un effet pour gérer le redimensionnement de la fenêtre
    useEffect(() => {
        const handleResize = () => {
            // Repositionner tous les éléments dans la viewport lors du redimensionnement
            if (folders.length > 0) {
                positionElementsWithinViewport(folders);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [folders]);

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
                const elementSize = elementSizesRef.current[closestIndex] || {
                    width: 0,
                    height: 0,
                };

                const dirX = mousePosition.x - originalX;
                const dirY = mousePosition.y - originalY;

                const distanceFactor = 1 - closestDistance / threshold;
                const easedFactor = Math.pow(distanceFactor, 3);

                // SPEED 1.7
                let moveX = dirX * easedFactor * 1.7;
                let moveY = dirY * easedFactor * 1.7;

                // Contraindre le mouvement pour rester dans la viewport
                const rect = el.getBoundingClientRect();
                const margin = 10; // Marge de sécurité

                // Limiter le déplacement à gauche
                if (originalX + moveX - elementSize.width / 2 < margin) {
                    moveX = margin + elementSize.width / 2 - originalX;
                }
                // Limiter le déplacement à droite
                if (
                    originalX + moveX + elementSize.width / 2 >
                    window.innerWidth - margin
                ) {
                    moveX =
                        window.innerWidth -
                        margin -
                        elementSize.width / 2 -
                        originalX;
                }
                // Limiter le déplacement en haut
                if (originalY + moveY - elementSize.height / 2 < margin) {
                    moveY = margin + elementSize.height / 2 - originalY;
                }
                // Limiter le déplacement en bas
                if (
                    originalY + moveY + elementSize.height / 2 >
                    window.innerHeight - margin
                ) {
                    moveY =
                        window.innerHeight -
                        margin -
                        elementSize.height / 2 -
                        originalY;
                }

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
                        top: elementPositions[folder]?.top || "0px",
                        left: elementPositions[folder]?.left || "0px",
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
