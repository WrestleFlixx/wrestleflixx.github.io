# WrestleFlix — GitHub Repository Structure

## wrestleflixx.github.io/

```
/
├── index.html              ← Homepage (rotating hero, all rows, search)
├── STRUCTURE.md            ← This file
├── IMAGE-SLOTS.md          ← Image replacement guide
│
├── css/
│   ├── wf.css              ← SHARED design system (use this on all pages)
│   └── style.css           ← Legacy (kept for backward compat during migration)
│
├── js/
│   ├── wf.js               ← SHARED behaviour (navbar, image load, row arrows, hero rotation)
│   ├── main.js             ← Legacy
│   └── content.js          ← Legacy
│
├── img/                    ← ALL images live here, flat, named by type prefix
│   ├── hero-*.jpg          ← 1920×1080 hero banners
│   ├── poster-*.jpg        ← 370×556 show posters (2:3)
│   ├── brand-*.jpg         ← 380×214 brand cards (16:9)
│   ├── char-*.jpg          ← 300×450 character portraits (2:3)
│   └── thumb-*.jpg         ← 600×338 episode thumbnails (16:9)
│
├── shows/                  ← Netflix-style streaming pages
│   ├── french-mime-assassins.html
│   ├── invader-series.html
│   ├── death-graps-series.html
│   ├── howell-are-you-doing.html
│   ├── wrestlemecca.html
│   ├── awe-massacre.html
│   ├── valor-pro-blitz.html
│   └── william-dawson-christmas-special.html
│
├── brands/                 ← Active promotion hubs (roster + shows)
│   ├── aftershock.html
│   ├── fight-2-win.html
│   ├── ccw.html
│   └── ssw.html
│
├── archive/                ← Legacy promotion history pages
│   ├── awe.html
│   ├── valorpro.html
│   └── paw.html
│
├── characters/             ← Individual character pages (26 total)
│   ├── anastasia-hayden.html
│   ├── brennan-devlin.html
│   ├── kassandrah.html
│   └── ... (one per character, slug format)
│
└── rosters/                ← Roster tools and brackets
    ├── fight-2-win.html          ← (same as brands/fight-2-win.html — symlink or dupe)
    ├── universal-roster.html     ← Not linked in nav, accessible via brand pages
    └── wrestlemecca-bracket.html ← 32-person tournament bracket
```

## URLs this produces on GitHub Pages

| Old URL | New URL |
|---------|---------|
| /character-brennan-devlin.html | /characters/brennan-devlin.html |
| /french-mime-assassins.html | /shows/french-mime-assassins.html |
| /aftershock.html | /brands/aftershock.html |
| /awe.html | /archive/awe.html |
| /roster.html | /rosters/universal-roster.html |

## All links are root-relative

Every `href` in every file uses `/folder/file.html` format.
This means links work correctly regardless of what folder a page lives in.
No `../../` relative path hell.

## To add a new image

1. Drop the file in `img/` with the correct name prefix
2. Find the HTML comment that says `<!-- REPLACE: <img ...> -->`
3. Uncomment it — the shimmer placeholder disappears automatically on load
