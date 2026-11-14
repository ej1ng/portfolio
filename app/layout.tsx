import type { Metadata } from "next";
import Link from "next/link";
import "katex/dist/katex.min.css";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";

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

// The navbar and footer are shared by every page.
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" data-scroll-behavior="smooth">
            <body>
                <nav className="navbar">
                    <Link className="nav-logo" href="/">
                        <img className="logo" src="/assets/images/logo.png" alt="Home" />
                    </Link>
                    <div className="nav-options">
                        <Link href="/#about-me" className="button">
                            about me
                        </Link>
                        <Link href="/#projects" className="button">
                            projects
                        </Link>
                        <Link href="/log" className="button">
                            log
                        </Link>
                        <Link href="/journal" className="button">
                            journal
                        </Link>
                        <Link href="/#contact" className="button">
                            contact
                        </Link>
                    </div>
                </nav>

                <main>{children}</main>

                <footer className="footer">
                    <p className="footer-text">Coded with 💕 &amp; 🍙</p>
                </footer>
            </body>
        </html>
    );
}
