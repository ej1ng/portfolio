import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

const processor = unified()
    .use(remarkParse)
    .use(remarkGfm) // tables, task lists, strikethrough, footnotes
    .use(remarkMath) // $inline$ and $$block$$ math
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypePrettyCode, { theme: "github-light", keepBackground: false }) // shiki
    .use(rehypeStringify);

/** Convert a Markdown string to an HTML string. Runs at build time only. */
export async function renderMarkdown(md: string): Promise<string> {
    const file = await processor.process(md);
    return String(file);
}
