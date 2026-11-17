import Intro from "@/components/landing/Intro";
import PlaceholderBox from "@/components/landing/PlaceholderBox";
import styles from "./page.module.css";

// Landing page. Each piece is its own component; this file only places them.
export default function HomePage() {
    return (
        <main className={styles.landing}>
            <Intro className={styles.intro} />
            <PlaceholderBox className={styles.boxLeft} aspectRatio="503 / 276" />
            <PlaceholderBox className={styles.boxRight} aspectRatio="366 / 211" />
        </main>
    );
}
