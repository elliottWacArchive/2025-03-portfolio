"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import "./panel.css";
export default function Panel() {
    const [folders, setFolders] = useState<string[]>([]);
    const [project, setProject] = useState<{
        name: string;
        title: string;
        description: string;
        image: string;
    }>({ name: "", title: "", description: "", image: "" });

    useEffect(() => {
        fetch("/api/get-projects")
            .then((res) => res.json())
            .then((data) => setFolders(data))
            .catch(() => setFolders([]));
    }, []);

    const handleNavClick = async (folderName: string) => {
        try {
            const res = await fetch(`/project/${folderName}/info.json`);
            if (!res.ok) throw new Error("Fichier info.json introuvable");
            const data = await res.json();
            setProject({
                name: data.name,
                title: data.title,
                description: data.description,
                image: data.img,
            });
        } catch (error) {
            setProject({
                name: "Erreur",
                title: "Erreur",
                description: "Impossible de charger le projet.",
                image: "",
            });
        }
    };

    return (
        <div id="panel-container">
            <div id="nav-container">
                {folders.map((folder) => (
                    <div
                        key={folder}
                        className="nav-element"
                        onClick={() => handleNavClick(folder)}
                    >
                        {folder}
                    </div>
                ))}
            </div>
            <div id="project-container">
                <div id="project-title">{project.title}</div>
                <div id="project-description">{project.description}</div>
                {project.image && (
                    <Image
                        src={`/project/${project.name}/${project.image}`}
                        alt="image desc"
                        width={500}
                        height={300}
                    />
                )}
            </div>
        </div>
    );
}
