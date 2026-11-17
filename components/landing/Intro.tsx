import Wordmark from "@/components/Wordmark";
import styles from "./Intro.module.css";

// The "emily jing" wordmark with the short intro line under it.
export default function Intro({ className = "" }: { className?: string }) {
    return (
        <header className={`${styles.intro} ${className}`}>
            <Wordmark />
            <p className={styles.text}>hi my name is emily and this revamp is a work in progress!</p>
        </header>
    );
}
