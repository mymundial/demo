"use strict";

const CATEGORY_STYLES = {
  relationships: { hex: "#b52f3a", rgb: "181 47 58", label: "Relationships", tone: 196.0 },
  action: { hex: "#d26a2e", rgb: "210 106 46", label: "Action", tone: 220.0 },
  opportunity: { hex: "#d5a83c", rgb: "213 168 60", label: "Opportunity", tone: 261.63 },
  reflection: { hex: "#3f6fa8", rgb: "63 111 168", label: "Reflection", tone: 174.61 },
  change: { hex: "#7652a8", rgb: "118 82 168", label: "Change", tone: 233.08 },
  warning: { hex: "#6f8e45", rgb: "111 142 69", label: "Warning", tone: 146.83 },
  courage: { hex: "#e5cc83", rgb: "229 204 131", label: "Courage", tone: 293.66 },
  routine: { hex: "#68758c", rgb: "104 117 140", label: "Routine", tone: 164.81 }
};

const FORTUNE_GROUPS = {
  relationships: [
    "Someone is waiting for your ordinary gesture.",
    "A neglected friendship will soon ask for attention.",
    "Your silence has been mistaken for agreement.",
    "One honest reply will end a long uncertainty.",
    "A distant person remembers more than you expect.",
    "An apology will cost less than continued distance.",
    "Someone close needs clarity, not reassurance.",
    "A familiar name will return with unfamiliar news.",
    "You are protecting pride at the expense of closeness.",
    "A small kindness will travel farther than intended.",
    "The conversation you avoid already shapes the relationship.",
    "Someone values your presence more than your usefulness."
  ],
  action: [
    "You are at risk of becoming too sedentary.",
    "Movement will restore what routine has dulled.",
    "You have prepared long enough. Begin now.",
    "The next step is clear, though inconvenient.",
    "A short journey will alter a long opinion.",
    "One unfinished task is draining your attention.",
    "Act before the simple choice becomes complicated.",
    "Your next useful idea will arrive while moving.",
    "Repair the small fault before replacing everything.",
    "Today rewards motion more than planning.",
    "A change of pace will outperform greater effort.",
    "Do one physical thing before making the decision."
  ],
  opportunity: [
    "A quiet opportunity will arrive before a loud one.",
    "An old interest is ready to become useful.",
    "A forgotten skill will solve a new problem.",
    "An ordinary place will soon become important.",
    "Something saved for later is needed now.",
    "A rejected path deserves one careful second look.",
    "Your next gain will come from simplifying.",
    "A useful connection begins with an unimportant conversation.",
    "Look again at what appeared too small.",
    "An overlooked invitation carries unexpected value.",
    "The useful opening will not announce itself.",
    "What seems accidental may deserve deliberate attention."
  ],
  reflection: [
    "Rest is needed. Isolation is not.",
    "Your attention is being spent where it is not required.",
    "The waiting time is not wasted. Use it well.",
    "Your best answer will be shorter than expected.",
    "One quiet morning will solve a noisy problem.",
    "Your body has noticed what your mind postpones.",
    "The truth is less dramatic and more useful.",
    "A temporary condition is not your identity.",
    "One night of genuine rest will clarify the answer.",
    "Your hesitation contains information. Listen before choosing.",
    "Step back before adding another solution.",
    "A slower answer will prove more accurate."
  ],
  change: [
    "You have outgrown a habit that still owns your time.",
    "A useful ending is approaching. Let it end.",
    "Comfort is becoming more expensive than change.",
    "Something finished still has one lesson remaining.",
    "A familiar problem requires an unfamiliar response.",
    "Remove something before acquiring something else.",
    "A private ambition has grown too large to hide.",
    "Change one ordinary thing tomorrow.",
    "You are nearer to a beginning than an ending.",
    "The old arrangement no longer fits the new need.",
    "Release what only survives through repetition.",
    "A small departure will reveal the larger direction."
  ],
  warning: [
    "Your caution is beginning to resemble fear.",
    "A delayed decision is quietly growing larger.",
    "Do not confuse familiarity with safety.",
    "Something you envy carries an unseen cost.",
    "A pleasant distraction is becoming an obligation.",
    "A minor repair will prevent a larger inconvenience.",
    "You are carrying responsibility nobody gave you.",
    "Bad timing may be fortunate protection.",
    "One ignored detail will soon demand attention.",
    "Your certainty is hiding an untested assumption.",
    "The easier route has a cost you have missed.",
    "A promise made casually is becoming serious."
  ],
  courage: [
    "You are waiting for permission that will never arrive.",
    "A small act of courage will prevent regret.",
    "Saying no will soon protect something important.",
    "Ask clearly. Hinting has cost enough time.",
    "Stop trying to please an absent audience.",
    "Choose the relief, not the applause.",
    "A small boundary will protect a larger freedom.",
    "Your instinct was right. Your timing was not.",
    "Speak before silence becomes your answer.",
    "The difficult truth will simplify the next step.",
    "You already know which choice requires courage.",
    "Confidence will follow action, not precede it."
  ],
  routine: [
    "You have mistaken stillness for patience.",
    "Comfort has begun making your choices for you.",
    "The habit you defend deserves examination.",
    "You are spending energy on an already-made decision.",
    "Consistency will matter more than intensity.",
    "One room contains too much unfinished business.",
    "Your surroundings are asking for one deliberate change.",
    "Remove one unnecessary part from your plan.",
    "Repetition is hiding a choice you could change.",
    "Your routine needs interruption, not abandonment.",
    "The familiar method is no longer the efficient one.",
    "What once helped you now merely occupies time."
  ]
};

const FORTUNES = Object.entries(FORTUNE_GROUPS).flatMap(([category, texts]) =>
  texts.map((text, index) => ({
    id: `${category}-${String(index + 1).padStart(2, "0")}`,
    category,
    text,
    weight: 1,
    enabled: true
  }))
);

const app = document.getElementById("app");
const awakenButton = document.getElementById("awakenButton");
const statusText = document.getElementById("statusText");
const paperWindow = document.getElementById("paperWindow");
const fortuneText = document.getElementById("fortuneText");
const fortuneDate = document.getElementById("fortuneDate");
const resultActions = document.getElementById("resultActions");
const againButton = document.getElementById("againButton");
const saveButton = document.getElementById("saveButton");
const shareButton = document.getElementById("shareButton");
const soundButton = document.getElementById("soundButton");
const soundIcon = document.getElementById("soundIcon");
const infoButton = document.getElementById("infoButton");
const aboutDialog = document.getElementById("aboutDialog");
const closeDialogButton = document.getElementById("closeDialogButton");
const dialogActionButton = document.getElementById("dialogActionButton");
const motionButton = document.getElementById("motionButton");
const motionStatus = document.getElementById("motionStatus");
const toast = document.getElementById("toast");
const loadingVeil = document.getElementById("loadingVeil");
const fortunePaper = document.getElementById("fortunePaper");

const RECENT_KEY = "stone-oracle-recent-v21";
const SOUND_KEY = "stone-oracle-sound-v21";
const HISTORY_KEY = "stone-oracle-history-v21";
const MOTION_KEY = "stone-oracle-motion-v21";

const TIMINGS = {
  full: { awakening: 760, gathering: 1180, inhaling: 570, exhaling: 1080, revealing: 820 },
  reduced: { awakening: 260, gathering: 360, inhaling: 180, exhaling: 340, revealing: 220 }
};

let state = "idle";
let currentFortune = null;
let soundOn = localStorage.getItem(SOUND_KEY) !== "off";
let motionMode = localStorage.getItem(MOTION_KEY) ||
  (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "reduced" : "full");
let audioContext = null;
let toastTimer = null;
let actionBusy = false;
let awakeReadyPromise = Promise.resolve();
let explicitMotionPreference = localStorage.getItem(MOTION_KEY) !== null;

function setState(nextState) {
  state = nextState;
  app.dataset.state = nextState;
}

function delay(ms) {
  return new Promise(resolve => window.setTimeout(resolve, ms));
}

function decodeImage(src, { priority = "auto" } = {}) {
  const image = new Image();
  image.decoding = "async";
  image.fetchPriority = priority;
  image.src = src;
  return image.decode().then(() => image);
}

function detectPerformanceMode() {
  const params = new URLSearchParams(location.search);
  const forced = params.get("performance");
  if (forced === "lite" || forced === "full") return forced;

  const lowMemory = Number.isFinite(navigator.deviceMemory) && navigator.deviceMemory <= 4;
  const lowConcurrency = Number.isFinite(navigator.hardwareConcurrency) && navigator.hardwareConcurrency <= 4;
  const saveData = navigator.connection?.saveData === true;
  return lowMemory || lowConcurrency || saveData ? "lite" : "full";
}

async function prepareSceneAssets() {
  awakenButton.disabled = true;
  app.dataset.performance = detectPerformanceMode();

  const sleepingReady = decodeImage("assets/oracle-sleeping.webp", { priority: "high" });
  awakeReadyPromise = decodeImage("assets/oracle-awake.webp").catch(() => null);

  await Promise.race([sleepingReady.catch(() => null), delay(2600)]);
  app.dataset.ready = "ready";
  loadingVeil.setAttribute("aria-hidden", "true");
  awakenButton.disabled = false;
}

function isReducedMotion() {
  return motionMode === "reduced";
}

function applyMotionPreference() {
  app.dataset.motion = motionMode;
  const reduced = isReducedMotion();
  motionButton.setAttribute("aria-pressed", String(reduced));
  motionButton.textContent = reduced ? "Reduced" : "Full";
  motionStatus.textContent = reduced
    ? "Smoke and movement are replaced with gentle fades."
    : "Stone movement, smoke and ceremonial transitions are enabled.";
}

function haptic(pattern) {
  if (navigator.vibrate && !isReducedMotion()) navigator.vibrate(pattern);
}

function getRecentFortunes() {
  try {
    const data = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function weightedRandom(items) {
  const total = items.reduce((sum, item) => sum + (item.weight || 1), 0);
  let cursor = Math.random() * total;
  for (const item of items) {
    cursor -= item.weight || 1;
    if (cursor <= 0) return item;
  }
  return items.at(-1);
}

function chooseFortune() {
  const recent = getRecentFortunes();
  const recentIds = recent.slice(0, 12).map(item => item.id);
  const lastCategory = recent[0]?.category;
  const categoryCounts = recent.slice(0, 8).reduce((counts, item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
    return counts;
  }, {});

  let eligible = FORTUNES.filter(item =>
    item.enabled &&
    !recentIds.includes(item.id) &&
    item.category !== lastCategory &&
    (categoryCounts[item.category] || 0) < 3
  );

  if (!eligible.length) {
    eligible = FORTUNES.filter(item =>
      item.enabled && !recentIds.includes(item.id) && item.category !== lastCategory
    );
  }

  if (!eligible.length) {
    eligible = FORTUNES.filter(item => item.enabled && !recentIds.includes(item.id));
  }

  if (!eligible.length) eligible = FORTUNES.filter(item => item.enabled);

  const selected = weightedRandom(eligible);
  const nextRecent = [
    { id: selected.id, category: selected.category },
    ...recent.filter(item => item.id !== selected.id)
  ].slice(0, 18);

  localStorage.setItem(RECENT_KEY, JSON.stringify(nextRecent));
  return selected;
}

function applyCategory(category) {
  const style = CATEGORY_STYLES[category] || CATEGORY_STYLES.reflection;
  app.dataset.category = category;
  app.style.setProperty("--category", style.hex);
  app.style.setProperty("--category-rgb", style.rgb);
}

function recordFortune(fortune) {
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    history = [];
  }

  history.unshift({
    id: fortune.id,
    text: fortune.text,
    category: fortune.category,
    date: new Date().toISOString()
  });

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 30)));
}

function formatDate(date = new Date()) {
  return new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date).toUpperCase();
}

function getAudioContext() {
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) audioContext = new AudioCtx();
  }
  return audioContext;
}

function makeNoiseBuffer(ctx, seconds = 1) {
  const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * seconds), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) {
    data[index] = (Math.random() * 2 - 1) * (1 - index / data.length);
  }
  return buffer;
}

function safeAudio(callback) {
  if (!soundOn) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  try { callback(ctx); } catch { /* Audio remains optional. */ }
}

function playStoneAwakening() {
  safeAudio(ctx => {
    const now = ctx.currentTime;

    const impact = ctx.createOscillator();
    const impactGain = ctx.createGain();
    impact.type = "sine";
    impact.frequency.setValueAtTime(72, now);
    impact.frequency.exponentialRampToValueAtTime(31, now + .42);
    impactGain.gain.setValueAtTime(.0001, now);
    impactGain.gain.exponentialRampToValueAtTime(.22, now + .018);
    impactGain.gain.exponentialRampToValueAtTime(.0001, now + .52);
    impact.connect(impactGain).connect(ctx.destination);
    impact.start(now);
    impact.stop(now + .55);

    const rumble = ctx.createOscillator();
    const rumbleFilter = ctx.createBiquadFilter();
    const rumbleGain = ctx.createGain();
    rumble.type = "sawtooth";
    rumble.frequency.setValueAtTime(46, now + .06);
    rumble.frequency.exponentialRampToValueAtTime(27, now + 2.85);
    rumbleFilter.type = "lowpass";
    rumbleFilter.frequency.setValueAtTime(125, now);
    rumbleFilter.frequency.exponentialRampToValueAtTime(62, now + 2.8);
    rumbleGain.gain.setValueAtTime(.0001, now);
    rumbleGain.gain.exponentialRampToValueAtTime(.075, now + .28);
    rumbleGain.gain.exponentialRampToValueAtTime(.0001, now + 2.9);
    rumble.connect(rumbleFilter).connect(rumbleGain).connect(ctx.destination);
    rumble.start(now + .04);
    rumble.stop(now + 2.95);
  });
}

function playGatheringBreath() {
  safeAudio(ctx => {
    const now = ctx.currentTime;
    const source = ctx.createBufferSource();
    const lowpass = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    source.buffer = makeNoiseBuffer(ctx, 1.45);
    lowpass.type = "lowpass";
    lowpass.frequency.setValueAtTime(420, now);
    lowpass.frequency.exponentialRampToValueAtTime(760, now + 1.2);
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(.026, now + .44);
    gain.gain.setValueAtTime(.026, now + .88);
    gain.gain.exponentialRampToValueAtTime(.0001, now + 1.34);
    source.connect(lowpass).connect(gain).connect(ctx.destination);
    source.start(now);
  });
}

function playInhaleBreath() {
  safeAudio(ctx => {
    const now = ctx.currentTime;
    const source = ctx.createBufferSource();
    const bandpass = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    source.buffer = makeNoiseBuffer(ctx, .72);
    bandpass.type = "bandpass";
    bandpass.frequency.setValueAtTime(290, now);
    bandpass.frequency.exponentialRampToValueAtTime(1180, now + .56);
    bandpass.Q.value = .7;
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(.052, now + .38);
    gain.gain.exponentialRampToValueAtTime(.0001, now + .66);
    source.connect(bandpass).connect(gain).connect(ctx.destination);
    source.start(now);
  });
}

function playExhaleBreath() {
  safeAudio(ctx => {
    const now = ctx.currentTime;
    const source = ctx.createBufferSource();
    const bandpass = ctx.createBiquadFilter();
    const lowpass = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    source.buffer = makeNoiseBuffer(ctx, 1.6);
    bandpass.type = "bandpass";
    bandpass.frequency.setValueAtTime(950, now);
    bandpass.frequency.exponentialRampToValueAtTime(310, now + 1.34);
    bandpass.Q.value = .48;
    lowpass.type = "lowpass";
    lowpass.frequency.value = 1750;
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(.062, now + .12);
    gain.gain.setValueAtTime(.058, now + .54);
    gain.gain.exponentialRampToValueAtTime(.0001, now + 1.47);
    source.connect(bandpass).connect(lowpass).connect(gain).connect(ctx.destination);
    source.start(now);
  });
}

function playPaperReveal() {
  safeAudio(ctx => {
    const now = ctx.currentTime;
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    source.buffer = makeNoiseBuffer(ctx, .9);
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1450, now);
    filter.frequency.exponentialRampToValueAtTime(780, now + .72);
    filter.Q.value = .42;
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(.047, now + .09);
    gain.gain.exponentialRampToValueAtTime(.0001, now + .82);
    source.connect(filter).connect(gain).connect(ctx.destination);
    source.start(now);
  });
}

function playOracleSeal(category) {
  safeAudio(ctx => {
    const now = ctx.currentTime;
    const root = CATEGORY_STYLES[category]?.tone || 196;
    [root, root * 1.5, root * 2].forEach((frequency, index) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = index === 0 ? "sine" : "triangle";
      oscillator.frequency.value = frequency;
      const start = now + index * .09;
      gain.gain.setValueAtTime(.0001, start);
      gain.gain.exponentialRampToValueAtTime(index === 0 ? .035 : .018, start + .045);
      gain.gain.exponentialRampToValueAtTime(.0001, start + .95 + index * .12);
      oscillator.connect(gain).connect(ctx.destination);
      oscillator.start(start);
      oscillator.stop(start + 1.12);
    });
  });
}

function playToggleTick() {
  safeAudio(ctx => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    oscillator.type = "sine";
    oscillator.frequency.value = 390;
    gain.gain.setValueAtTime(.02, now);
    gain.gain.exponentialRampToValueAtTime(.0001, now + .12);
    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + .13);
  });
}

function updateSoundButton() {
  soundButton.setAttribute("aria-pressed", String(soundOn));
  soundButton.setAttribute("aria-label", soundOn ? "Turn sound off" : "Turn sound on");
  soundIcon.textContent = soundOn ? "♪" : "×";
}

function setStatus(text) {
  statusText.textContent = text;
}

function setActionBusy(isBusy) {
  actionBusy = isBusy;
  saveButton.disabled = isBusy;
  shareButton.disabled = isBusy;
  againButton.disabled = isBusy;
  resultActions.setAttribute("aria-busy", String(isBusy));
}

async function awakenOracle() {
  if (state !== "idle" || app.dataset.ready !== "ready") return;

  currentFortune = chooseFortune();
  applyCategory(currentFortune.category);
  fortuneText.textContent = currentFortune.text;
  fortuneDate.textContent = formatDate();
  paperWindow.setAttribute("aria-hidden", "true");
  resultActions.setAttribute("aria-hidden", "true");
  awakenButton.disabled = true;

  const timing = isReducedMotion() ? TIMINGS.reduced : TIMINGS.full;

  setStatus("The stone is stirring");
  haptic(18);
  await Promise.race([awakeReadyPromise, delay(220)]);
  setState("awakening");
  playStoneAwakening();
  haptic([28, 34, 54]);

  await delay(timing.awakening);
  setState("gathering");
  setStatus("The smoke gathers");
  playGatheringBreath();
  haptic(12);

  await delay(timing.gathering);
  setState("inhaling");
  setStatus("The stone draws breath");
  playInhaleBreath();
  haptic([10, 28, 14]);

  await delay(timing.inhaling);
  setState("exhaling");
  setStatus("The oracle exhales");
  playExhaleBreath();
  haptic([20, 30, 42]);

  await delay(timing.exhaling);
  setStatus("");
  setState("revealing");
  playPaperReveal();
  haptic([18, 36, 24]);

  await delay(timing.revealing);
  setState("revealed");
  paperWindow.setAttribute("aria-hidden", "false");
  resultActions.setAttribute("aria-hidden", "false");
  recordFortune(currentFortune);
  playOracleSeal(currentFortune.category);
  fortunePaper.focus({ preventScroll: true });
}

async function resetOracle() {
  if (state !== "revealed" || actionBusy) return;

  const returnFocus = document.activeElement === againButton;
  setState("resetting");
  resultActions.setAttribute("aria-hidden", "true");
  await delay(isReducedMotion() ? 150 : 560);

  currentFortune = null;
  fortuneText.textContent = "";
  paperWindow.setAttribute("aria-hidden", "true");
  applyCategory("reflection");
  setState("idle");
  awakenButton.disabled = false;
  if (returnFocus) awakenButton.focus({ preventScroll: true });
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 1900);
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawTrackedText(ctx, text, centerX, y, tracking) {
  const glyphs = [...text];
  const widths = glyphs.map(glyph => ctx.measureText(glyph).width);
  const totalWidth = widths.reduce((sum, width) => sum + width, 0) + tracking * Math.max(0, glyphs.length - 1);
  let x = centerX - totalWidth / 2;
  glyphs.forEach((glyph, index) => {
    ctx.fillText(glyph, x, y);
    x += widths[index] + tracking;
  });
}

function parchmentPath(x, y, width, height, inset = 0) {
  const left = x + inset;
  const top = y + inset;
  const right = x + width - inset;
  const bottom = y + height - inset;
  const path = new Path2D();
  path.moveTo(left + 25, top + 2);
  path.bezierCurveTo(left + width * .18, top - 2, left + width * .31, top + 4, left + width * .48, top + 1);
  path.bezierCurveTo(left + width * .66, top - 2, left + width * .82, top + 4, right - 23, top + 2);
  path.quadraticCurveTo(right + 1, top + 7, right - 1, top + 28);
  path.bezierCurveTo(right + 2, top + height * .25, right - 2, top + height * .50, right + 1, bottom - 28);
  path.quadraticCurveTo(right - 2, bottom - 5, right - 24, bottom - 2);
  path.bezierCurveTo(left + width * .82, bottom + 3, left + width * .67, bottom - 3, left + width * .49, bottom);
  path.bezierCurveTo(left + width * .31, bottom + 3, left + width * .17, bottom - 3, left + 24, bottom - 1);
  path.quadraticCurveTo(left - 1, bottom - 7, left + 1, bottom - 29);
  path.bezierCurveTo(left - 2, top + height * .73, left + 2, top + height * .42, left, top + 29);
  path.quadraticCurveTo(left + 1, top + 7, left + 25, top + 2);
  path.closePath();
  return path;
}

function drawExportCorner(ctx, x, y, flipX, flipY) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(flipX, flipY);
  ctx.strokeStyle = "rgba(87, 54, 24, .72)";
  ctx.fillStyle = "rgba(87, 54, 24, .72)";
  ctx.lineWidth = 1.7;
  ctx.beginPath();
  ctx.moveTo(0, 34);
  ctx.lineTo(0, 0);
  ctx.lineTo(34, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(7, 7);
  ctx.lineTo(14, 7);
  ctx.lineTo(7, 14);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.arc(7, 7, 2.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawExportRosette(ctx, centerX, centerY, accent) {
  ctx.save();
  ctx.translate(centerX, centerY);

  ctx.fillStyle = "rgba(225, 204, 158, .92)";
  ctx.strokeStyle = "rgba(86, 52, 23, .78)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "rgba(86, 52, 23, .34)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, 22, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = accent;
  ctx.globalAlpha = .82;
  ctx.beginPath();
  const points = 16;
  for (let index = 0; index < points; index += 1) {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / points;
    const radius = index % 2 === 0 ? 15 : 7;
    const px = Math.cos(angle) * radius;
    const py = Math.sin(angle) * radius;
    if (index === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();

  ctx.globalAlpha = 1;
  ctx.fillStyle = "#f1ddb0";
  ctx.beginPath();
  ctx.arc(0, 0, 3.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawPaperGrain(ctx, x, y, width, height) {
  ctx.save();
  ctx.globalAlpha = .09;
  for (let index = 0; index < 420; index += 1) {
    const px = x + 16 + Math.random() * (width - 32);
    const py = y + 13 + Math.random() * (height - 26);
    const radius = Math.random() * 1.2 + .25;
    ctx.fillStyle = index % 3 === 0 ? "#fff8dd" : "#5c3518";
    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

async function createFortuneBlob() {
  if (!currentFortune) return null;

  const image = new Image();
  image.src = "assets/oracle-awake.webp";
  await image.decode();

  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");

  const sourceRatio = image.width / image.height;
  const targetRatio = canvas.width / canvas.height;
  let sx = 0;
  let sy = 0;
  let sw = image.width;
  let sh = image.height;

  if (sourceRatio < targetRatio) {
    sh = image.width / targetRatio;
    sy = (image.height - sh) * .18;
  } else {
    sw = image.height * targetRatio;
    sx = (image.width - sw) / 2;
  }

  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

  const shade = ctx.createLinearGradient(0, 0, 0, canvas.height);
  shade.addColorStop(0, "rgba(0,0,0,.10)");
  shade.addColorStop(.48, "rgba(0,0,0,.13)");
  shade.addColorStop(.72, "rgba(0,0,0,.42)");
  shade.addColorStop(1, "rgba(0,0,0,.94)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const categoryStyle = CATEGORY_STYLES[currentFortune.category];

  // Category colour remains a supernatural accent, not a modern frame colour.
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  [[354, 382], [726, 382]].forEach(([eyeX, eyeY]) => {
    const eyeGlow = ctx.createRadialGradient(eyeX, eyeY, 8, eyeX, eyeY, 118);
    eyeGlow.addColorStop(0, `${categoryStyle.hex}88`);
    eyeGlow.addColorStop(.28, `${categoryStyle.hex}62`);
    eyeGlow.addColorStop(.58, `${categoryStyle.hex}28`);
    eyeGlow.addColorStop(1, "transparent");
    ctx.fillStyle = eyeGlow;
    ctx.fillRect(eyeX - 132, eyeY - 132, 264, 264);
  });
  ctx.restore();

  const x = 58;
  const y = 828;
  const width = 964;
  const height = 438;
  const outerPath = parchmentPath(x, y, width, height);

  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, .78)";
  ctx.shadowBlur = 42;
  ctx.shadowOffsetY = 18;
  const paperGradient = ctx.createLinearGradient(x, y, x + width, y + height);
  paperGradient.addColorStop(0, "#bea06f");
  paperGradient.addColorStop(.12, "#e3cfa5");
  paperGradient.addColorStop(.52, "#dcc394");
  paperGradient.addColorStop(.86, "#c5a671");
  paperGradient.addColorStop(1, "#a98253");
  ctx.fillStyle = paperGradient;
  ctx.fill(outerPath);
  ctx.restore();

  ctx.save();
  ctx.clip(outerPath);
  const paperLight = ctx.createRadialGradient(x + 210, y + 70, 20, x + 210, y + 70, 430);
  paperLight.addColorStop(0, "rgba(255, 252, 229, .40)");
  paperLight.addColorStop(1, "transparent");
  ctx.fillStyle = paperLight;
  ctx.fillRect(x, y, width, height);

  const paperPatina = ctx.createRadialGradient(x + width * .78, y + height * .78, 20, x + width * .78, y + height * .78, 420);
  paperPatina.addColorStop(0, "rgba(83, 43, 15, .16)");
  paperPatina.addColorStop(1, "transparent");
  ctx.fillStyle = paperPatina;
  ctx.fillRect(x, y, width, height);
  drawPaperGrain(ctx, x, y, width, height);
  ctx.restore();

  // Engraved, period-inspired double frame.
  ctx.strokeStyle = "rgba(72, 43, 18, .90)";
  ctx.lineWidth = 4;
  ctx.stroke(outerPath);

  const innerPath = parchmentPath(x, y, width, height, 17);
  ctx.strokeStyle = "rgba(101, 66, 30, .74)";
  ctx.lineWidth = 1.8;
  ctx.stroke(innerPath);

  const hairlinePath = parchmentPath(x, y, width, height, 25);
  ctx.strokeStyle = "rgba(121, 82, 39, .36)";
  ctx.lineWidth = 1;
  ctx.stroke(hairlinePath);

  drawExportCorner(ctx, x + 29, y + 29, 1, 1);
  drawExportCorner(ctx, x + width - 29, y + 29, -1, 1);
  drawExportCorner(ctx, x + 29, y + height - 29, 1, -1);
  drawExportCorner(ctx, x + width - 29, y + height - 29, -1, -1);

  drawExportRosette(ctx, 540, y + 52, categoryStyle.hex);

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "rgba(57, 33, 15, .92)";
  ctx.font = '600 23px "Times New Roman", Times, serif';
  drawTrackedText(ctx, "THE STONE HAS SPOKEN", 540, y + 108, 4.4);

  ctx.textAlign = "center";
  ctx.fillStyle = "#25170d";
  ctx.font = '500 50px "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif';
  const lines = wrapText(ctx, currentFortune.text, 800).slice(0, 3);
  const lineHeight = 59;
  const textBlockHeight = Math.max(1, lines.length) * lineHeight;
  const startY = y + 215 - textBlockHeight / 2 + lineHeight * .72;
  lines.forEach((line, index) => ctx.fillText(line, 540, startY + index * lineHeight));

  const ruleY = y + height - 104;
  ctx.strokeStyle = "rgba(92, 55, 23, .72)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(360, ruleY);
  ctx.lineTo(504, ruleY);
  ctx.moveTo(576, ruleY);
  ctx.lineTo(720, ruleY);
  ctx.stroke();

  ctx.save();
  ctx.translate(540, ruleY);
  ctx.rotate(Math.PI / 4);
  ctx.strokeStyle = "rgba(92, 55, 23, .82)";
  ctx.fillStyle = "rgba(220, 190, 137, .90)";
  ctx.lineWidth = 1.5;
  ctx.fillRect(-7, -7, 14, 14);
  ctx.strokeRect(-7, -7, 14, 14);
  ctx.restore();

  ctx.fillStyle = "rgba(55, 33, 16, .82)";
  ctx.font = '600 18px "Times New Roman", Times, serif';
  drawTrackedText(ctx, formatDate(), 540, y + height - 62, 2.6);

  ctx.fillStyle = "rgba(72, 43, 20, .68)";
  ctx.font = 'italic 15px "Palatino Linotype", Palatino, Georgia, serif';
  drawTrackedText(ctx, "OGNI PENSIERO VOLA  ·  THE STONE ORACLE", 540, y + height - 31, 1.8);

  return new Promise(resolve => canvas.toBlob(resolve, "image/png"));
}

async function saveFortune() {
  if (!currentFortune || actionBusy) return;
  setActionBusy(true);
  try {
    const blob = await createFortuneBlob();
    if (!blob) throw new Error("No image generated");
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `stone-oracle-${new Date().toISOString().slice(0, 10)}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1200);
    showToast("Fortune image saved");
  } catch {
    showToast("Could not create the image");
  } finally {
    setActionBusy(false);
  }
}

async function shareFortune() {
  if (!currentFortune || actionBusy) return;
  setActionBusy(true);

  const text = `The Stone Oracle says: “${currentFortune.text}”`;

  try {
    const blob = await createFortuneBlob();
    const file = blob
      ? new File([blob], "stone-oracle-fortune.png", { type: "image/png" })
      : null;

    if (file && navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        title: "The Stone Oracle",
        text,
        files: [file]
      });
      return;
    }

    if (navigator.share) {
      await navigator.share({ title: "The Stone Oracle", text });
      return;
    }

    await navigator.clipboard.writeText(text);
    showToast("Fortune copied");
  } catch (error) {
    if (error?.name !== "AbortError") {
      try {
        await navigator.clipboard.writeText(text);
        showToast("Fortune copied");
      } catch {
        showToast("Sharing is unavailable");
      }
    }
  } finally {
    setActionBusy(false);
  }
}

awakenButton.addEventListener("click", awakenOracle);
againButton.addEventListener("click", resetOracle);
saveButton.addEventListener("click", saveFortune);
shareButton.addEventListener("click", shareFortune);

soundButton.addEventListener("click", () => {
  const wasOn = soundOn;
  soundOn = !soundOn;
  localStorage.setItem(SOUND_KEY, soundOn ? "on" : "off");
  updateSoundButton();
  haptic(16);
  if (!wasOn && soundOn) playToggleTick();
});

motionButton.addEventListener("click", () => {
  explicitMotionPreference = true;
  motionMode = isReducedMotion() ? "full" : "reduced";
  localStorage.setItem(MOTION_KEY, motionMode);
  applyMotionPreference();
  haptic(15);
});

infoButton.addEventListener("click", () => aboutDialog.showModal());
closeDialogButton.addEventListener("click", () => aboutDialog.close());
dialogActionButton.addEventListener("click", () => aboutDialog.close());
aboutDialog.addEventListener("click", event => {
  if (event.target === aboutDialog) aboutDialog.close();
});

window.addEventListener("keydown", event => {
  if ((event.key === "Enter" || event.key === " ") && state === "idle" && !aboutDialog.open) {
    event.preventDefault();
    awakenOracle();
  }
});

async function initialize() {
  updateSoundButton();
  applyMotionPreference();
  applyCategory("reflection");

  const systemMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  systemMotion.addEventListener?.("change", event => {
    if (explicitMotionPreference) return;
    motionMode = event.matches ? "reduced" : "full";
    applyMotionPreference();
  });

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  }

  await prepareSceneAssets();

  const params = new URLSearchParams(location.search);
  const preview = params.get("preview");
  if (preview) {
    const previewStates = {
      gathering: "gathering",
      inhale: "inhaling",
      inhaling: "inhaling",
      smoke: "exhaling",
      exhale: "exhaling",
      exhaling: "exhaling"
    };
    const previewState = previewStates[preview] || "revealed";
    const requestedCategory = params.get("category") || (CATEGORY_STYLES[preview] ? preview : "relationships");
    const previewCategory = CATEGORY_STYLES[requestedCategory] ? requestedCategory : "relationships";
    currentFortune = FORTUNES.find(item => item.category === previewCategory) || FORTUNES[0];
    applyCategory(currentFortune.category);
    fortuneText.textContent = currentFortune.text;
    fortuneDate.textContent = formatDate();
    const showPaper = previewState === "revealed";
    resultActions.setAttribute("aria-hidden", showPaper ? "false" : "true");
    awakenButton.disabled = true;
    setState(previewState);
    paperWindow.setAttribute("aria-hidden", showPaper ? "false" : "true");
  }
}

window.addEventListener("online", () => showToast("Connection restored"));
window.addEventListener("offline", () => showToast("Offline mode active"));

initialize();
