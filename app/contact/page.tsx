"use client";

import { useState } from "react";

export default function ContactPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Envoi en cours...");

        try {
            const res = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, message }),
            });

            if (res.ok) {
                setStatus("Email envoyé avec succès !");
                setEmail("");
                setMessage("");
            } else {
                setStatus("Erreur lors de l'envoi de l'email.");
            }
        } catch (error) {
            setStatus("Erreur lors de l'envoi de l'email.");
        }
    };

    return (
        <div>
            <h1>Contactez-moi</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Votre email :</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message">Votre message :</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Envoyer</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
}
