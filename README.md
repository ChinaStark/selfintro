# selfintro — Personal Research Site

Minimal, researcher‑style personal website for Zhiliang Long. Bilingual (EN/中文) with JSON‑driven content.

## Local Preview
- Open `index.html` directly, or run: `python -m http.server -d . 8000` and visit `http://localhost:8000`.

## Publish with GitHub Pages (project site)
1. GitHub → Settings → Pages
2. Source: `Deploy from a branch`
3. Branch: `main` and Folder: `/ (root)`
4. After a few minutes: `https://chinastark.github.io/selfintro`

## Structure
- `index.html` main page (renders sections)
- `css/main.css` styling (supports dark mode)
- `js/main.js` language toggle + render from JS data
- `data/site.js` all editable content + i18n strings (EN/中文)
- `assets/profile.jpg` add your portrait here (optional)

## Customize
- Edit `data/site.js` only. The site reads this JSON and renders sections (Interests, News, Internships, Awards, Publications, Projects) and applies i18n strings for headings, header name/tagline, About, and labels.
- Replace `assets/profile.jpg` and add a CV PDF if desired.

### JSON schema (summary)
- `i18n.{en,zh}`: key‑value strings, e.g. `page.title`, `header.name`, `about.body`, `section.*`, `nav.*`, `contact.*`, `footer.updated`.
- `content.interests`: array of `{ en, zh }` strings.
- `content.news`: array of `{ date, en, zh }`.
- `content.internships`: array of `{ company, period, role, desc }`, each with `{ en, zh }`, plus an optional `logo` image path.
- `content.awards`: array of `{ title: { en, zh }, desc: { en, zh } }`.
- `content.publications`: array of `{ title: { en, zh }, authors, highlightAuthor?, venue: { en, zh }, links: { pdf?, doi?, code? } }`.
- `content.projects`: array of `{ name, desc: { en, zh }, link }`.



