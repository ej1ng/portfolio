import { getJournal, getLog } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";

// Generated once at build time and written to out/rss.xml.
export const dynamic = "force-static";

function escapeXml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

export function GET() {
    // getJournal() and getLog() only return public entries.
    const items = [
        ...getJournal().map((entry) => ({ ...entry, url: `${SITE_URL}/journal/${entry.id}/`, category: "Journal" })),
        ...getLog().map((post) => ({ ...post, url: `${SITE_URL}/log/#${post.id}`, category: "Log" })),
    ].sort((a, b) => b.date.getTime() - a.date.getTime());

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items
    .map(
        (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="true">${escapeXml(item.url)}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <category>${item.category}</category>${
          item.summary ? `\n      <description>${escapeXml(item.summary)}</description>` : ""
      }
    </item>`
    )
    .join("\n")}
  </channel>
</rss>
`;

    return new Response(xml, {
        headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
}
