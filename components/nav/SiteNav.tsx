import Link from "next/link";
import ThemeToggle from "@/components/nav/ThemeToggle";
import styles from "./SiteNav.module.css";

const LINKS = [
    { label: "home", href: "/" },
    { label: "work", href: "/work" },
    { label: "about", href: "/about" },
];

// Nav bar across the top of the page: links on the left, day/night toggle on the right.
// It is laid over the top of the page, so it does not push any content down.
export default function SiteNav() {
    return (
        <nav className={styles.nav} aria-label="Main">
            <ul className={styles.links}>
                {LINKS.map((link) => (
                    <li key={link.href}>
                        <Link className={styles.link} href={link.href}>
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <ThemeToggle />
        </nav>
    );
}
