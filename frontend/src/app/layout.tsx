import "./globals.css";
import Providers from "./provider";

export const metadata = {
    title: "Tasks Management",
    description: "Task Management System with NestJS + Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}
