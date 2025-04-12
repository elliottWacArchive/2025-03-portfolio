"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./style.css";
import Card from "@/components/card";

const whoami: React.FC = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [dialogueIndex, setDialogueIndex] = useState(-1); // -1 pour le premier message
    const dialogues = [
        [
            "donnie:",
            "La créativité est mon essence même. Je ne peux m’empêcher de créer, de découvrir et de dépeindre mes pensées sous n’importe quelle forme. J’adore Internet tout simplement parce que c’est l’outil de création absolu.",
        ],
        ["elliott:", "bonjour"],
        ["donnie:", "cv"],
    ];

    useEffect(() => {
        const card = cardRef.current;
        const wrapper = wrapperRef.current;

        if (!card || !wrapper) return;

        let bounds: DOMRect;

        function calculateBounds(): void {
            if (wrapper) {
                bounds = wrapper.getBoundingClientRect();
            }
        }

        function handleMouseMove(e: MouseEvent): void {
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;

            const rotateY = (mouseX / bounds.width - 0.5) * 50;
            const rotateX = (mouseY / bounds.height - 0.5) * -50;

            gsap.to(card, {
                rotationY: rotateY,
                rotationX: rotateX,
                transformPerspective: 1000,
                duration: 0.2,
                ease: "power2.out",
            });
        }

        function handleMouseLeave(): void {
            gsap.to(card, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5,
                ease: "power3.out",
            });
        }

        calculateBounds();
        window.addEventListener("resize", calculateBounds);
        wrapper.addEventListener("mousemove", handleMouseMove as EventListener);
        wrapper.addEventListener(
            "mouseleave",
            handleMouseLeave as EventListener
        );

        return () => {
            window.removeEventListener("resize", calculateBounds);
            wrapper.removeEventListener(
                "mousemove",
                handleMouseMove as EventListener
            );
            wrapper.removeEventListener(
                "mouseleave",
                handleMouseLeave as EventListener
            );
        };
    }, []);

    const handleCardClick = () => {
        setDialogueIndex((prevIndex) =>
            prevIndex === -1 ? 0 : (prevIndex + 1) % dialogues.length
        );
    };

    return (
        <div id="main">
            <div id="section">
                {dialogueIndex === -1 ? (
                    <>
                        <h1>Bonjour,</h1>
                        <p>N'hésitez pas à cliquer partout.</p>
                    </>
                ) : (
                    <>
                        <h1>{dialogues[dialogueIndex][0]}</h1>
                        <p>{dialogues[dialogueIndex][1]}</p>
                    </>
                )}
            </div>
            <div className="column">
                <div id="wrapper" ref={wrapperRef} className="hover">
                    <div id="mover" ref={cardRef} onClick={handleCardClick}>
                        <Card></Card>
                    </div>
                </div>
                <div id="controller">prev next</div>
            </div>
        </div>
    );
};

export default whoami;
