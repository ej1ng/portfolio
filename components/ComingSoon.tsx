import styles from "./ComingSoon.module.css";

// A page that only has its title so far. Used by sections that are not built yet.
export default function ComingSoon({ title }: { title: string }) {
    return (
        <main className={styles.page}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.note}>coming soon</p>
        </main>
    );
}
