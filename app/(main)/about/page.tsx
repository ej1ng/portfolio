import type { Metadata } from "next";
import styles from "../placeholder.module.css";

export const metadata: Metadata = { title: "about" };

// Placeholder until the about page is designed.
export default function AboutPage() {
    return (
        <main className={styles.page}>
            <h1 className={styles.title}>about</h1>
            <p className={styles.note}>coming soon</p>
        </main>
    );
}
