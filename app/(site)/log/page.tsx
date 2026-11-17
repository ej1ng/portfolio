import type { Metadata } from "next";
import { formatDate, getLog } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";

export const metadata: Metadata = {
    title: "Log",
    description: "Emily Jing's daily log.",
};

// All public log posts in one stream. Each post's id is its file name,
// so /log#2026-11-10 jumps straight to that day.
export default async function LogPage() {
    const posts = await Promise.all(
        getLog().map(async (post) => ({ ...post, html: await renderMarkdown(post.content) }))
    );

    return (
        <div className="page">
            <h1 className="section-header">log</h1>
            {posts.length === 0 && <p className="body-text">nothing here yet...</p>}
            {posts.map((post) => (
                <article key={post.id} id={post.id} className="log-post">
                    <header>
                        <p className="post-meta">
                            <a href={`#${post.id}`}>
                                <time dateTime={post.date.toISOString()}>{formatDate(post.date)}</time>
                            </a>
                            {post.tags.map((tag) => (
                                <span key={tag} className="tag">
                                    #{tag}
                                </span>
                            ))}
                        </p>
                        <h2 className="log-title">{post.title}</h2>
                        {post.summary && <p className="post-subtitle">{post.summary}</p>}
                    </header>
                    <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
                </article>
            ))}
        </div>
    );
}
