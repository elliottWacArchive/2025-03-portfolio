// filepath: /Users/elliott/Documents/epitech/portfolio/app/information/page.tsx
"use client";

import React, { useState } from "react";

const Page = () => {
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);

    const correctPassword = process.env.NEXT_PUBLIC_CORRECT_PASSWORD; // Récupérer le mot de passe depuis .env

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === correctPassword) {
            setIsAuthorized(true);
        } else {
            alert("Mot de passe incorrect");
        }
    };

    return (
        <div>
            {!isAuthorized ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Entrez le mot de passe :
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button type="submit">Valider</button>
                </form>
            ) : (
                <div>
                    <h1>Contenu protégé</h1>
                    <p>Voici le fichier ou les informations protégées :</p>
                    <object
                        data="/CV_Elliott_RAMET-GROUT.pdf"
                        type="application/pdf"
                        width="100%"
                        height="600px"
                    >
                        <p>
                            Votre navigateur ne peut pas afficher le fichier
                            PDF. Vous pouvez le
                            <a
                                href="/CV_Elliott_RAMET-GROUT.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                télécharger ici
                            </a>
                            .
                        </p>
                    </object>
                </div>
            )}
        </div>
    );
};

export default Page;
