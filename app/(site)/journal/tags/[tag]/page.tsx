import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostList from "@/components/PostList";
import { atLeastOne, getJournal, tagSlug } from "@/lib/content";

type Props = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

// Public journal entries carrying a tag, plus the tag as it was written.
function entriesForTag(slug: string) {
    const entries = getJournal().filter((entry) => entry.tags.some((tag) => tagSlug(tag) === slug));
    const name = entries[0]?.tags.find((tag) => tagSlug(tag) === slug) ?? slug;
    return { entries, name };
}

export function generateStaticParams() {
    const slugs = new Set(getJournal().flatMap((entry) => entry.tags.map(tagSlug)));
    return atLeastOne("tag", [...slugs].filter(Boolean));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { tag } = await params;
    const { name } = entriesForTag(tag);
    return {
        title: `#${name}`,
        description: `Journal entries tagged ${name}.`,
    };
}

export default async function JournalTagPage({ params }: Props) {
    const { tag } = await params;
    const { entries, name } = entriesForTag(tag);
    if (entries.length === 0) notFound();

    return (
        <div className="page">
            <h1 className="section-header">#{name}</h1>
            <PostList posts={entries} hrefFor={(post) => `/journal/${post.id}`} />
            <p className="back-link">
                <Link href="/journal">← all journal entries</Link>
            </p>
        </div>
    );
}
