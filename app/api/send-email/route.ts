import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    const { email, message } = await req.json();

    if (!email || !message) {
        return NextResponse.json(
            { error: "Email et message requis." },
            { status: 400 }
        );
    }

    try {
        // Configurer le transporteur Nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "elliott.rametgrout@gmail.com", // Remplacez par votre email
                pass: "flny onkk vkoh msgs", // Remplacez par votre mot de passe ou app password
            },
        });

        // Configurer le contenu de l'email
        await transporter.sendMail({
            from: email,
            to: "elliott.rametgrout@gmail.com", // Votre adresse email
            subject: "Nouveau message depuis le formulaire de contact",
            text: message,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
        return NextResponse.json(
            { error: "Erreur lors de l'envoi de l'email." },
            { status: 500 }
        );
    }
}
