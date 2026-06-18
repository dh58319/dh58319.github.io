# dh58319.github.io

Personal portfolio website for **Donghyun Kim** — built with React + Vite and
deployed to GitHub Pages via GitHub Actions.

🔗 Live site: https://dh58319.github.io/

## Tech Stack

- **React 18** + **React Router** (HashRouter)
- **Vite 5** (build tool)
- **Git LFS** for image storage
- **GitHub Actions** for automatic deployment

## Project Structure

```
.
├── .github/workflows/deploy.yml   # CI/CD: builds and deploys to GitHub Pages
├── public/                        # Static files copied as-is (favicon, .nojekyll)
├── src/
│   ├── data.js                    # ← Main site content (profile, bio, research…)
│   ├── blog.js                    # Loads blog posts from content/posts/*.md
│   ├── content/posts/             # ← Blog posts: one Markdown file per post
│   ├── App.jsx                    # Routes + layout (navbar, footer)
│   ├── main.jsx                   # App entry (HashRouter)
│   ├── styles.css                 # Global styles + theme colors
│   ├── components/
│   │   ├── Navbar.jsx             # Top navigation bar
│   │   └── Section.jsx            # Reusable section heading
│   ├── pages/
│   │   ├── Home.jsx               # Photo, Bio, News, Education, Skills, Awards
│   │   ├── Research.jsx           # Interests, Projects, Publications, Teaching, Experience
│   │   ├── Blog.jsx               # Blog list + individual post pages
│   │   └── Photography.jsx        # Auto-loading photo gallery + lightbox
│   └── assets/
│       ├── profile.jpg            # Profile photo
│       └── gallery/               # Drop photos here → they appear automatically
└── vite.config.js                 # Base path + asset config
```

## Local Development

```bash
npm install      # first time only
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build locally
```

> If `node` is not found, this project was set up with Homebrew Node:
> `export PATH="/opt/homebrew/bin:$PATH"`

## Editing Content

All text content lives in **`src/data.js`** (and blog posts in **`src/blog.js`**).
No need to touch the components for routine updates.

| What to update | Where |
|----------------|------------------------|
| Name, title, email, social links | `data.js` → `profile` |
| News / recent updates | `data.js` → `news` |
| Bio paragraphs | `data.js` → `bio` |
| Publications | `data.js` → `publications` (empty array shows "Coming soon") |
| Work experience | `data.js` → `experience` |
| Education | `data.js` → `education` |
| Skills | `data.js` → `skills` |
| Honors & awards | `data.js` → `awards` |
| Research interests | `data.js` → `researchInterests` |
| Research projects | `data.js` → `researchProjects` |
| Teaching | `data.js` → `teaching` |
| Blog posts | Add a Markdown file in `src/content/posts/` (see below) |

### Writing a Blog Post

Create a new Markdown file in `src/content/posts/`, e.g. `my-first-post.md`:

```md
---
title: My First Post
date: 2026-06-18
summary: A short blurb shown in the blog list.
---

Write your post here in **Markdown**. Headings, lists, links, images,
code blocks — all supported.
```

- The filename becomes the URL slug (`my-first-post.md` → `/blog/my-first-post`).
- Posts are sorted by `date` (newest first).
- To link out to an external article instead, add a `url:` field to the
  frontmatter — the body is then ignored and the card links out.

## Adding Photos to the Gallery

1. Drop image files (`.jpg`, `.png`, `.webp`) into `src/assets/gallery/`.
2. They are picked up **automatically** — no code changes needed.
3. **Optimize before committing** (originals from a camera are often 5–12 MB):

   ```bash
   # Resize to max 2000px wide, JPEG quality 78 (run from repo root)
   cd src/assets/gallery
   for f in *.jpg; do sips -Z 2000 -s format jpeg -s formatOptions 78 "$f"; done
   ```

   This keeps the page fast and saves Git LFS bandwidth.

### Profile photo

Replace `src/assets/profile.jpg` (recommended ~600px square):

```bash
sips -Z 600 -s format jpeg -s formatOptions 82 src/assets/profile.jpg
```

## Git LFS

Images are tracked with [Git LFS](https://git-lfs.com/) (see `.gitattributes`)
so they don't bloat the Git history.

- After cloning, run `git lfs install` once, then `git lfs pull` to fetch images.
- The deploy workflow checks out with `lfs: true` so CI gets the real files.
- Free GitHub LFS quota: **1 GB storage / 1 GB bandwidth per month.** Keep images
  optimized (above) to stay well within limits.

## Deployment

Deployment is **automatic**: every push to `main` triggers
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the
site and publishes it to GitHub Pages.

```bash
git add -A
git commit -m "Update content"
git push
```

Watch progress at the [Actions tab](https://github.com/dh58319/dh58319.github.io/actions).
The site updates ~1–2 minutes after a successful run.

### One-time Pages setup

In **Settings → Pages → Build and deployment**, set **Source** to
**GitHub Actions** (not "Deploy from a branch"). This must stay on GitHub Actions
for the built site to be served correctly.

## Notes

- This is a user page repo (`<username>.github.io`), so the Vite `base` is `/`.
  For a project repo, build with `BASE_PATH=/<repo>/ npm run build`.
- Routing uses `HashRouter`, so deep links like `/#/research` work on GitHub
  Pages without extra 404 configuration.
