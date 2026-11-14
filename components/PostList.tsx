import Link from "next/link";
import { formatDate } from "@/lib/content";

type Post = {
    id: string;
    title: string;
    date: Date;
    summary?: string;
};

// A list of posts: date, linked title, summary. Used for journal lists and build logs.
export default function PostList({ posts, hrefFor }: { posts: Post[]; hrefFor: (post: Post) => string }) {
    return (
        <ul className="post-list">
            {posts.map((post) => (
                <li key={post.id} className="post-list-item">
                    <time className="post-date" dateTime={post.date.toISOString()}>
                        {formatDate(post.date)}
                    </time>
                    <Link className="post-list-title" href={hrefFor(post)}>
                        {post.title}
                    </Link>
                    {post.summary && <p className="post-list-summary">{post.summary}</p>}
                </li>
            ))}
        </ul>
    );
}
