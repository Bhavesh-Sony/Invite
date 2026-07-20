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
    tagline: "Classy, Responsible & Family ki Unofficial Manager",
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
  monogram: "picss/monogram.png",
  familyPhoto: "picss/family_photo.jpeg",
  footerSignature: "Rajani's & Sony's",
  reel: {
    collagePhoto: "picss/kids_holding_hands.png",
    brideOutfit: "picss/reel/bride-outfit.png",
    groomOutfit: "picss/reel/groom-outfit.png",
    cameraPhoto: "picss/reel/camera.png",
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
| `event.date` / `time` / `venue` / `address` | Scratch reveal content |
| `event.dateISO` | Live countdown target |
| `event.mapsEmbedSrc` | Google Maps iframe `src` only (https) |
| `event.mapsLink` | “Navigate to Venue” button URL |
| `invitationMessage` | Text on the static invitation card |
| `monogram` / `familyPhoto` / `footerSignature` | Opening monogram and family footer |
| `photoPosition` | Horizontal/vertical focus for the childhood-photo crop |
| `reel.collagePhoto` | Childhood photo ejected by the instant camera |
| `reel.brideOutfit` / `groomOutfit` / `cameraPhoto` | Frame crops from Video-969 for the reel |
| `reel.timings` | Duration in milliseconds for each animated reel scene |
| `timeline` | Journey milestone cards |
| `music` | Background piano audio file |

---

## Childhood photos on characters

Each childhood photo is composited into the cream cutout of the video-frame outfit sprites in `picss/reel/`:

- Photo crop is controlled by `photoPosition`
- If the image fails to load, a letter fallback is shown

Swap photos by changing `childhoodPhoto` paths. Adjust `photoPosition` (for example, `"50% 20%"`) until the face and hairstyle are centered in the frame.

---

## Guest journey

1. Hero monogram + names animate in on load  
2. Down arrow scrolls to the reel and plays it  
3. After the reel, scrolls to Engagement Invitation + Scratch (one viewport)  
4. Then smoothly auto-scrolls Countdown → Timeline → Maps → Footer  

---

## Features

- Elegant loading screen (rings, floral cue, progress %)
- 9:16 childhood save-the-date reel using exact outfits from Video-969 frames
- Staged scroll journey driven by the down arrow and reel completion
- Replay and Skip controls
- Automatic background music with first-interaction fallback for restrictive browsers
- Static invitation card (message only)
- Canvas scratch card to reveal the date, time, and venue
- Live countdown
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

### AWS EC2 + Elastic IP (custom domain)

Use this when you want the site on your own domain (for example `invite.yourdomain.com`) instead of GitHub Pages.

1. **Create an EC2 instance** (Ubuntu 22.04+, `t3.micro` is enough).
2. **Allocate an Elastic IP** in the AWS console: **EC2 → Network & Security → Elastic IPs → Allocate**, then **Associate** it with your instance.
3. **Open ports** in the instance security group: `22` (SSH), `80` (HTTP), `443` (HTTPS).
4. **SSH into the server** and run:

```bash
curl -fsSL https://raw.githubusercontent.com/Bhavesh-Sony/Invite/main/deploy/setup-ec2.sh -o setup-ec2.sh
sudo bash setup-ec2.sh yourdomain.com
```

5. **Point DNS** at your domain registrar:
   - `A` record: `@` → your **Elastic IP**
   - `A` record: `www` → your **Elastic IP**
6. Wait a few minutes for DNS, then visit `https://yourdomain.com`.

To update the site after pushing to GitHub:

```bash
cd /var/www/invite && sudo git pull && sudo systemctl reload nginx
```

---

## Tips

- Test the scratch card and music on a phone; both are touch-friendly.
- After changing `dateISO`, hard-refresh the page to reset the countdown.
- The reel auto-plays once when scrolled into view; use **Replay** or **Skip** anytime.

Made with love for Bhavisha & Bhavesh 💍
