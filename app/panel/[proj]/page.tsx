"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import "./style.css";

const ProjectPage = () => {
    const { proj } = useParams();
    const [project, setProject] = useState<{
        title: string;
        description: string;
        link: string;
        img: string;
    } | null>(null);

    useEffect(() => {
        if (!proj) return;

        fetch(`/project/${proj}/info.json`)
            .then((res) => {
                if (!res.ok) throw new Error("info.json introuvable");
                return res.json();
            })
            .then((data) => setProject(data))
            .catch(() =>
                setProject({
                    title: "Erreur",
                    description: "Impossible de charger les infos du projet.",
                    link: "/",
                    img: "/loading2.gif",
                })
            );
    }, [proj]);

    return (
        <div className="project">
            <h1>{project ? project.title : "Chargement..."}</h1>
            <p>{project ? project.description : "..."}</p>
            <a href={project ? project.link : "/"}>
                {project ? project.link : "/"}
            </a>
            <Image
                src={
                    project
                        ? "/project/" + proj + "/" + project.img
                        : "/loading2.gif"
                }
                width={100}
                height={100}
                alt="Loading"
            />
        </div>
    );
};

export default ProjectPage;
