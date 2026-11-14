"use client";

import { useEffect, useRef } from "react";

type Props = {
    title: string;
    href: string; // where the title links to
    summary: string;
    cover?: string;
    logo?: string;
};

// One project card. Fades in when it scrolls into view and out again when it leaves
// (the .visible class is styled in app/globals.css).
export default function ProjectCard({ title, href, summary, cover, logo }: Props) {
    const cardRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.toggle("visible", entry.isIntersecting);
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );
        observer.observe(card);
        return () => observer.disconnect();
    }, []);

    return (
        <article className="project-container" ref={cardRef}>
            {cover && (
                <div className="project-image-wrapper">
                    <img className="project-image" src={cover} alt={`${title} screenshot`} loading="lazy" />
                </div>
            )}
            <div className="project-content">
                <div className="project-title-section">
                    {logo && <img className="project-logo" src={logo} alt="" />}
                    <a className="project-title" href={href}>
                        {title}
                    </a>
                </div>
                <div className="project-text">
                    <p>{summary}</p>
                </div>
            </div>
        </article>
    );
}
