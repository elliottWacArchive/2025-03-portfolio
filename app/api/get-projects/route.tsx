import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    const projectsDir = path.join(process.cwd(), "public", "project");

    try {
        const folders = fs
            .readdirSync(projectsDir)
            .filter((file) =>
                fs.statSync(path.join(projectsDir, file)).isDirectory()
            );

        return NextResponse.json(folders);
    } catch (error) {
        return NextResponse.json(
            { message: "Erreur lors de la lecture des dossiers" },
            { status: 500 }
        );
    }
}
