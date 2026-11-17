import type { CSSProperties } from "react";
import styles from "./PlaceholderBox.module.css";

type Props = {
    /** Width / height of the box, e.g. "16 / 9". */
    aspectRatio?: string;
    /** Position and width come from the page layout. */
    className?: string;
};

// A plain grey box that holds a spot on the page until real content (an image,
// a project preview...) is ready. It is decorative, so screen readers skip it.
export default function PlaceholderBox({ aspectRatio = "16 / 9", className = "" }: Props) {
    return (
        <div
            className={`${styles.box} ${className}`}
            style={{ "--box-ratio": aspectRatio } as CSSProperties}
            aria-hidden="true"
        />
    );
}
