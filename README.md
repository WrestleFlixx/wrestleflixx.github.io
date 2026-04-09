# WrestleFlix

The official streaming platform for the WrestleMecca universe. A Lana Cuppola & Dario Cinema production, built on the estate of Francis Ford Cuppola.

## File Structure

```
wrestleflix/
├── index.html              ← Main homepage (Netflix-style)
├── aftershock.html         ← Aftershock sub-brand page
├── css/
│   └── style.css           ← All styles
├── js/
│   ├── content.js          ← All show/episode content data
│   └── main.js             ← Navigation, modals, search
└── README.md
```

## Deploying to GitHub Pages

1. Create a GitHub repository named `wrestleflixx.github.io` (or your preferred name)
2. Upload ALL files keeping the folder structure intact
3. Go to Settings → Pages → Source: main branch → Save
4. Live at: `https://wrestleflixx.github.io`

## Adding New Content

### Adding a New Show

In `js/content.js`, add a new entry to the `CONTENT` object:

```javascript
'my-show-id': {
  id: 'my-show-id',
  title: 'Show Title',
  eyebrow: 'WrestleFlix Original Series',
  meta: ['Season 1', 'Genre', 'Rating'],
  type: 'series',           // 'series', 'episode', or 'coming-soon'
  description: 'Show description...',
  episodes: [
    {
      id: 'ep-1',
      num: 'S1 · E1',
      title: 'Episode Title',
      tag: 'Tag label',
      content: `<p>Your episode content here. Supports full HTML.</p>`
    }
  ]
}
```

### Adding a New Card to the Homepage

In `index.html`, find the appropriate `<div class="card-scroll">` section and add:

```html
<div class="card show-card" onclick="openContent('my-show-id')">
  <div class="card-poster portrait-poster">
    <img src="YOUR-IMAGE-URL" alt="Show Title" class="poster-img portrait-img" />
    <div class="poster-overlay portrait-overlay">
      <div class="card-badge-new">NEW</div>
      <button class="quick-play">▶</button>
    </div>
    <div class="portrait-title">SHOW TITLE</div>
  </div>
  <div class="card-info">
    <h3>Show Title</h3>
    <p>Brief description.</p>
  </div>
</div>
```

### Updating Aftershock Roster

In `aftershock.html`, find the `<div id="as-roster">` section and add:

```html
<div class="as-roster-card">
  <div class="as-roster-name">Wrestler Name</div>
  <div class="as-roster-role">Competitor</div>
</div>
```

## Content Types

- **`series`** — Shows an episode list. Clicking an episode opens its content.
- **`episode`** — Opens directly to content (for single events/specials).
- **`coming-soon`** — Shows placeholder content with "Coming Soon" styling.

## Federation Hubs

Federation data lives in the `FEDERATIONS` object in `content.js`. Each federation has:
- Stats display
- Event schedule
- Rankings table
- Tournament bracket placeholder
- Roster grid
- Application form

## Adding a New Federation

```javascript
FEDERATIONS['my-fed'] = {
  id: 'my-fed',
  name: 'FEDERATION NAME',
  tagline: 'Tagline here',
  description: 'Description...',
  stats: [{ num: 'Value', label: 'Label' }],
  schedule: [{ date: 'Apr 2026', event: 'Event Name', type: 'Type' }],
  rankings: [{ rank: 1, name: 'Wrestler', record: '10-2', note: 'CHAMPION' }],
  roster: [{ name: 'Wrestler Name', role: 'Role' }]
};
```
