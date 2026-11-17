import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostList from "@/components/PostList";
import { atLeastOne, getJournal, getProjects } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return atLeastOne(
        "id",
        getProjects().map((project) => project.id)
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const project = getProjects().find((item) => item.id === id);
    if (!project) return {};

    return {
        title: project.title,
        description: project.summary,
        openGraph: {
            type: "article",
            title: project.title,
            description: project.summary,
            url: `/projects/${project.id}`,
            images: project.cover ? [project.cover] : undefined,
        },
        twitter: {
            card: project.cover ? "summary_large_image" : "summary",
            title: project.title,
            description: project.summary,
            images: project.cover ? [project.cover] : undefined,
        },
    };
}

export default async function ProjectPage({ params }: Props) {
    const { id } = await params;
    const project = getProjects().find((item) => item.id === id);
    if (!project) notFound();

    const html = await renderMarkdown(project.content);
    // Build log: public journal entries whose `project` field is this project's id.
    const buildLog = getJournal().filter((entry) => entry.project === project.id);

    return (
        <article className="page">
            <header className="post-header">
                <h1 className="post-title">
                    {project.logo && <img className="project-page-logo" src={project.logo} alt="" />}
                    {project.title}
                </h1>
                <p className="post-subtitle">{project.summary}</p>
                {project.tech.length > 0 && (
                    <p className="post-meta">
                        {project.tech.map((item) => (
                            <span key={item} className="tag">
                                {item}
                            </span>
                        ))}
                    </p>
                )}
                {(project.repo || project.link) && (
                    <p className="post-meta">
                        {project.repo && <a href={project.repo}>repo</a>}
                        {project.link && <a href={project.link}>link</a>}
                    </p>
                )}
            </header>

            {project.cover && (
                <img className="project-page-cover" src={project.cover} alt={`${project.title} screenshot`} />
            )}

            {html && <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />}

            <section className="build-log">
                <h2 className="latest-heading">Build log</h2>
                {buildLog.length === 0 ? (
                    <p className="post-list-summary">no journal entries for this project yet.</p>
                ) : (
                    <PostList posts={buildLog} hrefFor={(post) => `/journal/${post.id}`} />
                )}
            </section>

            <p className="back-link">
                <Link href="/projects">← all projects</Link>
            </p>
        </article>
    );
}
