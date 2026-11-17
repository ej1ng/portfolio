import type { Metadata } from "next";
import styles from "../placeholder.module.css";

export const metadata: Metadata = { title: "work" };

// Placeholder until the work page is designed.
export default function WorkPage() {
    return (
        <main className={styles.page}>
            <h1 className={styles.title}>work</h1>
            <p className={styles.note}>coming soon</p>
        </main>
    );
}
