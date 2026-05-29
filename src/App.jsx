import { useState, useEffect, useRef, useCallback } from "react";

/* ── DESIGN TOKENS ── */
const C = {
  bg: "#F4F6FA",
  surface: "#FFFFFF",
  card: "#FFFFFF",
  border: "#E2E6EF",
  accent: "#5B6AF6",
  accentDim: "rgba(91,106,246,0.10)",
  accentGlow: "rgba(91,106,246,0.30)",
  warm: "#FF6B6B",
  green: "#16A34A",
  text: "#111827",
  muted: "#6B7280",
  soft: "#4B5563",
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html,body{height:100%;overflow:hidden;}
body{background:${C.bg};color:${C.text};font-family:'Outfit',sans-serif;-webkit-font-smoothing:antialiased;}

::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:${C.border};border-radius:4px;}

.app{width:100%;height:100dvh;display:flex;flex-direction:column;overflow:hidden;position:relative;}

/* ── NAV ── */
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 20px 10px;flex-shrink:0;border-bottom:1px solid ${C.border};background:${C.surface};}
.wordmark{font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:800;letter-spacing:-1px;color:${C.text};}
.wordmark em{color:${C.accent};font-style:normal;}
.nav-back{background:${C.card};border:1px solid ${C.border};color:${C.text};padding:6px 14px;border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.82rem;cursor:pointer;display:flex;align-items:center;gap:6px;transition:all .2s;}
.nav-back:hover{border-color:${C.accent};color:${C.accent};}

/* ── SCREENS ── */
.screen{flex:1;overflow-y:auto;overflow-x:hidden;}

/* ── HOME ── */
.home-hero{padding:32px 20px 20px;position:relative;}
.home-hero h1{font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;line-height:1.1;margin-bottom:8px;}
.home-hero h1 span{color:${C.accent};}
.home-hero p{color:${C.muted};font-size:0.92rem;line-height:1.5;}

.home-cta{margin:20px;display:flex;gap:10px;}
.btn-accent{flex:1;padding:14px;border-radius:14px;border:none;background:${C.accent};color:#fff;font-family:'Outfit',sans-serif;font-size:0.95rem;font-weight:600;cursor:pointer;transition:all .2s;text-align:center;}
.btn-accent:hover{filter:brightness(1.1);transform:translateY(-1px);}
.btn-ghost{flex:1;padding:14px;border-radius:14px;border:1px solid ${C.border};background:transparent;color:${C.text};font-family:'Outfit',sans-serif;font-size:0.95rem;font-weight:500;cursor:pointer;transition:all .2s;}
.btn-ghost:hover{border-color:${C.accent};color:${C.accent};}

.section-label{padding:0 20px 10px;font-size:0.72rem;text-transform:uppercase;letter-spacing:2px;color:${C.muted};font-weight:600;}

.event-list{padding:0 20px 100px;display:flex;flex-direction:column;gap:12px;}

.event-card{background:${C.card};border:1px solid ${C.border};border-radius:16px;overflow:hidden;cursor:pointer;transition:all .2s;position:relative;box-shadow:0 2px 10px rgba(0,0,0,0.07);}
.event-card:hover{border-color:${C.accent};transform:translateY(-2px);}
.event-card-cover{width:100%;height:110px;object-fit:cover;display:block;}
.event-card-cover-placeholder{width:100%;height:110px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;background:linear-gradient(135deg,${C.bg},${C.border});}
.event-card-body{padding:14px 16px;}
.event-card-type{font-size:0.7rem;text-transform:uppercase;letter-spacing:1.5px;color:${C.accent};font-weight:600;margin-bottom:4px;}
.event-card-name{font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:700;margin-bottom:6px;}
.event-card-meta{display:flex;align-items:center;justify-content:space-between;}
.event-card-date{font-size:0.78rem;color:${C.muted};}
.event-card-count{font-size:0.78rem;color:${C.soft};background:${C.surface};padding:3px 10px;border-radius:100px;}
.event-badge{position:absolute;top:10px;right:10px;font-size:0.68rem;padding:4px 10px;border-radius:100px;font-weight:600;}
.badge-public{background:rgba(0,255,148,0.15);color:${C.green};border:1px solid rgba(0,255,148,0.3);}
.badge-private{background:rgba(107,114,128,0.2);color:${C.muted};border:1px solid ${C.border};}

/* ── CREATE EVENT ── */
.form-screen{padding:20px 20px 100px;}
.form-screen h2{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;margin-bottom:4px;}
.form-screen p{color:${C.muted};font-size:0.85rem;margin-bottom:24px;}

.form-field{margin-bottom:18px;}
.form-label{font-size:0.75rem;text-transform:uppercase;letter-spacing:1.5px;color:${C.muted};font-weight:600;margin-bottom:8px;display:block;}
.form-input{width:100%;padding:13px 16px;border-radius:12px;border:1px solid ${C.border};background:${C.card};color:${C.text};font-family:'Outfit',sans-serif;font-size:0.95rem;outline:none;transition:border-color .2s;}
.form-input:focus{border-color:${C.accent};}
.form-input::placeholder{color:${C.muted};}

.type-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
.type-btn{padding:12px 8px;border-radius:12px;border:1px solid ${C.border};background:${C.card};color:${C.soft};font-family:'Outfit',sans-serif;font-size:0.78rem;cursor:pointer;text-align:center;transition:all .2s;}
.type-btn:hover,.type-btn.active{border-color:${C.accent};background:${C.accentDim};color:${C.accent};}
.type-btn .type-icon{font-size:1.4rem;display:block;margin-bottom:4px;}

.toggle-row{display:flex;gap:10px;}
.toggle-btn{flex:1;padding:11px;border-radius:12px;border:1px solid ${C.border};background:${C.card};color:${C.soft};font-family:'Outfit',sans-serif;font-size:0.85rem;cursor:pointer;transition:all .2s;font-weight:500;}
.toggle-btn.active{border-color:${C.accent};background:${C.accentDim};color:${C.accent};}

.cover-upload{width:100%;height:120px;border-radius:12px;border:2px dashed ${C.border};background:${C.card};display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;position:relative;overflow:hidden;}
.cover-upload:hover{border-color:${C.accent};}
.cover-upload img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:10px;}
.cover-upload-label{font-size:0.85rem;color:${C.muted};margin-top:6px;}

/* ── EVENT DETAIL / FEED ── */
.feed-header{padding:16px 20px 0;flex-shrink:0;}
.feed-event-name{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:800;margin-bottom:2px;}
.feed-meta{font-size:0.8rem;color:${C.muted};margin-bottom:14px;}

.feed-tabs{display:flex;gap:4px;padding:0 20px 12px;flex-shrink:0;}
.feed-tab{padding:8px 16px;border-radius:100px;border:1px solid ${C.border};background:transparent;color:${C.muted};font-family:'Outfit',sans-serif;font-size:0.8rem;cursor:pointer;transition:all .2s;font-weight:500;}
.feed-tab.active{background:${C.accent};border-color:${C.accent};color:#fff;font-weight:600;}

.feed-grid{padding:0 20px 20px;columns:2;column-gap:10px;}
.feed-item{break-inside:avoid;margin-bottom:10px;border-radius:12px;overflow:hidden;background:${C.card};cursor:pointer;animation:pop .35s ease;position:relative;box-shadow:0 1px 6px rgba(0,0,0,0.08);}
@keyframes pop{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
.feed-item img{width:100%;display:block;}
.feed-item-meta{padding:8px 10px;display:flex;align-items:center;gap:7px;}
.feed-avatar{width:22px;height:22px;border-radius:50%;background:${C.accent};display:flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:700;color:#fff;flex-shrink:0;}
.feed-author{font-size:0.75rem;color:${C.soft};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.feed-like{position:absolute;top:8px;right:8px;background:rgba(0,0,0,.55);border:none;border-radius:100px;padding:4px 10px;font-size:0.75rem;color:#fff;cursor:pointer;backdrop-filter:blur(4px);display:flex;align-items:center;gap:4px;}
.feed-empty{padding:60px 20px;text-align:center;color:${C.muted};}
.feed-empty-icon{font-size:3rem;margin-bottom:10px;}
.feed-empty-title{font-family:'Syne',sans-serif;font-size:1.1rem;color:${C.text};margin-bottom:6px;}

/* ── BOTTOM BAR ── */
.bottom-bar{position:fixed;bottom:0;left:0;right:0;padding:10px 20px 20px;background:linear-gradient(to top,${C.bg} 70%,transparent);display:flex;align-items:center;justify-content:center;gap:12px;flex-shrink:0;}

.cam-btn{width:64px;height:64px;border-radius:50%;background:${C.accent};border:none;display:flex;align-items:center;justify-content:center;font-size:1.5rem;cursor:pointer;transition:all .2s;box-shadow:0 4px 18px ${C.accentGlow};}
.cam-btn:hover{transform:scale(1.08);}
.qr-btn{padding:12px 20px;border-radius:14px;border:1px solid ${C.border};background:${C.card};color:${C.text};font-family:'Outfit',sans-serif;font-size:0.82rem;cursor:pointer;display:flex;align-items:center;gap:7px;transition:all .2s;font-weight:500;}
.qr-btn:hover{border-color:${C.accent};color:${C.accent};}
.upload-btn{padding:12px 20px;border-radius:14px;border:1px solid ${C.border};background:${C.card};color:${C.text};font-family:'Outfit',sans-serif;font-size:0.82rem;cursor:pointer;display:flex;align-items:center;gap:7px;transition:all .2s;font-weight:500;}
.upload-btn:hover{border-color:${C.accent};color:${C.accent};}

/* ── CAMERA ── */
.camera-overlay{position:fixed;inset:0;background:#000;z-index:500;display:flex;flex-direction:column;}
.camera-view{flex:1;position:relative;overflow:hidden;}
.camera-view video{width:100%;height:100%;object-fit:cover;}
.camera-view canvas{display:none;}
.camera-controls{padding:20px 32px 40px;display:flex;align-items:center;justify-content:space-between;background:rgba(0,0,0,.8);backdrop-filter:blur(10px);}
.cam-shutter{width:72px;height:72px;border-radius:50%;border:4px solid #fff;background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .15s;}
.cam-shutter:active{transform:scale(.92);background:rgba(255,255,255,.4);}
.cam-close{background:rgba(255,255,255,.1);border:none;color:#fff;width:44px;height:44px;border-radius:50%;font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;}
.cam-flip{background:rgba(255,255,255,.1);border:none;color:#fff;width:44px;height:44px;border-radius:50%;font-size:1.1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;}
.cam-preview-overlay{position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:600;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;gap:16px;}
.cam-preview-overlay img{max-width:100%;max-height:60vh;border-radius:14px;object-fit:contain;}
.cam-preview-btns{display:flex;gap:12px;width:100%;}

/* ── QR MODAL ── */
.modal-bg{position:fixed;inset:0;background:rgba(17,24,39,0.7);z-index:400;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(6px);}
.modal-box{background:${C.card};border:1px solid ${C.border};border-radius:20px;padding:28px 24px;width:100%;max-width:360px;text-align:center;}
.modal-box h3{font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:800;margin-bottom:6px;}
.modal-box p{color:${C.muted};font-size:0.83rem;margin-bottom:20px;}
.qr-container{background:#fff;padding:16px;border-radius:14px;display:inline-flex;margin-bottom:16px;}
.qr-link{background:${C.surface};border:1px solid ${C.border};border-radius:10px;padding:10px 14px;font-size:0.78rem;color:${C.soft};word-break:break-all;margin-bottom:16px;text-align:left;}
.modal-close{background:transparent;border:1px solid ${C.border};color:${C.muted};padding:10px 24px;border-radius:100px;font-family:'Outfit',sans-serif;font-size:0.85rem;cursor:pointer;}

/* ── LIGHTBOX ── */
.lightbox{position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:700;display:flex;align-items:center;justify-content:center;cursor:pointer;}
.lightbox img{max-width:95vw;max-height:92vh;border-radius:10px;object-fit:contain;}
.lightbox-close{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.1);border:none;color:#fff;width:38px;height:38px;border-radius:50%;font-size:1.1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;}

/* ── TOAST ── */
.toast{position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:${C.accent};color:#fff;padding:10px 22px;border-radius:100px;font-size:0.85rem;font-weight:600;z-index:800;white-space:nowrap;animation:toastUp .3s ease;}
@keyframes toastUp{from{opacity:0;transform:translateX(-50%) translateY(8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

/* ── NAME MODAL ── */
.name-modal{position:fixed;inset:0;background:rgba(17,24,39,0.6);z-index:600;display:flex;align-items:flex-end;justify-content:center;backdrop-filter:blur(6px);}
.name-modal-box{background:${C.card};border:1px solid ${C.border};border-radius:20px 20px 0 0;padding:28px 20px 40px;width:100%;max-width:500px;}
.name-modal-box h3{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:800;margin-bottom:6px;}
.name-modal-box p{color:${C.muted};font-size:0.83rem;margin-bottom:18px;}
`;

/* ── QR GENERATOR (pure JS, no lib) ── */
function SimpleQR({ text, size = 180 }) {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const cells = 21;
    const cell = Math.floor(size / (cells + 2));
    const off = cell;
    canvas.width = cell * (cells + 2);
    canvas.height = cell * (cells + 2);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    // Encode text as simple pattern (finder patterns + data simulation)
    const hash = [...text].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 0);
    const grid = Array.from({ length: cells }, (_, r) =>
      Array.from({ length: cells }, (_, c) => {
        // Finder top-left
        if (r < 7 && c < 7) {
          if (r === 0 || r === 6 || c === 0 || c === 6) return 1;
          if (r >= 2 && r <= 4 && c >= 2 && c <= 4) return 1;
          return 0;
        }
        // Finder top-right
        if (r < 7 && c > cells - 8) {
          const cc = c - (cells - 7);
          if (r === 0 || r === 6 || cc === 0 || cc === 6) return 1;
          if (r >= 2 && r <= 4 && cc >= 2 && cc <= 4) return 1;
          return 0;
        }
        // Finder bottom-left
        if (r > cells - 8 && c < 7) {
          const rr = r - (cells - 7);
          if (rr === 0 || rr === 6 || c === 0 || c === 6) return 1;
          if (rr >= 2 && rr <= 4 && c >= 2 && c <= 4) return 1;
          return 0;
        }
        // Timing
        if (r === 6 || c === 6) return (r + c) % 2 === 0 ? 1 : 0;
        // Data fill
        const seed = (hash ^ (r * 137 + c * 251 + r * c * 13)) >>> 0;
        return (seed % 3 === 0) ? 1 : 0;
      })
    );
    grid.forEach((row, r) =>
      row.forEach((v, c) => {
        if (v) ctx.fillRect(off + c * cell, off + r * cell, cell, cell);
      })
    );
  }, [text, size]);
  return <canvas ref={canvasRef} style={{ borderRadius: 8 }} />;
}

const EVENT_TYPES = [
  { id: "wedding", label: "Häät", icon: "💍" },
  { id: "birthday", label: "Synttärit", icon: "🎂" },
  { id: "corporate", label: "Yritys", icon: "🏢" },
  { id: "tournament", label: "Turnaus", icon: "🏆" },
  { id: "festival", label: "Festarit", icon: "🎪" },
  { id: "other", label: "Muu", icon: "🎉" },
];

function timeAgo(ts) {
  const d = Date.now() - ts;
  const m = Math.floor(d / 60000);
  if (m < 1) return "juuri nyt";
  if (m < 60) return `${m}min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}t`;
  return `${Math.floor(h / 24)}pv`;
}

export default function DroPics() {
  const [screen, setScreen] = useState("home"); // home | create | event
  const [events, setEvents] = useState([]);
  const [photos, setPhotos] = useState({});
  const [activeEvent, setActiveEvent] = useState(null);
  const [feedTab, setFeedTab] = useState("new");
  const [showCamera, setShowCamera] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [preview, setPreview] = useState(null);
  const [toast, setToast] = useState(null);
  const [likes, setLikes] = useState({});
  const [userName, setUserName] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");

  // Create form state
  const [form, setForm] = useState({ name: "", date: "", type: "wedding", privacy: "public", cover: null });

  const videoRef = useRef();
  const canvasRef = useRef();
  const fileRef = useRef();
  const streamRef = useRef();

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  // Load storage
  useEffect(() => {
    try {
      const evList = JSON.parse(localStorage.getItem("dp:events") || "[]");
      setEvents(evList);
      const photoData = {};
      const likeData = {};
      for (const ev of evList) {
        photoData[ev.id] = JSON.parse(localStorage.getItem(`dp:photos:${ev.id}`) || "[]");
        likeData[ev.id] = JSON.parse(localStorage.getItem(`dp:likes:${ev.id}`) || "{}");
      }
      setPhotos(photoData);
      setLikes(likeData);
      const name = localStorage.getItem("dp:username");
      if (name) setUserName(name);
    } catch {}
  }, []);

  const saveEvents = (list) => localStorage.setItem("dp:events", JSON.stringify(list));
  const savePhotos = (id, list) => localStorage.setItem(`dp:photos:${id}`, JSON.stringify(list));
  const saveLikes = (id, obj) => localStorage.setItem(`dp:likes:${id}`, JSON.stringify(obj));

  /* ── CAMERA ── */
  const startCamera = useCallback(async (facing = facingMode) => {
    try {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facing }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch { showToast("Kamera ei ole käytettävissä"); }
  }, [facingMode]);

  const stopCamera = () => {
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    streamRef.current = null;
  };

  const openCamera = () => {
    if (!activeEvent) return;
    ensureName(() => {
      setShowCamera(true);
      setTimeout(() => startCamera(), 100);
    });
  };

  useEffect(() => { if (!showCamera) stopCamera(); }, [showCamera]);

  const flipCamera = () => {
    const next = facingMode === "environment" ? "user" : "environment";
    setFacingMode(next);
    startCamera(next);
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    setShowCamera(false);
    setPreview({ src: dataUrl, fromCamera: true });
  };

  const confirmPhoto = async () => {
    if (!preview || !activeEvent) return;
    const name = userName || "Vieras";
    const photo = { id: Date.now().toString() + Math.random(), src: preview.src, author: name, time: Date.now() };
    const updated = [photo, ...(photos[activeEvent] || [])];
    setPhotos(p => ({ ...p, [activeEvent]: updated }));
    await savePhotos(activeEvent, updated);
    setPreview(null);
    showToast("Kuva lisätty! 📸");
  };

  /* ── UPLOAD FROM GALLERY ── */
  const handleFiles = async (files) => {
    if (!activeEvent) return;
    const name = userName || "Vieras";
    const newPhotos = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      const dataUrl = await new Promise(res => {
        const r = new FileReader();
        r.onload = e => res(e.target.result);
        r.readAsDataURL(file);
      });
      newPhotos.push({ id: Date.now().toString() + Math.random(), src: dataUrl, author: name, time: Date.now() });
    }
    if (newPhotos.length > 0) {
      const updated = [...newPhotos, ...(photos[activeEvent] || [])];
      setPhotos(p => ({ ...p, [activeEvent]: updated }));
      await savePhotos(activeEvent, updated);
      showToast(`${newPhotos.length} kuvaa lisätty! ✅`);
    }
  };

  const openUpload = () => {
    if (!activeEvent) return;
    ensureName(() => fileRef.current?.click());
  };

  /* ── NAME ── */
  const ensureName = (cb) => {
    if (userName) { cb(); return; }
    setPendingAction(() => cb);
    setShowNameModal(true);
  };

  const submitName = () => {
    const trimmed = userName.trim();
    if (!trimmed) return;
    localStorage.setItem("dp:username", trimmed);
    setShowNameModal(false);
    if (pendingAction) { pendingAction(); setPendingAction(null); }
  };

  /* ── CREATE EVENT ── */
  const createEvent = async () => {
    if (!form.name.trim()) return;
    const ev = {
      id: Date.now().toString(),
      name: form.name.trim(),
      date: form.date,
      type: form.type,
      privacy: form.privacy,
      cover: form.cover,
      created: Date.now(),
    };
    const updated = [ev, ...events];
    setEvents(updated);
    setPhotos(p => ({ ...p, [ev.id]: [] }));
    setLikes(l => ({ ...l, [ev.id]: {} }));
    saveEvents(updated);
    savePhotos(ev.id, []);
    setForm({ name: "", date: "", type: "wedding", privacy: "public", cover: null });
    setActiveEvent(ev.id);
    setScreen("event");
    showToast(`"${ev.name}" luotu! 🎉`);
  };

  /* ── LIKES ── */
  const toggleLike = async (photoId) => {
    if (!activeEvent) return;
    const evLikes = { ...(likes[activeEvent] || {}) };
    evLikes[photoId] = (evLikes[photoId] || 0) + (evLikes[`me:${photoId}`] ? -1 : 1);
    evLikes[`me:${photoId}`] = !evLikes[`me:${photoId}`];
    if (evLikes[photoId] < 0) evLikes[photoId] = 0;
    setLikes(l => ({ ...l, [activeEvent]: evLikes }));
    saveLikes(activeEvent, evLikes);
  };

  const currentEvent = events.find(e => e.id === activeEvent);
  const currentPhotos = photos[activeEvent] || [];
  const evLikes = likes[activeEvent] || {};
  const feedPhotos = feedTab === "popular"
    ? [...currentPhotos].sort((a, b) => (evLikes[b.id] || 0) - (evLikes[a.id] || 0))
    : currentPhotos;
  const fakeLink = `https://dropics.app/e/${activeEvent}`;

  return (
    <div className="app">
      <style>{css}</style>

      {/* Toast */}
      {toast && <div className="toast">{toast}</div>}

      {/* Hidden inputs */}
      <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={e => handleFiles(e.target.files)} />

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close">✕</button>
          <img src={lightbox.src} alt="" />
        </div>
      )}

      {/* Camera preview */}
      {preview && (
        <div className="cam-preview-overlay">
          <img src={preview.src} alt="preview" />
          <div style={{ color: C.muted, fontSize: "0.82rem" }}>Näyttääkö hyvältä?</div>
          <div className="cam-preview-btns">
            <button className="btn-ghost" style={{ flex: 1 }} onClick={() => { setPreview(null); if (preview.fromCamera) { setShowCamera(true); setTimeout(() => startCamera(), 100); } }}>Ota uusi</button>
            <button className="btn-accent" style={{ flex: 1 }} onClick={confirmPhoto}>Lisää ✓</button>
          </div>
        </div>
      )}

      {/* Camera */}
      {showCamera && (
        <div className="camera-overlay">
          <div className="camera-view">
            <video ref={videoRef} autoPlay playsInline muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>
          <div className="camera-controls">
            <button className="cam-close" onClick={() => setShowCamera(false)}>✕</button>
            <button className="cam-shutter" onClick={takePhoto}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#fff" }} />
            </button>
            <button className="cam-flip" onClick={flipCamera}>🔄</button>
          </div>
        </div>
      )}

      {/* QR Modal */}
      {showQR && activeEvent && (
        <div className="modal-bg" onClick={e => e.target === e.currentTarget && setShowQR(false)}>
          <div className="modal-box">
            <h3>Jaa tapahtuma</h3>
            <p>Vieraat skannaavat QR-koodin ja pääsevät suoraan lisäämään kuvia</p>
            <div className="qr-container">
              <SimpleQR text={fakeLink} size={160} />
            </div>
            <div className="qr-link">{fakeLink}</div>
            <button className="btn-accent" style={{ width: "100%", marginBottom: 10 }} onClick={() => { navigator.clipboard?.writeText(fakeLink); showToast("Linkki kopioitu!"); }}>
              📋 Kopioi linkki
            </button>
            <button className="modal-close" onClick={() => setShowQR(false)}>Sulje</button>
          </div>
        </div>
      )}

      {/* Name modal */}
      {showNameModal && (
        <div className="name-modal">
          <div className="name-modal-box">
            <h3>Mikä sinun nimesi on?</h3>
            <p>Nimesi näkyy kuvissasi — vain tapahtuman osallistujat näkevät sen</p>
            <input
              className="form-input"
              placeholder="esim. Mikko"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && submitName()}
              autoFocus
              style={{ marginBottom: 14 }}
            />
            <button className="btn-accent" onClick={submitName} style={{ width: "100%" }}>Jatka →</button>
          </div>
        </div>
      )}

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="wordmark">Dro<em>Pics</em></div>
        {screen !== "home" && (
          <button className="nav-back" onClick={() => setScreen("home")}>
            ← Takaisin
          </button>
        )}
      </nav>

      {/* ── HOME SCREEN ── */}
      {screen === "home" && (
        <div className="screen">
          <div className="home-hero">
            <h1>Kaikki kuvat<br /><span>yhdessä paikassa.</span></h1>
            <p>Luo tapahtuma, jaa QR-koodi — ja kaikki kuvat kerääntyy automaattisesti yhteen feediin.</p>
          </div>
          <div className="home-cta">
            <button className="btn-accent" onClick={() => setScreen("create")}>+ Luo tapahtuma</button>
            <button className="btn-ghost" onClick={() => showToast("Skannaa QR-koodi liittyäksesi")}>QR-skanneri</button>
          </div>
          {events.length > 0 && (
            <>
              <div className="section-label">Tapahtumat</div>
              <div className="event-list">
                {events.map(ev => {
                  const count = (photos[ev.id] || []).length;
                  const typeObj = EVENT_TYPES.find(t => t.id === ev.type) || EVENT_TYPES[5];
                  return (
                    <div key={ev.id} className="event-card" onClick={() => { setActiveEvent(ev.id); setScreen("event"); }}>
                      <span className={`event-badge ${ev.privacy === "public" ? "badge-public" : "badge-private"}`}>
                        {ev.privacy === "public" ? "Julkinen" : "Yksityinen"}
                      </span>
                      {ev.cover
                        ? <img src={ev.cover} alt={ev.name} className="event-card-cover" />
                        : <div className="event-card-cover-placeholder">{typeObj.icon}</div>
                      }
                      <div className="event-card-body">
                        <div className="event-card-type">{typeObj.label}</div>
                        <div className="event-card-name">{ev.name}</div>
                        <div className="event-card-meta">
                          <span className="event-card-date">{ev.date || "Päivämäärä ei asetettu"}</span>
                          <span className="event-card-count">{count} kuvaa</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {events.length === 0 && (
            <div className="feed-empty" style={{ paddingTop: 40 }}>
              <div className="feed-empty-icon">🎊</div>
              <div className="feed-empty-title">Ei vielä tapahtumia</div>
              <div style={{ color: C.muted, fontSize: "0.85rem" }}>Luo ensimmäinen tapahtuma yllä olevalla napilla</div>
            </div>
          )}
        </div>
      )}

      {/* ── CREATE SCREEN ── */}
      {screen === "create" && (
        <div className="screen">
          <div className="form-screen">
            <h2>Uusi tapahtuma</h2>
            <p>Täytä tiedot ja jaa QR-koodi vieraille</p>

            <div className="form-field">
              <label className="form-label">Tapahtuman nimi *</label>
              <input className="form-input" placeholder="esim. Liisan häät" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>

            <div className="form-field">
              <label className="form-label">Päivämäärä</label>
              <input className="form-input" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>

            <div className="form-field">
              <label className="form-label">Tapahtuman tyyppi</label>
              <div className="type-grid">
                {EVENT_TYPES.map(t => (
                  <button key={t.id} className={`type-btn${form.type === t.id ? " active" : ""}`} onClick={() => setForm(f => ({ ...f, type: t.id }))}>
                    <span className="type-icon">{t.icon}</span>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Näkyvyys</label>
              <div className="toggle-row">
                <button className={`toggle-btn${form.privacy === "public" ? " active" : ""}`} onClick={() => setForm(f => ({ ...f, privacy: "public" }))}>🌐 Julkinen</button>
                <button className={`toggle-btn${form.privacy === "private" ? " active" : ""}`} onClick={() => setForm(f => ({ ...f, privacy: "private" }))}>🔒 Yksityinen</button>
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Kansikuva</label>
              <label className="cover-upload">
                {form.cover && <img src={form.cover} alt="cover" />}
                {!form.cover && <>
                  <span style={{ fontSize: "1.8rem" }}>🖼️</span>
                  <span className="cover-upload-label">Lisää kansikuva</span>
                </>}
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => {
                  const file = e.target.files[0];
                  if (file) {
                    const r = new FileReader();
                    r.onload = ev => setForm(f => ({ ...f, cover: ev.target.result }));
                    r.readAsDataURL(file);
                  }
                }} />
              </label>
            </div>

            <button className="btn-accent" style={{ width: "100%", padding: 16, fontSize: "1rem" }} onClick={createEvent} disabled={!form.name.trim()}>
              Luo tapahtuma →
            </button>
          </div>
        </div>
      )}

      {/* ── EVENT FEED SCREEN ── */}
      {screen === "event" && currentEvent && (
        <>
          <div className="feed-header">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
              <span style={{ fontSize: "1.3rem" }}>{EVENT_TYPES.find(t => t.id === currentEvent.type)?.icon || "🎉"}</span>
              <div className="feed-event-name">{currentEvent.name}</div>
            </div>
            <div className="feed-meta">{currentEvent.date || ""} · {currentPhotos.length} kuvaa · {currentEvent.privacy === "public" ? "Julkinen" : "Yksityinen"}</div>
          </div>
          <div className="feed-tabs">
            <button className={`feed-tab${feedTab === "new" ? " active" : ""}`} onClick={() => setFeedTab("new")}>🕐 Uusimmat</button>
            <button className={`feed-tab${feedTab === "popular" ? " active" : ""}`} onClick={() => setFeedTab("popular")}>🔥 Suosituimmat</button>
          </div>
          <div className="screen" style={{ paddingBottom: 100 }}>
            {feedPhotos.length === 0 ? (
              <div className="feed-empty">
                <div className="feed-empty-icon">📷</div>
                <div className="feed-empty-title">Ei vielä kuvia</div>
                <div style={{ color: C.muted, fontSize: "0.85rem" }}>Ota kuva tai lisää galleriasta</div>
              </div>
            ) : (
              <div className="feed-grid">
                {feedPhotos.map(photo => {
                  const likeCount = evLikes[photo.id] || 0;
                  const liked = !!evLikes[`me:${photo.id}`];
                  return (
                    <div key={photo.id} className="feed-item" onClick={() => setLightbox(photo)}>
                      <img src={photo.src} alt={photo.author} loading="lazy" />
                      <button className="feed-like" style={{ color: liked ? "#FF6B6B" : "#fff" }} onClick={e => { e.stopPropagation(); toggleLike(photo.id); }}>
                        {liked ? "❤️" : "🤍"} {likeCount > 0 ? likeCount : ""}
                      </button>
                      <div className="feed-item-meta">
                        <div className="feed-avatar">{photo.author[0]?.toUpperCase()}</div>
                        <div>
                          <div className="feed-author">{photo.author}</div>
                          <div style={{ fontSize: "0.68rem", color: C.muted }}>{timeAgo(photo.time)}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="bottom-bar">
            <button className="qr-btn" onClick={() => setShowQR(true)}>
              <span>⬛</span> QR-koodi
            </button>
            <button className="cam-btn" onClick={openCamera}>📷</button>
            <button className="upload-btn" onClick={openUpload}>
              <span>⬆</span> Galleria
            </button>
          </div>
        </>
      )}
    </div>
  );
}