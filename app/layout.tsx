import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Taskx",
    description: "Reliable task management tool",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    const MAINTENANCE_MODE = true;
    if (MAINTENANCE_MODE) {
        return (
            <html lang="en" className="bg-neutral-800 text-neutral-100">
                <body suppressHydrationWarning>
                    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-neutral-800 space-y-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wrench-icon lucide-wrench text-yellow-600"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                        <h1 className="text-xl">Page Under Maintenance</h1>
                        <p>Please comeback later</p>
                    </div>
                </body>
            </html>
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
