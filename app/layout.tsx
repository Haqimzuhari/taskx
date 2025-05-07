import type { Metadata } from "next";
import "./globals.css";
import ScreenMaintenance from "@/components/screen/maintenance";

export const metadata: Metadata = {
    title: "Taskx",
    description: "Reliable task management tool",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE
    if (MAINTENANCE_MODE == "true") {
        return (
            <ScreenMaintenance/>
        )
    }
    return (
        <html lang="en" className="bg-neutral-800 text-neutral-100">
            <body suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
