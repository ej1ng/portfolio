"use client";

import styles from "./ThemeToggle.module.css";

// Day/night switch. The current theme lives in data-theme on <html> (set before the
// page paints by the small script in app/layout.tsx) and is remembered in localStorage.
// Both icons are always rendered; CSS shows the moon by day and the sun by night.
export default function ThemeToggle() {
    const toggle = () => {
        const root = document.documentElement;
        const next = root.dataset.theme === "dark" ? "light" : "dark";
        root.dataset.theme = next;
        try {
            localStorage.setItem("theme", next);
        } catch {
            // private browsing: the choice just won't be remembered
        }
    };

    return (
        <button type="button" className={styles.toggle} onClick={toggle} aria-label="Switch between day and night mode">
            <svg className={styles.moon} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <svg className={styles.sun} viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
        </button>
    );
}
