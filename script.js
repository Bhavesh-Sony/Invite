/* ============================================================
   Premium Engagement Invitation
   ============================================================
   EDIT THE INVITATION OBJECT BELOW to customize everything.
   Paths are relative to index.html (web paths, not Windows paths).
   ============================================================ */

const INVITATION = {
  bride: {
    name: "Bhavisha",
    title: "Ghar ki Badi Beti",
    tagline: "Classy, Responsible & Drama Queen",
    childhoodPhoto: "picss/Bhavisha_cropped_2.PNG",
    /** Horizontal and vertical focus inside the square reel frame. */
    photoPosition: "50% 50%",
  },

  groom: {
    name: "Bhavesh",
    title: "Ghar ka Chota Beta",
    tagline: "Calm, Funny & Sabka Favourite",
    childhoodPhoto: "picss/bhavesh_cropped.JPG",
    /** Places his eyes on the same horizontal line as Bhavisha's. */
    photoPosition: "50% 65%",
  },

  event: {
    date: "14th August 2026",
    /** ISO datetime used by the countdown timer (IST) */
    dateISO: "2026-08-14T18:00:00+05:30",
    time: "6:00 PM onwards",
    venue: "Sobremesa",
    address: "Road no 31, Jubilee Hills, Hyderabad",
    mapsEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.493319522981!2d78.40522399999999!3d17.436087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91ea20a8f355%3A0x7daaca89e91df5eb!2sSobremesa%3A%20Cafe%E2%80%99%20Bakehouse%20Kitchen!5e0!3m2!1sen!2sin!4v1784110628487!5m2!1sen!2sin",
    mapsLink: "https://maps.app.goo.gl/j2TpvajXoqkHiPVU9",
  },

  invitationMessage:
    "We would be honoured to celebrate this beautiful beginning with your presence.",

  reel: {
    collagePhoto: "picss/collage.png",
    timings: {
      bride: 6800,
      meets: 1700,
      groom: 5300,
      camera: 4000,
    },
  },

  timeline: [
    {
      icon: "🌸",
      title: "Once Upon a Time",
      text: "Two souls filled with laughter, dreams, and a sparkle of destiny.",
    },
    {
      icon: "❤️",
      title: "Friendship",
      text: "Shared smiles turned into a bond that felt meant to be.",
    },
    {
      icon: "💖",
      title: "Love",
      text: "Hearts found home in each other — forever began quietly.",
    },
    {
      icon: "💍",
      title: "Engagement",
      text: "And now, with love and blessings, they begin a lifetime together.",
    },
  ],

  music: "clavier-music-soft-background-piano-285589.mp3",
};

/* ============================================================
   UTILITIES
   ============================================================ */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ============================================================
   INIT FROM CONFIG — populate all dynamic DOM content
   ============================================================ */

function initFromConfig() {
  const { bride, groom, event } = INVITATION;

  // Hero names
  const heroBride = $("#hero-bride-name");
  const heroGroom = $("#hero-groom-name");
  if (heroBride) heroBride.textContent = bride.name;
  if (heroGroom) heroGroom.textContent = groom.name;

  // Childhood reel photos and copy
  setReelPhotos("bride", bride);
  setReelPhotos("groom", groom);
  const collagePhoto = $("#reel-collage-photo");
  if (collagePhoto) collagePhoto.src = INVITATION.reel.collagePhoto;
  $("#reel-bride-title").textContent = bride.title;
  $("#reel-bride-tagline").textContent = bride.tagline;
  $("#reel-groom-title").textContent = groom.title;
  $("#reel-groom-tagline").textContent = groom.tagline;
  $("#poster-names").textContent = `${bride.name} & ${groom.name}`;

  // Invitation card
  $("#invite-message").textContent = INVITATION.invitationMessage;
  $("#invite-from").textContent = `${bride.name} & ${groom.name}`;

  // Scratch reveal
  $("#scratch-date").textContent = event.date;
  $("#scratch-time").textContent = event.time;

  // Event details
  $("#detail-date").textContent = event.date;
  $("#detail-time").textContent = event.time;
  $("#detail-venue").textContent = event.venue;
  $("#detail-address").textContent = event.address;

  // Maps — whitelist https google maps embed only
  const mapWrap = $("#map-embed");
  if (mapWrap && isSafeMapsSrc(event.mapsEmbedSrc)) {
    const iframe = document.createElement("iframe");
    iframe.src = event.mapsEmbedSrc;
    iframe.title = `Map to ${event.venue}`;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;
    mapWrap.appendChild(iframe);
  }
  const mapsLink = $("#maps-link");
  if (mapsLink) {
    mapsLink.href = event.mapsLink;
  }

  // Footer
  const footerNames = $("#footer-names");
  if (footerNames) {
    footerNames.textContent = `${bride.name} & ${groom.name}`;
  }

  // Audio
  const audio = $("#bg-audio");
  if (audio) {
    audio.src = INVITATION.music;
    audio.volume = parseFloat($("#music-volume")?.value || "0.4");
  }

  // Timeline
  buildTimeline();

  // Document title
  document.title = `Engagement Invitation — ${bride.name} & ${groom.name}`;
}

function setReelPhotos(key, person) {
  $$(`[data-person-photo="${key}"]`).forEach((img) => {
    img.src = person.childhoodPhoto;
    img.style.objectPosition = person.photoPosition || "50% 25%";
    img.addEventListener("error", () => {
      img.style.display = "none";
      $(`[data-person-fallback="${key}"]`)?.classList.add("is-visible");
    });
  });
  const fallback = $(`[data-person-fallback="${key}"]`);
  if (fallback) {
    fallback.textContent = (person.name || "?").charAt(0).toUpperCase();
  }
}

function isSafeMapsSrc(src) {
  try {
    const u = new URL(src);
    return (
      u.protocol === "https:" &&
      (u.hostname === "www.google.com" ||
        u.hostname === "maps.google.com" ||
        u.hostname.endsWith(".google.com"))
    );
  } catch {
    return false;
  }
}

function buildTimeline() {
  const list = $("#timeline-list");
  if (!list) return;
  list.innerHTML = "";
  INVITATION.timeline.forEach((item) => {
    const li = document.createElement("li");
    li.className = "timeline__item";
    li.innerHTML = `
      <span class="timeline__dot" aria-hidden="true">${item.icon}</span>
      <div class="timeline__card">
        <h3 class="timeline__title">${item.icon} ${escapeHtml(item.title)}</h3>
        <p class="timeline__text">${escapeHtml(item.text)}</p>
      </div>
    `;
    list.appendChild(li);
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ============================================================
   LOADING SCREEN
   ============================================================ */

const Loader = {
  async start() {
    const loader = $("#loader");
    const bar = $("#loader-bar");
    const percentEl = $("#loader-percent");
    const particlesEl = $("#loader-particles");

    // Spawn glow particles
    if (particlesEl && !prefersReducedMotion()) {
      for (let i = 0; i < 18; i++) {
        const p = document.createElement("span");
        p.className = "loader__particle";
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        p.style.animationDelay = `${Math.random() * 3}s`;
        p.style.background =
          Math.random() > 0.5 ? "var(--champagne)" : "var(--rose-gold)";
        particlesEl.appendChild(p);
      }
    }

    // Preload key assets
    const urls = [
      INVITATION.bride.childhoodPhoto,
      INVITATION.groom.childhoodPhoto,
      INVITATION.reel.collagePhoto,
    ];
    let loaded = 0;
    const total = urls.length + 1; // +1 for audio metadata attempt
    const start = performance.now();
    const maxMs = 3500;

    const update = (n) => {
      const pct = Math.min(100, Math.round((n / total) * 100));
      if (bar) bar.style.width = `${pct}%`;
      if (percentEl) percentEl.textContent = `${pct}%`;
    };

    const preloadImage = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          loaded++;
          update(loaded);
          resolve();
        };
        img.src = src;
      });

    const preloadAudio = () =>
      new Promise((resolve) => {
        const a = $("#bg-audio");
        if (!a) {
          loaded++;
          update(loaded);
          return resolve();
        }
        const done = () => {
          loaded++;
          update(loaded);
          resolve();
        };
        a.addEventListener("loadedmetadata", done, { once: true });
        a.addEventListener("error", done, { once: true });
        // Force load attempt
        a.load();
        setTimeout(done, 1500);
      });

    await Promise.all([...urls.map(preloadImage), preloadAudio()]);

    // Finish any remaining fill smoothly
    const elapsed = performance.now() - start;
    if (elapsed < 1200 && !prefersReducedMotion()) {
      await wait(1200 - elapsed);
    }
    update(total);
    if (bar) bar.style.width = "100%";
    if (percentEl) percentEl.textContent = "100%";
    await wait(300);

    if (loader) loader.classList.add("is-done");
    // Cap total wait
    if (performance.now() - start > maxMs) {
      loader?.classList.add("is-done");
    }
  },
};

/* ============================================================
   SCROLL REVEAL
   ============================================================ */

const ScrollReveal = {
  init() {
    const els = $$("[data-animate]");
    if (prefersReducedMotion()) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));

    // Timeline items
    const timelineItems = $$(".timeline__item");
    const tio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            tio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    timelineItems.forEach((el) => tio.observe(el));
  },
};

/* ============================================================
   STORY CONTROLLER
   ============================================================ */

const StoryController = {
  running: false,
  hasPlayed: false,
  runId: 0,
  scenes: [],

  init() {
    this.scenes = $$(".reel-scene");
    $("#story-skip")?.addEventListener("click", () => this.skip());
    $("#story-replay")?.addEventListener("click", () => this.play());
    $("#poster-replay")?.addEventListener("click", () => this.play());

    if (prefersReducedMotion()) {
      this.showPoster();
      return;
    }

    const story = $("#story");
    if (!story) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasPlayed) {
            this.hasPlayed = true;
            io.unobserve(story);
            this.play();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(story);
  },

  skip() {
    this.runId++;
    this.running = false;
    this.showPoster();
  },

  async play() {
    const id = ++this.runId;
    const timings = INVITATION.reel.timings;
    this.running = true;
    this.setScene(null);

    // The reference opens on textured paper before the bride rises in.
    await wait(650);
    if (id !== this.runId) return;

    const sequence = [
      ["scene-bride", timings.bride],
      ["scene-meets", timings.meets],
      ["scene-groom", timings.groom],
      ["scene-camera", timings.camera],
    ];

    for (const [sceneId, duration] of sequence) {
      if (id !== this.runId) return;
      this.setScene(sceneId);
      await wait(duration);
    }

    if (id !== this.runId) return;
    this.showPoster();
    this.running = false;
  },

  setScene(sceneId) {
    this.scenes.forEach((scene) => {
      scene.classList.remove("is-active");
      scene.setAttribute("aria-hidden", "true");
    });
    if (!sceneId) return;

    const scene = $(`#${sceneId}`);
    if (!scene) return;
    // Force animation restart when the visitor replays the reel.
    void scene.offsetWidth;
    scene.classList.add("is-active");
    scene.setAttribute("aria-hidden", "false");
  },

  showPoster() {
    this.setScene("scene-poster");
  },
};

/* ============================================================
   FLIP CARD
   ============================================================ */

const FlipCard = {
  init() {
    const card = $("#flip-card");
    if (!card) return;

    const flip = () => {
      if (card.classList.contains("is-flipped")) return;
      card.classList.add("is-flipped");
      card.setAttribute("aria-pressed", "true");
      card.setAttribute("aria-label", "Invitation revealed");
      this.sparkle(card);
    };

    card.addEventListener("click", flip);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        flip();
      }
    });
  },

  sparkle(el) {
    if (prefersReducedMotion()) return;
    for (let i = 0; i < 8; i++) {
      const s = document.createElement("span");
      s.textContent = "✨";
      s.style.cssText = `
        position:absolute; pointer-events:none; font-size:1rem;
        left:50%; top:50%; z-index:5;
        animation: celebrateBurst 1.2s ease-out forwards;
        --tx:${(Math.random() - 0.5) * 200}px;
        --ty:${(Math.random() - 0.5) * 160}px;
      `;
      el.style.position = "relative";
      el.appendChild(s);
      setTimeout(() => s.remove(), 1300);
    }
  },
};

/* ============================================================
   SCRATCH CARD
   ============================================================ */

const ScratchCard = {
  revealed: false,
  scratching: false,
  lastCheck: 0,

  init() {
    const canvas = $("#scratch-canvas");
    const card = $("#scratch-card");
    if (!canvas || !card) return;

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { willReadFrequently: true });
    this.card = card;

    const resize = () => this.setupCanvas();
    resize();
    window.addEventListener("resize", resize);

    const start = (e) => {
      this.scratching = true;
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      this.scratch(e);
    };
    const move = (e) => {
      if (this.scratching) this.scratch(e);
    };
    const end = () => {
      this.scratching = false;
      this._lx = null;
      this._ly = null;
    };

    canvas.addEventListener("pointerdown", start);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointerleave", end);
    canvas.addEventListener("pointercancel", end);

  },

  setupCanvas() {
    if (this.revealed) return;
    const canvas = this.canvas;
    const width = this.card.clientWidth;
    const height = this.card.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    const ctx = this.ctx;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Gold gradient overlay
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#D4AF77");
    grad.addColorStop(0.35, "#C9A96E");
    grad.addColorStop(0.65, "#E8D5A3");
    grad.addColorStop(1, "#B8935A");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Noise / texture dots
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.15})`;
      ctx.fillRect(
        Math.random() * width,
        Math.random() * height,
        2,
        2
      );
    }

    // Hint text
    ctx.fillStyle = "rgba(58, 47, 42, 0.55)";
    ctx.font = "600 15px Poppins, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Scratch here ✨", width / 2, height / 2);
  },

  scratch(e) {
    if (this.revealed) return;
    const canvas = this.canvas;
    const ctx = this.ctx;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    if (clientX == null) return;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Soft trail
    if (e.buttons || e.pressure || e.pointerType === "touch") {
      ctx.lineWidth = 36;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "rgba(0,0,0,1)";
      if (this._lx != null) {
        ctx.beginPath();
        ctx.moveTo(this._lx, this._ly);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      this._lx = x;
      this._ly = y;
    }

    const now = performance.now();
    if (now - this.lastCheck > 200) {
      this.lastCheck = now;
      this.checkReveal();
    }
  },

  checkReveal() {
    const ctx = this.ctx;
    const canvas = this.canvas;
    const { width, height } = canvas;
    const sample = 40;
    let transparent = 0;
    let total = 0;
    try {
      const data = ctx.getImageData(0, 0, width, height).data;
      const stepX = Math.max(1, Math.floor(width / sample));
      const stepY = Math.max(1, Math.floor(height / sample));
      for (let y = 0; y < height; y += stepY) {
        for (let x = 0; x < width; x += stepX) {
          const alpha = data[(y * width + x) * 4 + 3];
          total++;
          if (alpha < 40) transparent++;
        }
      }
      if (total && transparent / total >= 0.55) {
        this.reveal();
      }
    } catch {
      /* cross-origin / security — ignore */
    }
    // Reset stroke tracking when checking
    this._lx = null;
    this._ly = null;
  },

  reveal() {
    if (this.revealed) return;
    this.revealed = true;
    this.card?.classList.add("is-revealed");
    this.canvas.style.opacity = "0";
    setTimeout(() => {
      if (this.canvas) this.canvas.style.pointerEvents = "none";
    }, 600);
    celebrate();
  },
};

function celebrate() {
  const layer = $("#celebration");
  if (!layer || prefersReducedMotion()) return;
  const icons = ["🎉", "❤️", "✨", "🎊", "💖", "⭐", "🌸"];
  for (let i = 0; i < 30; i++) {
    const el = document.createElement("span");
    el.className = "celebration__piece";
    el.textContent = icons[i % icons.length];
    el.style.left = "50%";
    el.style.top = "45%";
    el.style.setProperty("--tx", `${(Math.random() - 0.5) * 600}px`);
    el.style.setProperty("--ty", `${(Math.random() - 0.5) * 500}px`);
    el.style.animationDelay = `${Math.random() * 0.3}s`;
    layer.appendChild(el);
    setTimeout(() => el.remove(), 2200);
  }
}

/* ============================================================
   COUNTDOWN
   ============================================================ */

const Countdown = {
  init() {
    this.target = new Date(INVITATION.event.dateISO).getTime();
    this.tick();
    this.interval = setInterval(() => this.tick(), 1000);
  },

  tick() {
    const now = Date.now();
    let diff = this.target - now;
    const done = $("#countdown-done");
    const grid = $("#countdown-grid");

    if (diff <= 0) {
      clearInterval(this.interval);
      $("#cd-days").textContent = "00";
      $("#cd-hours").textContent = "00";
      $("#cd-mins").textContent = "00";
      $("#cd-secs").textContent = "00";
      if (done) {
        done.hidden = false;
      }
      if (grid) grid.setAttribute("aria-label", "It's Celebration Time!");
      return;
    }

    const days = Math.floor(diff / 86400000);
    diff %= 86400000;
    const hours = Math.floor(diff / 3600000);
    diff %= 3600000;
    const mins = Math.floor(diff / 60000);
    diff %= 60000;
    const secs = Math.floor(diff / 1000);

    $("#cd-days").textContent = String(days).padStart(2, "0");
    $("#cd-hours").textContent = String(hours).padStart(2, "0");
    $("#cd-mins").textContent = String(mins).padStart(2, "0");
    $("#cd-secs").textContent = String(secs).padStart(2, "0");
  },
};

/* ============================================================
   FLOATING DECORATIONS
   ============================================================ */

const Decorations = {
  init() {
    const layer = $("#decorations");
    if (!layer || prefersReducedMotion()) return;

    const icons = ["❤️", "💕", "✨", "🌸", "🦋", "🌺", "✦", "🕊️"];
    const count = 14;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "decor";
      el.textContent = icons[i % icons.length];
      el.style.left = `${Math.random() * 100}%`;
      el.style.fontSize = `${0.7 + Math.random() * 0.8}rem`;
      el.style.animationDuration = `${12 + Math.random() * 18}s`;
      el.style.animationDelay = `${Math.random() * 10}s`;
      layer.appendChild(el);
    }
  },
};

/* ============================================================
   MUSIC PLAYER
   ============================================================ */

const MusicPlayer = {
  init() {
    const audio = $("#bg-audio");
    const toggle = $("#music-toggle");
    const volume = $("#music-volume");
    if (!audio || !toggle) return;

    audio.muted = true;

    toggle.addEventListener("click", async () => {
      try {
        if (audio.paused || audio.muted) {
          audio.muted = false;
          await audio.play();
          toggle.classList.add("is-playing");
          toggle.setAttribute("aria-pressed", "true");
          toggle.setAttribute("aria-label", "Pause background music");
        } else {
          audio.pause();
          toggle.classList.remove("is-playing");
          toggle.setAttribute("aria-pressed", "false");
          toggle.setAttribute("aria-label", "Play background music");
        }
      } catch {
        /* autoplay policies — user can retry */
      }
    });

    volume?.addEventListener("input", () => {
      audio.volume = parseFloat(volume.value);
      if (audio.volume > 0 && audio.muted) {
        audio.muted = false;
      }
    });
  },
};

/* ============================================================
   BOOT
   ============================================================ */

document.addEventListener("DOMContentLoaded", async () => {
  initFromConfig();
  Decorations.init();
  MusicPlayer.init();
  FlipCard.init();
  ScratchCard.init();
  Countdown.init();
  StoryController.init();

  await Loader.start();

  // Re-init scroll reveal after loader (hero already in view)
  ScrollReveal.init();
  // Hero animations kick in once loader is gone
  $$("#landing [data-animate]").forEach((el, i) => {
    setTimeout(() => el.classList.add("is-visible"), prefersReducedMotion() ? 0 : 200 + i * 200);
  });
});
