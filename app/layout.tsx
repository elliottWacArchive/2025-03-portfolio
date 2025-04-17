import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Where Is Donnie",
    description: "Where is Donnie? Frank Was Here.",
    icons: {
        icon: "/image/favicon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <audio
                    src="/ambient.mp3"
                    autoPlay
                    loop
                    style={{ display: "none" }}
                />
                {children}
            </body>
        </html>
    );
}
