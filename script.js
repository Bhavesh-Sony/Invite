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
    tagline: "Classy, Responsible & Family ki Unofficial Manager",
    childhoodPhoto: "picss/bhavisha_new.png",
    /** Face high so chin/neck meet the blouse; eyes near upper third. */
    photoPosition: "50% 45%",
  },

  groom: {
    name: "Bhavesh",
    title: "Ghar ka Chota Beta",
    tagline: "Calm, Funny & Everyone's Favorite",
    childhoodPhoto: "picss/bhavesh_new.png",
    /** Match eye line with Bhavisha in outfit frames. */
    photoPosition: "50% 45%",
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

  monogram: "picss/monogram.png",
  familyPhoto: "picss/family_photo.jpeg",
  footerSignature: "Rajani's & Sony's",

  reel: {
    collagePhoto: "picss/kids_holding_hands.png",
    brideOutfit: "picss/bhavisha_new.png",
    groomOutfit: "picss/bhavesh_new.png",
    cameraPhoto: "picss/reel/camera-cropped.png",
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
      title: "Destiny Was Waiting",
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
  const monogram = $("#hero-monogram");
  if (monogram) monogram.src = INVITATION.monogram;

  // Childhood reel photos, outfits, and copy
  setReelPhotos("bride", bride);
  setReelPhotos("groom", groom);
  $$(`[data-reel-outfit="bride"]`).forEach((img) => {
    img.src = INVITATION.reel.brideOutfit;
  });
  $$(`[data-reel-outfit="groom"]`).forEach((img) => {
    img.src = INVITATION.reel.groomOutfit;
  });
  const collagePhoto = $("#reel-collage-photo");
  if (collagePhoto) collagePhoto.src = INVITATION.reel.collagePhoto;
  const cameraImg = $("#reel-camera-img");
  if (cameraImg) cameraImg.src = INVITATION.reel.cameraPhoto;
  $("#reel-bride-title").textContent = bride.title;
  $("#reel-bride-tagline").textContent = bride.tagline;
  $("#reel-groom-title").textContent = groom.title;
  $("#reel-groom-tagline").textContent = groom.tagline;
  $("#poster-names").textContent = `${bride.name} & ${groom.name}`;

  // Invitation card (static — no names on the card)
  $("#invite-message").textContent = INVITATION.invitationMessage;

  // Scratch reveal
  $("#scratch-date").textContent = event.date;
  $("#scratch-time").textContent = event.time;
  $("#scratch-venue").textContent = event.venue;
  $("#scratch-address").textContent = event.address;

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
    footerNames.textContent = INVITATION.footerSignature;
  }
  const familyPhoto = $("#family-photo");
  if (familyPhoto) familyPhoto.src = INVITATION.familyPhoto;

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
      INVITATION.reel.brideOutfit,
      INVITATION.reel.groomOutfit,
      INVITATION.reel.cameraPhoto,
      INVITATION.monogram,
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
  onComplete: null,

  init() {
    this.scenes = $$(".reel-scene");
    $("#story-skip")?.addEventListener("click", () => this.skip());
    $("#story-replay")?.addEventListener("click", () => {
      JourneyController.cancelTail();
      this.play({ advanceJourney: false });
    });

    if (prefersReducedMotion()) {
      this.showPoster();
    }
  },

  skip() {
    this.runId++;
    this.running = false;
    this.hasPlayed = true;
    this.showPoster();
    this.notifyComplete();
  },

  async play({ advanceJourney = true } = {}) {
    const id = ++this.runId;
    const timings = INVITATION.reel.timings;
    this.running = true;
    this.hasPlayed = true;
    this.setScene(null);

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
    if (advanceJourney) this.notifyComplete();
  },

  setScene(sceneId) {
    this.scenes.forEach((scene) => {
      scene.classList.remove("is-active");
      scene.setAttribute("aria-hidden", "true");
    });
    if (!sceneId) return;

    const scene = $(`#${sceneId}`);
    if (!scene) return;
    void scene.offsetWidth;
    scene.classList.add("is-active");
    scene.setAttribute("aria-hidden", "false");
  },

  showPoster() {
    this.setScene("scene-poster");
  },

  notifyComplete() {
    if (typeof this.onComplete === "function") this.onComplete();
  },
};

/* ============================================================
   AUTO SCROLL — slow, seamless, cancellable
   ============================================================ */

const AutoScroll = {
  token: 0,
  raf: null,

  cancel() {
    this.token++;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = null;
  },

  /**
   * Glide the page to targetY at a constant, readable pace.
   * @param {number} targetY  Absolute scroll position.
   * @param {number} speed    Pixels per millisecond (default ~90px/s).
   */
  to(targetY, speed = 0.09) {
    this.cancel();
    const myToken = this.token;
    const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const goal = Math.min(Math.max(0, targetY), maxY);

    return new Promise((resolve) => {
      if (Math.abs(goal - window.scrollY) < 2) return resolve(true);
      const dir = Math.sign(goal - window.scrollY);
      let last = performance.now();

      const step = (now) => {
        if (myToken !== this.token) return resolve(false);
        const dt = now - last;
        last = now;
        const next = window.scrollY + speed * dt * dir;
        if ((dir > 0 && next >= goal) || (dir < 0 && next <= goal)) {
          window.scrollTo(0, goal);
          this.raf = null;
          return resolve(true);
        }
        window.scrollTo(0, next);
        this.raf = requestAnimationFrame(step);
      };
      this.raf = requestAnimationFrame(step);
    });
  },
};

/* ============================================================
   JOURNEY CONTROLLER — staged scroll path
   ============================================================ */

const JourneyController = {
  journeyId: 0,
  started: false,
  scratchResolve: null,
  // Gentle reading pace (px/ms) for the seamless auto-scroll.
  SLOW: 0.11,
  // Brisker pace for the arrow tap that kicks off the reel.
  QUICK: 0.5,

  init() {
    const cue = $("#scroll-cue");
    cue?.addEventListener("click", (e) => {
      e.preventDefault();
      this.beginFromHero();
    });

    // Let guests take over at any time — a manual gesture stops auto-scroll.
    const takeOver = () => AutoScroll.cancel();
    window.addEventListener("wheel", takeOver, { passive: true });
    window.addEventListener("touchmove", takeOver, { passive: true });

    StoryController.onComplete = () => this.afterReel();
  },

  cancelTail() {
    this.journeyId++;
    AutoScroll.cancel();
  },

  async beginFromHero() {
    if (this.started && StoryController.running) return;
    this.started = true;
    this.cancelTail();
    const id = this.journeyId;

    await AutoScroll.to(this.topOf("#story"), this.QUICK);
    if (id !== this.journeyId) return;

    if (prefersReducedMotion()) {
      StoryController.showPoster();
      await wait(400);
      await this.afterReel();
      return;
    }

    await StoryController.play({ advanceJourney: true });
  },

  topOf(sel) {
    const el = $(sel);
    return el ? el.getBoundingClientRect().top + window.scrollY : 0;
  },

  revealWithin(sel) {
    $$(`${sel} [data-animate]`).forEach((node) => node.classList.add("is-visible"));
  },

  async afterReel() {
    const id = ++this.journeyId;
    await wait(prefersReducedMotion() ? 150 : 900);
    if (id !== this.journeyId) return;

    // Reveal the invitation + scratch content as it comes into view.
    this.revealWithin("#invite-reveal");

    if (prefersReducedMotion()) {
      $("#invite-reveal")?.scrollIntoView();
      return;
    }

    // 1) Seamlessly glide down to the invitation + scratch stage.
    await AutoScroll.to(this.topOf("#invite-reveal"), this.SLOW);
    if (id !== this.journeyId) return;

    // 2) Pause here until the guest reveals the engagement details.
    await this.waitForScratch(id);
    if (id !== this.journeyId) return;

    // Let the reveal + celebration breathe before moving on.
    await wait(1600);
    if (id !== this.journeyId) return;

    // 3) Resume the seamless scroll all the way to the footer.
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    await AutoScroll.to(maxY, this.SLOW);
  },

  waitForScratch(id) {
    if (ScratchCard.revealed) return Promise.resolve();
    return new Promise((resolve) => {
      this.scratchResolve = () => {
        if (id === this.journeyId) resolve();
      };
    });
  },

  /** Called when the guest finishes scratching. */
  onScratchRevealed() {
    if (this.scratchResolve) {
      const resolve = this.scratchResolve;
      this.scratchResolve = null;
      resolve();
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
    JourneyController.onScratchRevealed();
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

    this.audio = audio;
    this.toggle = toggle;
    audio.muted = false;

    toggle.addEventListener("click", async () => {
      try {
        if (audio.paused) {
          await this.start();
        } else {
          audio.pause();
          this.setPlayingState(false);
        }
      } catch {
        /* The visitor can retry if playback is temporarily unavailable. */
      }
    });

    volume?.addEventListener("input", () => {
      audio.volume = parseFloat(volume.value);
      audio.muted = false;
    });

    // Attempt audible autoplay. Browsers that block it will start the music
    // on the visitor's first interaction anywhere on the invitation.
    this.resumeOnGesture = (event) => {
      if (event.target instanceof Element && event.target.closest("#music-toggle")) return;
      this.start();
    };
    document.addEventListener("pointerdown", this.resumeOnGesture, true);
    document.addEventListener("keydown", this.resumeOnGesture, true);
    this.start();
  },

  async start() {
    if (!this.audio) return;
    try {
      this.audio.muted = false;
      await this.audio.play();
      this.setPlayingState(true);
      document.removeEventListener("pointerdown", this.resumeOnGesture, true);
      document.removeEventListener("keydown", this.resumeOnGesture, true);
    } catch {
      this.setPlayingState(false);
    }
  },

  setPlayingState(isPlaying) {
    if (!this.toggle) return;
    this.toggle.classList.toggle("is-playing", isPlaying);
    this.toggle.setAttribute("aria-pressed", String(isPlaying));
    this.toggle.setAttribute(
      "aria-label",
      isPlaying ? "Pause background music" : "Play background music"
    );
  },
};

/* ============================================================
   BOOT
   ============================================================ */

document.addEventListener("DOMContentLoaded", async () => {
  initFromConfig();
  Decorations.init();
  MusicPlayer.init();
  ScratchCard.init();
  Countdown.init();
  StoryController.init();
  JourneyController.init();

  await Loader.start();
  MusicPlayer.start();

  ScrollReveal.init();
  $$("#landing [data-animate]").forEach((el, i) => {
    setTimeout(() => el.classList.add("is-visible"), prefersReducedMotion() ? 0 : 200 + i * 200);
  });
});
