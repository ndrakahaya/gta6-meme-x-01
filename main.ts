// gta6-meme-x-01 entry: the post itself is the entry. This program only copies
// POST.json (the X post's address) from the repository into /output, where the
// gate reads it. No network, no clock, no files outside the repo.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const src = join(BOT_DIR, "POST.json");
if (!existsSync(src)) {
  console.error(`POST.json not found in ${BOT_DIR}`);
  process.exit(1);
}
// The gate reads the post from X, so the URL must be well-formed JSON naming an X post.
const post = JSON.parse(readFileSync(src, "utf8")) as { url?: unknown };
if (typeof post.url !== "string" || !/^(https?:\/\/)?(www\.|mobile\.)?(x\.com|twitter\.com)\/\S+\/status\/\d+$/.test(post.url)) {
  console.error("POST.json does not name an X post URL");
  process.exit(1);
}
mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(src, join(OUTPUT_DIR, "POST.json"));
