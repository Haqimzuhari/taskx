import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Taskx",
    description: "Reliable task management tool",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en" className="bg-neutral-800 text-neutral-100">
            <body suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
