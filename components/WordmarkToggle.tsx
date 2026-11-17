"use client";

import { useEffect, useRef, useState } from "react";

// The only interactive part of the wordmark. Hover and keyboard focus are pure CSS;
// this handles touch devices, which have no hover:
//   - shortly after page load the letters spread once, then close again
//   - after that, a tap toggles them
// It only sets data-expanded; the movement itself is CSS (see app/globals.css).
const INTRO_OPEN_AFTER_MS = 500;
const INTRO_CLOSE_AFTER_MS = 1700;

export default function WordmarkToggle({ children }: { children: React.ReactNode }) {
    const [expanded, setExpanded] = useState(false);
    const timers = useRef<number[]>([]);

    const clearTimers = () => {
        timers.current.forEach((id) => window.clearTimeout(id));
        timers.current = [];
    };

    useEffect(() => {
        const isTouch = window.matchMedia("(hover: none)").matches;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!isTouch || reducedMotion) return;

        timers.current = [
            window.setTimeout(() => setExpanded(true), INTRO_OPEN_AFTER_MS),
            window.setTimeout(() => setExpanded(false), INTRO_CLOSE_AFTER_MS),
        ];
        return clearTimers;
    }, []);

    const handleClick = () => {
        if (!window.matchMedia("(hover: none)").matches) return; // hover devices use CSS :hover
        clearTimers();
        setExpanded((value) => !value);
    };

    return (
        <span className="wordmark" data-expanded={expanded} onClick={handleClick}>
            {children}
        </span>
    );
}
