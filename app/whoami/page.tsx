"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./style.css";
import Card from "@/components/card";
import Donnie from "@/components/donnieTalk";
import Elliott from "@/components/elliottTalk";

const whoami: React.FC = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [dialogueIndex, setDialogueIndex] = useState(-1); // -1 pour le premier message
    const dialogues = [
        [
            <Donnie />,
            <p>
                "La créativité est mon essence même. Je ne peux m’empêcher de
                créer, de découvrir et de dépeindre mes pensées sous n’importe
                quelle forme. J’adore Internet tout simplement parce que c’est
                l’outil de création absolu."
            </p>,
        ],
        [
            <Elliott />,
            <p>
                "Bonjour, je suis Elliott. Je programme avec passion depuis déjà
                plusieurs années. Cette formation à la{" "}
                <a target="_blank" href="https://www.webacademie.org/">
                    webacademie
                </a>{" "}
                est pour moi une occasion unique d'acquérir un diplôme dans un
                domaine qui me passionne."
            </p>,
        ],
        [
            <Donnie />,
            <p>
                "Ce que je ressent et ce que je peux exprimer sont deux choses
                très distinctes. La créativité c'est aussi chercher ses limites
                dans son expression, c'est une manière propre à moi même de
                transmettre des émotions sans nécessairement passer par le
                language."
            </p>,
        ],
        [
            <Elliott />,
            <p>
                "Lors de mon parcours dans le monde du numérique j'ai pu aborder
                de nombreux langages de paradigmes différents. Je sais donc
                programmer en C, PHP, JS/TS, Python. Mais j'ai pu aborder
                d'autres langages tels que le Java, Ocaml, le Rust ou encore
                l'ASM."
            </p>,
        ],
        [
            <Elliott />,
            <p>
                "Je ne me limite d'ailleurs pas que à des langages, j'aime aussi
                découvrir le travail d'autres développeurs et j'ai pu donc
                utiliser de nombreux frameworks. Next, Symfony, React, Django
                pour ne citer qu'eux."
            </p>,
        ],
        [
            <Donnie />,
            <p>
                "Ce que j'entends par expression de la creativité ne se limite
                pas qu'à la programmation. J'adore le dessin, la vidéo, la
                musique, l'écriture. J'essaye de toucher au plus grand nombre de
                forme d'art possible. Je veux créer quoi qu'il en coûte."
            </p>,
        ],
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
                        <div className="inline">
                            <img
                                className="iconTitle"
                                src="/navi.png"
                                alt="oeil"
                            />
                            <h1>NAVI:</h1>
                        </div>
                        <p>
                            Bonjour. Cette page est intéractive. N'hésitez pas à
                            tenter de rentrer en contact avec l'individu(s) ici
                            présent. Il ne représente aucun danger.
                        </p>
                    </>
                ) : (
                    <>
                        {dialogues[dialogueIndex][0]}
                        {dialogues[dialogueIndex][1]}
                    </>
                )}
            </div>
            <div className="column">
                <div id="wrapper" ref={wrapperRef} className="hover">
                    <div id="mover" ref={cardRef} onClick={handleCardClick}>
                        <Card></Card>
                    </div>
                </div>
                <div id="controller">
                    <p>
                        Index actuel:{" "}
                        <span className="num">
                            {dialogueIndex + 1} / {dialogues.length}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default whoami;
