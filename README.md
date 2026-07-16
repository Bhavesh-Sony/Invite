# Premium Engagement Invitation — Bhavisha & Bhavesh

A cinematic, fully responsive digital engagement invitation built with **HTML, CSS, and vanilla JavaScript only**. No frameworks, no backend — open `index.html` or deploy to any static host.

---

## Quick start

1. Open [`index.html`](index.html) in a modern browser, **or**
2. Serve locally for best audio/map results:

```bash
npx serve .
```

Then visit the URL shown in the terminal (usually `http://localhost:3000`).

---

## Customize everything

All guest-facing content is driven by a single configuration object at the **top of [`script.js`](script.js)**:

```javascript
const INVITATION = {
  bride: {
    name: "Bhavisha",
    title: "Ghar ki Badi Beti",
    tagline: "Classy, Responsible & Drama Queen",
    childhoodPhoto: "picss/Bhavisha_cropped_2.PNG",
    photoPosition: "50% 50%",
  },
  groom: { /* ... */ },
  event: {
    date: "14th August 2026",
    dateISO: "2026-08-14T18:00:00+05:30", // used by countdown
    time: "6:00 PM onwards",
    venue: "Sobremesa",
    address: "...",
    mapsEmbedSrc: "https://www.google.com/maps/embed?pb=...",
    mapsLink: "https://maps.app.goo.gl/...",
  },
  invitationMessage: "We would be honoured...",
  reel: {
    collagePhoto: "picss/collage.png",
    timings: { bride: 6800, meets: 1700, groom: 5300, camera: 4000 },
  },
  timeline: [ { icon, title, text }, ... ],
  music: "clavier-music-soft-background-piano-285589.mp3",
};
```

### Important path rules

- Use **relative web paths** from `index.html` (e.g. `picss/photo.png`).
- Do **not** use Windows absolute paths like `D:\Invite\...` — browsers cannot load those when the site is hosted.

### What to change

| Field | Effect |
|--------|--------|
| `bride` / `groom` | Names, titles, taglines, childhood photos on animated characters |
| `event.date` / `time` / `venue` / `address` | Event details card & scratch reveal text |
| `event.dateISO` | Live countdown target |
| `event.mapsEmbedSrc` | Google Maps iframe `src` only (https) |
| `event.mapsLink` | “Navigate to Venue” button URL |
| `invitationMessage` | Text inside the 3D flip card |
| `photoPosition` | Horizontal/vertical focus for the childhood-photo crop |
| `reel.collagePhoto` | Childhood collage ejected by the instant camera |
| `reel.timings` | Duration in milliseconds for each animated reel scene |
| `timeline` | Journey milestone cards |
| `music` | Background piano audio file |

---

## Childhood photos on characters

Each childhood photo is placed inside a gold square frame held by an original SVG illustrated character:

- Photo uses a non-destructive square crop controlled by `photoPosition`
- If the image fails to load, a monogram avatar (first letter of the name) is shown

Swap photos by changing `childhoodPhoto` paths. Adjust `photoPosition` (for example, `"50% 20%"`) until the face and hairstyle are centered in the frame.

---

## Features

- Elegant loading screen (rings, floral cue, progress %)
- 9:16 childhood save-the-date reel with bride, “Meets”, groom, instant-camera, and final-poster scenes
- Replay and Skip controls
- Soft background music (muted until the visitor presses play)
- 3D flip invitation card
- Canvas scratch card to reveal the date (mouse + touch + keyboard fallback)
- Live countdown
- Event details
- Scroll timeline
- Embedded Google Maps + navigate button
- Floating decorations & scroll animations
- Accessibility: skip link, ARIA labels, keyboard support, `prefers-reduced-motion`

---

## File structure

```
Invite/
├── index.html
├── style.css
├── script.js
├── README.md
├── clavier-music-soft-background-piano-285589.mp3
├── picss/                  ← photos
└── assets/                 ← optional extra folders
```

---

## Deploy

### GitHub Pages

1. Push this folder to a GitHub repository.
2. **Settings → Pages → Source**: Deploy from `main` (root), or use `/docs` if you move files there.
3. Visit `https://<user>.github.io/<repo>/`.

### Netlify

1. Drag and drop the project folder onto [Netlify Drop](https://app.netlify.com/drop), **or**
2. Connect the Git repo with publish directory = `/` (no build command).

### Vercel

1. Import the Git repo in Vercel.
2. Framework preset: **Other**.
3. Build command: leave empty. Output directory: `.`

---

## Tips

- Test the scratch card and music on a phone; both are touch-friendly.
- After changing `dateISO`, hard-refresh the page to reset the countdown.
- The reel auto-plays once when scrolled into view; use **Replay** or **Skip** anytime.

Made with love for Bhavisha & Bhavesh 💍
