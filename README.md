# emilyjing.com

Check it out! https://emilyjing.com/

Built with Next.js (App Router, TypeScript) and exported as a static site for GitHub Pages.

## Structure

```
app/
  layout.tsx            navbar + footer shared by every page, site metadata
  page.tsx              homepage (intro, about, projects, latest, contact)
  globals.css           all styles; colors/fonts/spacing are variables at the top
  journal/              /journal, /journal/[id], /journal/tags/[tag]
  log/                  /log (one stream; /log#<file name> links to one post)
  projects/             /projects, /projects/[id] (with build log)
  rss.xml/route.ts      RSS feed of journal + log
components/             ProjectCard (scroll fade-in), PostList
lib/
  content.ts            reads + validates the Markdown in content/
  markdown.ts           Markdown -> HTML (GFM, math, code highlighting)
content/
  projects/             one .md per project - edit by hand
  journal/, log/        filled by `npm run sync-journal` - don't edit by hand
public/
  assets/               fonts and images
  CNAME                 custom domain for GitHub Pages
scripts/sync-journal.mjs  copies public posts from the Obsidian vault
```

## Running locally

```
npm install
npm run dev        # http://localhost:3000
npm run build      # writes the static site to out/
```

## Adding a project

1. Put the screenshot and logo in `public/assets/images/projects/`.
2. Add `content/projects/my-project.md`:

```md
---
title: My Project
summary: What it does.
tech: [Python, Arduino]
repo: https://github.com/ej1ng/my-project
cover: /assets/images/projects/my-project.png
logo: /assets/images/projects/my-project-logo.png
featured: true      # show on the homepage
order: 7            # position in the list
---

Optional longer write-up, shown on /projects/my-project.
```

Use `link:` instead of `repo:` when the project lives somewhere other than a repo.

## Journal and log

Posts are written in Obsidian, in the vault folders `Journal/` and `Log/`. Only posts with
`status: public` are copied to the site.

```
npm run sync-journal                        # vault at ~/obsidian-vault
VAULT=/path/to/vault npm run sync-journal   # vault somewhere else
```

Each run wipes `content/journal`, `content/log`, `public/journal/images` and `public/log/images`
and rebuilds them from the vault. Images written as `![](images/photo.png)` are copied too.

Frontmatter:

```md
---
title: What I built today
date: 2026-11-10
tags: [hardware]
summary: One line shown in lists and link previews.
status: public          # or draft
project: thermasense    # journal only, optional: file name of a project in content/projects
---
```

A log post's file name is its anchor: `Log/2026-11-10.md` is at `/log#2026-11-10`.

## Deploying

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site and publishes
`out/` to GitHub Pages. In the repo settings, Pages > Source must be set to "GitHub Actions".
