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
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "elliott.rametgrout@gmail.com",
                pass: "flny onkk vkoh msgs",
            },
        });

        await transporter.sendMail({
            from: `"Formulaire de Contact" <${email}>`,
            to: "elliott.rametgrout@gmail.com",
            subject: "Nouveau message depuis le formulaire de contact",
            text: `Message de ${email}:\n\n${message}`,
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
