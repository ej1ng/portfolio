import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
    title: "Projects",
    description: "Things Emily Jing has built.",
};

// Same cards as the homepage, but every project is listed and each title opens its own page.
export default function ProjectsPage() {
    return (
        <section className="projects-block projects-page">
            <h1 className="section-header">projects</h1>
            <div className="projects-row">
                {getProjects().map((project) => (
                    <ProjectCard
                        key={project.id}
                        title={project.title}
                        href={`/projects/${project.id}`}
                        summary={project.summary}
                        cover={project.cover}
                        logo={project.logo}
                    />
                ))}
            </div>
        </section>
    );
}
