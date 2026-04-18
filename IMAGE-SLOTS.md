# WrestleFlix Image Slot Reference

## How to swap in a real image

Each image slot looks like this in the HTML:

```html
<div class="wf-img" data-ratio="2-3" data-type="poster" data-label="185×278 · Show Poster">
  <!-- REPLACE: <img class="wf-img-el" src="img/poster-fma.jpg" alt="French Mime Assassins"/> -->
</div>
```

**To activate an image:** uncomment the `<img>` tag and add your file to the `img/` folder. The shimmer placeholder disappears automatically when the image loads. The fade-in transition is handled by `js/wf.js`.

---

## Image slot types and sizes

| Type | Ratio | Recommended Size | data-type value | Where used |
|------|-------|-----------------|----------------|-----------|
| Hero Banner | 16:9 | 1920×1080 | `hero` | Each brand/show hero section |
| Brand Card | 16:9 | 380×214 | `poster` | Active brands row on homepage |
| Show Poster | 2:3 | 370×556 (display: 185×278) | `poster` | Originals row, search results |
| Episode Thumb | 16:9 | 600×338 (display: 300×168) | `thumb` | Episode lists on show pages |
| Character | 2:3 | 300×450 (display: 150×225) | `character` | Characters row, brand rosters |
| Roster Card | 2:3 | 280×350 (display: 140×175) | `character` | Brand page roster grids |

---

## Complete file list — images to make

### Hero Banners (`img/hero-*.jpg`)
- `hero-wrestlemecca.jpg` — Gold/desert epic, tournament arena
- `hero-invader.jpg` — Deep space, cosmic, cyan glow
- `hero-fma.jpg` — Black and white, mime silhouettes
- `hero-deathgraps.jpg` — Dark red, debris, arena damage
- `hero-howell.jpg` — Studio set, neon sign, two red chairs
- `hero-aftershock.jpg` — Electric purple/blue, arena pyro
- `hero-f2w.jpg` — Dystopian F2W City skyline
- `hero-ccw.jpg` — Blue/gold, ornate
- `hero-awe.jpg` — Teal, corporate-meets-arena

### Brand Cards (`img/brand-*.jpg`) — 380×214
- `brand-wrestlemecca.jpg`
- `brand-aftershock.jpg`
- `brand-f2w.jpg`
- `brand-ccw.jpg`
- `brand-deathgraps.jpg`

### Show Posters (`img/poster-*.jpg`) — 370×556
- `poster-fma.jpg` — Mime silhouettes, B&W
- `poster-invader.jpg` — Cyan cosmic entity
- `poster-deathgraps.jpg` — Brutal red/black
- `poster-howell.jpg` — Neon pink talk show
- `poster-wrestlemecca.jpg` — Gold championship art
- `poster-christmas.jpg` — Holiday red/green

### Character Cards (`img/char-*.jpg`) — 300×450
One per character, named `char-[slug].jpg`:
- `char-brennan-devlin.jpg`
- `char-anastasia-hayden.jpg`
- `char-invader.jpg`
- `char-zack-fantana.jpg`
- `char-kassandrah.jpg`
- `char-rickie-flare.jpg`
- `char-gwenevere.jpg`
- `char-silas-romero.jpg`
- `char-stabitha.jpg`
- `char-jd-driftwood.jpg`
- `char-red-lock-legion.jpg`
- `char-maddie-stokes.jpg`
- `char-ivana-fondleberg.jpg`
- `char-bembe-brightwell.jpg`
- `char-motley-censori.jpg`
- `char-waverly-winters.jpg`
- `char-hatchet-gully.jpg`
- `char-warrick-hill.jpg`
- `char-cosmo-cooper.jpg`
- `char-vag.jpg`
- `char-thot-experiment.jpg`
- `char-harper-lee.jpg`
- `char-mad-max.jpg`
- `char-erica-bragg.jpg`
- `char-dashing-dash-dawkins.jpg`
- `char-gorgonzola.jpg`

### Episode Thumbnails (`img/thumb-*.jpg`) — 600×338
- `thumb-awe.jpg` — AWE Massacre
- `thumb-valorpro.jpg` — Valor Pro Blitz
- `thumb-paw.jpg` — Pure Amusement Wrestling

---

## Image effect system (already in CSS)

When the `<img>` tag is present but not yet loaded → shimmer placeholder shows.
When it loads → fades in over 0.6 seconds via CSS transition.
The dashed border color-codes the slot type during development:
- Red dashed = hero slot
- Gold dashed = poster slot  
- White dashed = episode thumb
- Purple dashed = character

Remove the `data-type` attribute in production to remove the development borders.
