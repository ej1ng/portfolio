import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";

// Monospace font for the landing page text; downloaded at build time and self-hosted.
const plexMono = IBM_Plex_Mono({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_TITLE,
        template: `%s | ${SITE_TITLE}`,
    },
    description: SITE_DESCRIPTION,
    icons: { icon: "/assets/images/favicon.png" },
    alternates: {
        types: { "application/rss+xml": "/rss.xml" },
    },
};

// The landing page (app/page.tsx) renders straight into <body>.
// The journal, log and project pages add their navbar and footer in app/(site)/layout.tsx.
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={plexMono.variable} data-scroll-behavior="smooth">
            <body>{children}</body>
        </html>
    );
}
