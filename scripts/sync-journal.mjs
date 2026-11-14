// Copies public posts from the Obsidian vault into this site.
//
//   npm run sync-journal                     (vault at ~/obsidian-vault)
//   VAULT=/path/to/vault npm run sync-journal
//
// Only the vault folders Journal/ and Log/ are ever read.
// For each one, content/<kind> and public/<kind>/images are wiped and rebuilt
// from the .md files whose frontmatter has `status: public`.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const VAULT = path.resolve(process.env.VAULT ?? path.join(os.homedir(), "obsidian-vault"));

// vault folder -> site "kind"
const KINDS = [
    { vaultFolder: "Journal", kind: "journal" },
    { vaultFolder: "Log", kind: "log" },
];

// ![alt](images/photo.png) or ![alt](images/photo.png "title")
const IMAGE_LINK = /!\[([^\]]*)\]\(\s*images\/([^)\s]+)(\s+"[^"]*")?\s*\)/g;

let warnings = 0;
function warn(message) {
    warnings += 1;
    console.warn(`  warning: ${message}`);
}

function isInside(parent, child) {
    const relative = path.relative(parent, child);
    return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

// Every .md file in a folder, including subfolders (but not images/ or hidden folders).
function findMarkdownFiles(dir) {
    const files = [];
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
        if (item.name.startsWith(".")) continue;
        const itemPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            if (item.name !== "images") files.push(...findMarkdownFiles(itemPath));
        } else if (item.isFile() && item.name.endsWith(".md")) {
            files.push(itemPath);
        }
    }
    return files.sort();
}

function syncKind({ vaultFolder, kind }) {
    const sourceDir = path.join(VAULT, vaultFolder);
    const contentDir = path.join(ROOT, "content", kind);
    const imagesDir = path.join(ROOT, "public", kind, "images");

    console.log(`${vaultFolder}/ -> content/${kind}`);

    fs.rmSync(contentDir, { recursive: true, force: true });
    fs.rmSync(imagesDir, { recursive: true, force: true });
    fs.mkdirSync(contentDir, { recursive: true });

    if (!fs.existsSync(sourceDir)) {
        warn(`${sourceDir} does not exist, so content/${kind} is now empty`);
        return;
    }

    let copied = 0;
    let skipped = 0;
    const seen = new Map(); // file name -> vault path, to catch duplicates in subfolders

    for (const file of findMarkdownFiles(sourceDir)) {
        const name = path.basename(file);
        const shownPath = path.relative(VAULT, file);
        const raw = fs.readFileSync(file, "utf8");

        let status;
        try {
            status = matter(raw).data.status;
        } catch (error) {
            warn(`${shownPath}: could not read frontmatter (${error.message}), skipped`);
            continue;
        }
        if (status !== "public") {
            skipped += 1;
            continue;
        }
        if (seen.has(name)) {
            warn(`${shownPath}: same file name as ${seen.get(name)}, skipped`);
            continue;
        }
        seen.set(name, shownPath);

        // Copy referenced images and point the links at /<kind>/images/...
        const output = raw.replace(IMAGE_LINK, (match, alt, imagePath, title = "") => {
            let decoded = imagePath;
            try {
                decoded = decodeURIComponent(imagePath);
            } catch {
                // keep the path as written
            }
            const sourceImage = path.resolve(path.dirname(file), "images", decoded);
            if (!isInside(sourceDir, sourceImage)) {
                warn(`${shownPath}: image "${imagePath}" points outside ${vaultFolder}/, left unchanged`);
                return match;
            }
            if (!fs.existsSync(sourceImage) || !fs.statSync(sourceImage).isFile()) {
                warn(`${shownPath}: missing image images/${decoded}`);
            } else {
                const targetImage = path.join(imagesDir, decoded);
                fs.mkdirSync(path.dirname(targetImage), { recursive: true });
                fs.copyFileSync(sourceImage, targetImage);
            }
            return `![${alt}](/${kind}/images/${imagePath}${title})`;
        });

        fs.writeFileSync(path.join(contentDir, name), output);
        copied += 1;
    }

    console.log(`  ${copied} public post(s) copied, ${skipped} non-public skipped`);
}

if (!fs.existsSync(VAULT)) {
    console.error(`Vault not found at ${VAULT}. Set the VAULT env var to your Obsidian vault path.`);
    console.error("Nothing was changed.");
    process.exit(1);
}

console.log(`Vault: ${VAULT}`);
KINDS.forEach(syncKind);
console.log(warnings ? `Done with ${warnings} warning(s).` : "Done.");
