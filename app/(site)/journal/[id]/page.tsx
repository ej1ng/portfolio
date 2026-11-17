import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { atLeastOne, formatDate, getJournal, tagSlug } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";

type Props = { params: Promise<{ id: string }> };

// Every public entry is built at build time; any other id is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
    return atLeastOne(
        "id",
        getJournal().map((entry) => entry.id)
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const entry = getJournal().find((item) => item.id === id);
    if (!entry) return {};

    return {
        title: entry.title,
        description: entry.summary,
        openGraph: {
            type: "article",
            title: entry.title,
            description: entry.summary,
            url: `/journal/${entry.id}`,
            publishedTime: entry.date.toISOString(),
            tags: entry.tags,
        },
        twitter: {
            card: "summary",
            title: entry.title,
            description: entry.summary,
        },
    };
}

export default async function JournalEntryPage({ params }: Props) {
    const { id } = await params;
    const entry = getJournal().find((item) => item.id === id);
    if (!entry) notFound();

    const html = await renderMarkdown(entry.content);

    return (
        <article className="page">
            <header className="post-header">
                <h1 className="post-title">{entry.title}</h1>
                {entry.summary && <p className="post-subtitle">{entry.summary}</p>}
                <p className="post-meta">
                    <time dateTime={entry.date.toISOString()}>{formatDate(entry.date)}</time>
                    {entry.tags.map((tag) => (
                        <Link key={tag} className="tag" href={`/journal/tags/${tagSlug(tag)}`}>
                            #{tag}
                        </Link>
                    ))}
                </p>
                {entry.project && (
                    <p className="post-meta">
                        part of <Link href={`/projects/${entry.project}`}>{entry.project}</Link>
                    </p>
                )}
            </header>
            <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
            <p className="back-link">
                <Link href="/journal">← all journal entries</Link>
            </p>
        </article>
    );
}
