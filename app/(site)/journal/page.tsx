import type { Metadata } from "next";
import PostList from "@/components/PostList";
import { getJournal } from "@/lib/content";

export const metadata: Metadata = {
    title: "Journal",
    description: "Emily Jing's engineering journal.",
};

export default function JournalPage() {
    const entries = getJournal();

    return (
        <div className="page">
            <h1 className="section-header">journal</h1>
            {entries.length === 0 ? (
                <p className="body-text">nothing here yet...</p>
            ) : (
                <PostList posts={entries} hrefFor={(post) => `/journal/${post.id}`} />
            )}
        </div>
    );
}
