import Link from "next/link";
import "./site.css";

// Navbar and footer for the journal, log and project pages.
// These pages still use the previous design (site.css).
export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="site">
            <nav className="navbar">
                <Link className="nav-logo" href="/">
                    <img className="logo" src="/assets/images/logo.png" alt="Home" />
                </Link>
                <div className="nav-options">
                    <Link href="/projects" className="button">
                        projects
                    </Link>
                    <Link href="/log" className="button">
                        log
                    </Link>
                    <Link href="/journal" className="button">
                        journal
                    </Link>
                </div>
            </nav>

            <main>{children}</main>

            <footer className="footer">
                <p className="footer-text">Coded with 💕 &amp; 🍙</p>
            </footer>
        </div>
    );
}
