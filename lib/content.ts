import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

// All site content lives in Markdown files under content/.
// content/journal and content/log are filled by `npm run sync-journal`;
// content/projects is edited by hand.
const CONTENT_DIR = path.join(process.cwd(), "content");

const postFields = {
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
    status: z.enum(["draft", "public"]),
};

const journalSchema = z.object({
    ...postFields,
    project: z.string().optional(),
});

const logSchema = z.object(postFields);

const projectSchema = z.object({
    title: z.string(),
    summary: z.string(),
    tech: z.array(z.string()),
    repo: z.string().optional(),
    cover: z.string().optional(), // path under public/, e.g. /assets/images/projects/x.png
    featured: z.boolean(),
    order: z.number(),
    // Extras used by the project cards:
    logo: z.string().optional(), // small icon beside the title, path under public/
    link: z.string().optional(), // where the card title goes when there is no repo
});

type Entry<T> = T & { id: string; content: string };

export type JournalEntry = Entry<z.infer<typeof journalSchema>>;
export type LogEntry = Entry<z.infer<typeof logSchema>>;
export type Project = Entry<z.infer<typeof projectSchema>>;

// Read every .md file in content/<folder>. The id is the file name without ".md".
function readCollection<T extends object>(folder: string, schema: z.ZodType<T>): Entry<T>[] {
    const dir = path.join(CONTENT_DIR, folder);
    if (!fs.existsSync(dir)) return [];

    return fs
        .readdirSync(dir)
        .filter((file) => file.endsWith(".md"))
        .map((file) => {
            const filePath = path.join(dir, file);
            const relativePath = path.join("content", folder, file);

            let parsed: matter.GrayMatterFile<string>;
            try {
                parsed = matter(fs.readFileSync(filePath, "utf8"));
            } catch (error) {
                throw new Error(`Could not parse frontmatter in ${relativePath}: ${(error as Error).message}`);
            }

            const result = schema.safeParse(parsed.data);
            if (!result.success) {
                const problems = result.error.issues
                    .map((issue) => `  - ${issue.path.join(".") || "(frontmatter)"}: ${issue.message}`)
                    .join("\n");
                throw new Error(`Invalid frontmatter in ${relativePath}:\n${problems}`);
            }

            return { ...result.data, id: file.replace(/\.md$/, ""), content: parsed.content };
        });
}

function publicNewestFirst<T extends { status: string; date: Date; id: string }>(entries: T[]): T[] {
    return entries
        .filter((entry) => entry.status === "public")
        .sort((a, b) => b.date.getTime() - a.date.getTime() || b.id.localeCompare(a.id));
}

/** Public journal entries, newest first. */
export function getJournal(): JournalEntry[] {
    return publicNewestFirst(readCollection("journal", journalSchema));
}

/** Public log posts, newest first. */
export function getLog(): LogEntry[] {
    return publicNewestFirst(readCollection("log", logSchema));
}

/** All projects, sorted by their `order` field. */
export function getProjects(): Project[] {
    return readCollection("projects", projectSchema).sort((a, b) => a.order - b.order);
}

/** Turn a tag into the form used in /journal/tags/<slug> URLs. */
export function tagSlug(tag: string): string {
    return tag
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/** e.g. "Nov 10, 2026". Dates are treated as UTC so they never shift by a day. */
export function formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
    });
}

/**
 * Static export refuses to build a dynamic route that has zero pages (for example
 * /journal/[id] before any entry is public). When the list is empty this returns one
 * placeholder, which the page turns into a 404.
 */
export const EMPTY_PLACEHOLDER = "_empty";
export function atLeastOne<K extends string>(key: K, values: string[]): Record<K, string>[] {
    const list = values.length > 0 ? values : [EMPTY_PLACEHOLDER];
    return list.map((value) => ({ [key]: value }) as Record<K, string>);
}
