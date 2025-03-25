"use client";
import { useParams } from "next/navigation";

const ProjectPage = () => {
    const { proj } = useParams();

    return (
        <div>
            <h1>{proj ? `Project: ${proj}` : "Loading..."}</h1>
        </div>
    );
};

export default ProjectPage;
