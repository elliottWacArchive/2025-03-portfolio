"use client";

import React, { useState, useEffect, useRef } from "react";
import "./page.css";

interface Contact {
    icon: string;
    link: string;
    text: string;
}

const MatrixContactPage: React.FC = () => {
    const [visibleContacts, setVisibleContacts] = useState<number[]>([]);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const requestRef = useRef<number | null>(null);

    const contacts: Contact[] = [
        {
            icon: "/image/icon/cv.min.svg",
            link: "./CV_Elliott_RAMET-GROUT.pdf",
            text: "CV",
        },
        {
            icon: "/image/icon/instagram.min.svg",
            link: "https://www.instagram.com/kickage2porte/",
            text: "Instagram",
        },
        {
            icon: "/image/icon/linkedin.min.svg",
            link: "https://www.linkedin.com/in/elliott-ramet-grout-038118360?",
            text: "LinkedIn",
        },
        {
            icon: "/image/icon/github.min.svg",
            link: "https://github.com/gloubiboulgaah",
            text: "GitHub",
        },
        {
            icon: "/image/icon/twitter.min.svg",
            link: "https://x.com/general444e?s=21",
            text: "Twitter",
        },
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);

        const drops: number[] = [];
        for (let i = 0; i < columns; i++) {
            drops[i] =
                Math.floor((Math.random() * canvas.height) / fontSize) * -1;
        }

        const matrixChars =
            "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890";

        const draw = () => {
            if (!ctx || !canvas) return;

            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#00ff72";
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = matrixChars.charAt(
                    Math.floor(Math.random() * matrixChars.length)
                );

                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.globalAlpha = Math.random() * 0.8 + 0.2;

                ctx.fillText(char, x, y);

                drops[i]++;

                if (
                    drops[i] * fontSize > canvas.height &&
                    Math.random() > 0.98
                ) {
                    drops[i] = 0;
                }
            }

            requestRef.current = requestAnimationFrame(draw);
        };

        requestRef.current = requestAnimationFrame(draw);

        return () => {
            if (requestRef.current !== null) {
                cancelAnimationFrame(requestRef.current);
            }
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    useEffect(() => {
        const revealContacts = () => {
            const timer = setInterval(() => {
                setVisibleContacts((prev) => {
                    if (prev.length < contacts.length) {
                        return [...prev, prev.length];
                    } else {
                        clearInterval(timer);
                        return prev;
                    }
                });
            }, 500);

            return () => clearInterval(timer);
        };

        const initialDelay = setTimeout(revealContacts, 500);
        return () => clearTimeout(initialDelay);
    }, []);

    return (
        <div className="matrix-container">
            {/* effet matrix */}
            <canvas ref={canvasRef} className="matrix-canvas"></canvas>

            <div className="contacts-container">
                {contacts.map((contact, index) => (
                    <div
                        key={index}
                        className={`contact ${
                            visibleContacts.includes(index)
                                ? "visible"
                                : "hidden"
                        }`}
                    >
                        <img src={contact.icon} alt="" />
                        <a href={contact.link}>{contact.text}</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MatrixContactPage;
