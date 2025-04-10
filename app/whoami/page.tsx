"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./style.css";
import Card from "@/components/card";

const SimplePokemonCard: React.FC = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

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

    return (
        <div id="main">
            <div id="wrapper" ref={wrapperRef} className="hover">
                <div id="mover" ref={cardRef}>
                    <Card></Card>
                </div>
            </div>
        </div>
    );
};

export default SimplePokemonCard;
