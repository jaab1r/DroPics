import { useState, useEffect, useRef, useCallback } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; overflow: hidden; }

body {
  background: #050510;
  color: #E0E0FF;
  font-family: 'Space Grotesk', sans-serif;
  -webkit-font-smoothing: antialiased;
}

.app {
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  background: #050510;
}

.app::before {
  content: '';
  position: fixed;
  top: -120px;
  right: -80px;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(123,47,255,0.14) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #1A1A2E; border-radius: 3px; }

/* NAV */
.nav {
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  background: rgba(5,5,16,0.97);
  backdrop-filter: blur(12px);
  position: relative;
  z-index: 10;
  border-bottom: 1px solid #0D0D1E;
}

.wordmark {
  font-family: 'Anton', sans-serif;
  font-size: 1.3rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #E0E0FF;
  line-height: 1;
}

.wordmark em { color: #7B2FFF; font-style: normal; }

.nav-right { display: flex; align-items: center; gap: 10px; }

.nav-back {
  background: transparent;
  border: 1px solid #1A1A2E;
  color: #666;
  padding: 7px 16px;
  border-radius: 100px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.78rem;
  cursor: pointer;
  transition: all .2s;
  letter-spacing: 0.5px;
}

.nav-back:hover { border-color: #7B2FFF; color: #7B2FFF; }

.nav-cta {
  background: #7B2FFF;
  border: none;
  color: #fff;
  padding: 8px 18px;
  border-radius: 100px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all .2s;
  letter-spacing: 0.5px;
}

.nav-cta:hover { background: #6A1FEE; }

.screen { flex: 1; overflow-y: auto; overflow-x: hidden; position: relative; z-index: 1; }

/* ── LANDING PAGE ── */

.landing-hero {
  padding: 52px 20px 40px;
  position: relative;
}

.hero-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #7B2FFF;
  margin-bottom: 20px;
  background: rgba(123,47,255,0.08);
  border: 1px solid rgba(123,47,255,0.2);
  padding: 6px 14px;
  border-radius: 100px;
}

.hero-kicker-dot { width: 6px; height: 6px; border-radius: 50%; background: #7B2FFF; }

.hero-title {
  font-family: 'Anton', sans-serif;
  font-size: 3.6rem;
  line-height: 0.92;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #E0E0FF;
  margin-bottom: 20px;
}

.hero-title span {
  color: transparent;
  -webkit-text-stroke: 1.5px #7B2FFF;
}

.hero-sub {
  font-size: 0.92rem;
  color: #444;
  line-height: 1.7;
  margin-bottom: 32px;
  max-width: 320px;
}

.hero-btns { display: flex; gap: 10px; margin-bottom: 48px; }

.btn-hero-primary {
  flex: 2;
  padding: 15px;
  background: #7B2FFF;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all .2s;
  box-shadow: 0 6px 24px rgba(123,47,255,0.4);
}

.btn-hero-primary:hover { background: #6A1FEE; transform: translateY(-1px); }

.btn-hero-secondary {
  flex: 1;
  padding: 15px;
  background: transparent;
  border: 1px solid #1A1A2E;
  border-radius: 12px;
  color: #666;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.88rem;
  font-weight: 500;
  cursor: pointer;
  transition: all .2s;
}

.btn-hero-secondary:hover { border-color: #7B2FFF; color: #7B2FFF; }

/* STATS */
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: #0D0D1A;
  border: 1px solid #0D0D1A;
  border-radius: 14px;
  overflow: hidden;
  margin: 0 20px 40px;
}

.stat-item {
  background: #080814;
  padding: 18px 14px;
  text-align: center;
}

.stat-number {
  font-family: 'Anton', sans-serif;
  font-size: 1.8rem;
  letter-spacing: 1px;
  color: #E0E0FF;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-number span { color: #7B2FFF; }
.stat-label { font-size: 0.68rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #2A2A45; }

/* HOW IT WORKS */
.section { padding: 0 20px 40px; }

.section-eyebrow {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #7B2FFF;
  margin-bottom: 10px;
}

.section-title {
  font-family: 'Anton', sans-serif;
  font-size: 1.8rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #E0E0FF;
  line-height: 1;
  margin-bottom: 24px;
}

.steps { display: flex; flex-direction: column; gap: 12px; }

.step {
  background: #080814;
  border: 1px solid #0D0D1A;
  border-radius: 14px;
  padding: 18px 16px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  position: relative;
  overflow: hidden;
}

.step::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #7B2FFF;
}

.step-num {
  font-family: 'Anton', sans-serif;
  font-size: 1.4rem;
  color: #1A1A2E;
  letter-spacing: 1px;
  flex-shrink: 0;
  line-height: 1;
  margin-top: 2px;
}

.step-title {
  font-family: 'Anton', sans-serif;
  font-size: 1rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #E0E0FF;
  margin-bottom: 4px;
}

.step-desc { font-size: 0.82rem; color: #333; line-height: 1.5; }

/* USE CASES */
.usecases { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }

.usecase {
  background: #080814;
  border: 1px solid #0D0D1A;
  border-radius: 12px;
  padding: 16px;
  transition: border-color .2s;
  cursor: pointer;
}

.usecase:hover { border-color: #7B2FFF; }

.usecase-icon { font-size: 1.6rem; margin-bottom: 8px; }

.usecase-title {
  font-family: 'Anton', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #E0E0FF;
  margin-bottom: 4px;
}

.usecase-desc { font-size: 0.75rem; color: #333; line-height: 1.4; }

/* QUOTE */
.quote-block {
  margin: 0 20px 40px;
  background: #080814;
  border: 1px solid #0D0D1A;
  border-radius: 14px;
  padding: 24px 20px;
  position: relative;
}

.quote-mark {
  font-family: 'Anton', sans-serif;
  font-size: 4rem;
  color: #0D0D1A;
  line-height: 0.8;
  margin-bottom: 10px;
}

.quote-text {
  font-size: 1rem;
  color: #888;
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 14px;
}

.quote-text strong { color: #E0E0FF; font-style: normal; }

.quote-author { font-size: 0.72rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #2A2A45; }

/* FOOTER */
.footer {
  background: #030308;
  border-top: 1px solid #0D0D1A;
  padding: 32px 20px 40px;
}

.footer-logo {
  font-family: 'Anton', sans-serif;
  font-size: 1.3rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #E0E0FF;
  margin-bottom: 6px;
}

.footer-logo em { color: #7B2FFF; font-style: normal; }

.footer-tagline {
  font-size: 0.78rem;
  color: #2A2A45;
  margin-bottom: 28px;
  line-height: 1.5;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px 16px;
  margin-bottom: 28px;
}

.footer-col-title {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #7B2FFF;
  margin-bottom: 10px;
}

.footer-link {
  display: block;
  font-size: 0.82rem;
  color: #333;
  margin-bottom: 8px;
  cursor: pointer;
  transition: color .2s;
  text-decoration: none;
}

.footer-link:hover { color: #E0E0FF; }

.footer-bottom {
  border-top: 1px solid #0D0D1A;
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-copy { font-size: 0.72rem; color: #1A1A2E; }

.footer-badge {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #7B2FFF;
  background: rgba(123,47,255,0.08);
  border: 1px solid rgba(123,47,255,0.15);
  padding: 4px 10px;
  border-radius: 100px;
}

/* ── APP SCREENS ── */

.divider { height: 1px; background: linear-gradient(to right, #7B2FFF, transparent); margin: 0 20px 20px; }

.home-cta { padding: 0 20px 24px; display: flex; gap: 10px; }

.btn-primary {
  flex: 2;
  padding: 14px;
  background: #7B2FFF;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: all .2s;
  box-shadow: 0 4px 20px rgba(123,47,255,0.35);
}

.btn-primary:hover { background: #6A1FEE; transform: translateY(-1px); }
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

.btn-secondary {
  flex: 1;
  padding: 14px;
  background: transparent;
  border: 1px solid #1A1A2E;
  border-radius: 10px;
  color: #444;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.88rem;
  font-weight: 500;
  cursor: pointer;
  transition: all .2s;
}

.btn-secondary:hover { border-color: #7B2FFF; color: #7B2FFF; }

.app-section-header { padding: 0 20px 12px; display: flex; align-items: center; justify-content: space-between; }
.app-section-title { font-family: 'Anton', sans-serif; font-size: 1rem; letter-spacing: 3px; text-transform: uppercase; color: #E0E0FF; }
.app-section-count { font-size: 0.7rem; color: #2A2A45; letter-spacing: 1px; text-transform: uppercase; }

.event-list { padding: 0 20px 100px; display: flex; flex-direction: column; gap: 10px; }

.event-card {
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: transform .2s, border-color .2s;
  position: relative;
  background: #0D0D1A;
  border: 1px solid #1A1A2E;
}

.event-card:hover { transform: translateY(-2px); border-color: #7B2FFF; }
.event-card-cover { width: 100%; height: 130px; object-fit: cover; display: block; }

.event-card-cover-placeholder {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0A0A18;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #1A1A2E;
}

.event-card-accent { height: 2px; background: linear-gradient(to right, #7B2FFF, transparent); }
.event-card-body { padding: 14px 16px; }
.event-card-type { font-size: 0.65rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #7B2FFF; margin-bottom: 4px; }
.event-card-name { font-family: 'Anton', sans-serif; font-size: 1.2rem; letter-spacing: 1px; text-transform: uppercase; color: #E0E0FF; margin-bottom: 8px; }
.event-card-footer { display: flex; align-items: center; justify-content: space-between; }
.event-card-date { font-size: 0.75rem; color: #2A2A45; }
.event-card-count { font-size: 0.7rem; font-weight: 700; letter-spacing: 1px; color: #1A1A2E; text-transform: uppercase; }

.event-badge { position: absolute; top: 10px; right: 10px; font-size: 0.6rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 10px; border-radius: 100px; }
.badge-public { background: rgba(123,47,255,0.1); color: #9B6FFF; border: 1px solid rgba(123,47,255,0.2); }
.badge-private { background: rgba(255,255,255,0.03); color: #2A2A45; border: 1px solid #1A1A2E; }

.form-screen { padding: 20px 20px 100px; }
.form-hero { margin-bottom: 28px; }
.form-hero h2 { font-family: 'Anton', sans-serif; font-size: 2.2rem; letter-spacing: 2px; text-transform: uppercase; line-height: 1; margin-bottom: 6px; color: #E0E0FF; }
.form-hero p { font-size: 0.83rem; color: #2A2A45; }
.form-field { margin-bottom: 20px; }
.form-label { display: block; font-size: 0.65rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #2A2A45; margin-bottom: 8px; }
.form-input { width: 100%; padding: 13px 16px; background: #0D0D1A; border: 1px solid #1A1A2E; border-radius: 10px; color: #E0E0FF; font-family: 'Space Grotesk', sans-serif; font-size: 0.95rem; outline: none; transition: border-color .2s; }
.form-input:focus { border-color: #7B2FFF; }
.form-input::placeholder { color: #1A1A2E; }

.type-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.type-btn { padding: 13px 8px; background: #0D0D1A; border: 1px solid #1A1A2E; border-radius: 10px; color: #2A2A45; font-family: 'Space Grotesk', sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; transition: all .2s; text-align: center; }
.type-btn:hover, .type-btn.active { border-color: #7B2FFF; background: rgba(123,47,255,0.08); color: #7B2FFF; }
.type-icon { font-size: 1.3rem; display: block; margin-bottom: 5px; }

.toggle-row { display: flex; gap: 8px; }
.toggle-btn { flex: 1; padding: 12px; background: #0D0D1A; border: 1px solid #1A1A2E; border-radius: 10px; color: #2A2A45; font-family: 'Space Grotesk', sans-serif; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all .2s; }
.toggle-btn.active { border-color: #7B2FFF; background: rgba(123,47,255,0.08); color: #7B2FFF; }

.cover-upload { width: 100%; height: 110px; background: #0D0D1A; border: 1px dashed #1A1A2E; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; position: relative; overflow: hidden; transition: border-color .2s; }
.cover-upload:hover { border-color: #7B2FFF; }
.cover-upload img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.cover-upload-label { font-size: 0.72rem; color: #1A1A2E; margin-top: 6px; letter-spacing: 1px; text-transform: uppercase; }

.feed-header { padding: 16px 20px 0; flex-shrink: 0; }
.feed-event-name { font-family: 'Anton', sans-serif; font-size: 1.5rem; letter-spacing: 2px; text-transform: uppercase; line-height: 1; margin-bottom: 4px; color: #E0E0FF; }
.feed-meta { font-size: 0.75rem; color: #2A2A45; letter-spacing: 0.5px; margin-bottom: 14px; }

.feed-tabs { display: flex; gap: 6px; padding: 0 20px 14px; flex-shrink: 0; }
.feed-tab { padding: 7px 16px; background: transparent; border: 1px solid #1A1A2E; border-radius: 100px; color: #2A2A45; font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; transition: all .2s; }
.feed-tab.active { background: #7B2FFF; border-color: #7B2FFF; color: #fff; box-shadow: 0 4px 14px rgba(123,47,255,0.4); }

.feed-grid { padding: 0 20px 20px; columns: 2; column-gap: 8px; }
.feed-item { break-inside: avoid; margin-bottom: 8px; border-radius: 10px; overflow: hidden; background: #0D0D1A; border: 1px solid #1A1A2E; cursor: pointer; position: relative; animation: fadeUp .3s ease; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.feed-item img { width: 100%; display: block; }
.feed-item-meta { padding: 8px 10px; display: flex; align-items: center; gap: 7px; }
.feed-avatar { width: 22px; height: 22px; border-radius: 50%; background: #7B2FFF; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; font-weight: 700; color: #fff; flex-shrink: 0; }
.feed-author { font-size: 0.72rem; color: #2A2A45; }
.feed-time { font-size: 0.65rem; color: #1A1A2E; }
.feed-like { position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,.65); border: none; border-radius: 100px; padding: 4px 10px; font-size: 0.72rem; color: #fff; cursor: pointer; backdrop-filter: blur(4px); display: flex; align-items: center; gap: 4px; }

.feed-empty { padding: 60px 20px; text-align: center; }
.feed-empty-title { font-family: 'Anton', sans-serif; font-size: 1.3rem; letter-spacing: 2px; text-transform: uppercase; color: #1A1A2E; margin-bottom: 6px; }
.feed-empty-sub { font-size: 0.82rem; color: #1A1A2E; }

.bottom-bar { position: fixed; bottom: 0; left: 0; right: 0; padding: 12px 20px 28px; background: linear-gradient(to top, #050510 65%, transparent); display: flex; align-items: center; justify-content: center; gap: 10px; z-index: 10; }
.cam-btn { width: 66px; height: 66px; border-radius: 50%; background: #7B2FFF; border: none; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; cursor: pointer; transition: all .2s; box-shadow: 0 0 0 4px rgba(123,47,255,0.15), 0 8px 28px rgba(123,47,255,0.5); }
.cam-btn:hover { transform: scale(1.06); }
.action-btn { padding: 12px 18px; background: #0D0D1A; border: 1px solid #1A1A2E; border-radius: 12px; color: #2A2A45; font-family: 'Space Grotesk', sans-serif; font-size: 0.78rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; transition: all .2s; display: flex; align-items: center; gap: 6px; }
.action-btn:hover { border-color: #7B2FFF; color: #7B2FFF; }

.camera-overlay { position: fixed; inset: 0; background: #000; z-index: 500; display: flex; flex-direction: column; }
.camera-view { flex: 1; position: relative; overflow: hidden; }
.camera-view video { width: 100%; height: 100%; object-fit: cover; }
.camera-view canvas { display: none; }
.camera-controls { padding: 20px 40px 44px; display: flex; align-items: center; justify-content: space-between; background: rgba(5,5,16,.9); backdrop-filter: blur(10px); }
.cam-shutter { width: 72px; height: 72px; border-radius: 50%; border: 3px solid rgba(123,47,255,0.6); background: rgba(123,47,255,.12); cursor: pointer; transition: all .15s; display: flex; align-items: center; justify-content: center; }
.cam-shutter:active { transform: scale(.9); }
.cam-shutter-inner { width: 52px; height: 52px; border-radius: 50%; background: #7B2FFF; box-shadow: 0 0 20px rgba(123,47,255,0.8); }
.cam-icon-btn { width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,.05); border: 1px solid #1A1A2E; color: #555; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; }

.cam-preview-overlay { position: fixed; inset: 0; background: rgba(5,5,16,.97); z-index: 600; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; gap: 16px; }
.cam-preview-overlay img { max-width: 100%; max-height: 60vh; border-radius: 12px; object-fit: contain; border: 1px solid #1A1A2E; }
.preview-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #2A2A45; }
.preview-btns { display: flex; gap: 10px; width: 100%; }

.lightbox { position: fixed; inset: 0; background: rgba(5,5,16,.98); z-index: 700; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.lightbox img { max-width: 95vw; max-height: 92vh; border-radius: 8px; object-fit: contain; }
.lightbox-close { position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,.05); border: 1px solid #1A1A2E; color: #555; width: 38px; height: 38px; border-radius: 50%; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; }

.modal-bg { position: fixed; inset: 0; background: rgba(5,5,16,.92); z-index: 400; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(8px); }
.modal-box { background: #0D0D1A; border: 1px solid #1A1A2E; border-radius: 18px; padding: 28px 22px; width: 100%; max-width: 360px; text-align: center; }
.modal-box h3 { font-family: 'Anton', sans-serif; font-size: 1.4rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px; color: #E0E0FF; }
.modal-box p { font-size: 0.8rem; color: #2A2A45; margin-bottom: 20px; }
.qr-container { background: #fff; padding: 16px; border-radius: 12px; display: inline-flex; margin-bottom: 16px; }
.qr-link { background: #080814; border: 1px solid #1A1A2E; border-radius: 8px; padding: 10px 14px; font-size: 0.72rem; color: #2A2A45; word-break: break-all; margin-bottom: 16px; text-align: left; }
.modal-close { background: transparent; border: 1px solid #1A1A2E; color: #2A2A45; padding: 10px 24px; border-radius: 100px; font-family: 'Space Grotesk', sans-serif; font-size: 0.8rem; cursor: pointer; transition: all .2s; }
.modal-close:hover { border-color: #7B2FFF; color: #7B2FFF; }

.name-modal { position: fixed; inset: 0; background: rgba(5,5,16,.9); z-index: 600; display: flex; align-items: flex-end; justify-content: center; backdrop-filter: blur(8px); }
.name-modal-box { background: #0D0D1A; border: 1px solid #1A1A2E; border-top: 2px solid #7B2FFF; border-radius: 20px 20px 0 0; padding: 28px 20px 44px; width: 100%; max-width: 500px; }
.name-modal-box h3 { font-family: 'Anton', sans-serif; font-size: 1.3rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px; color: #E0E0FF; }
.name-modal-box p { font-size: 0.8rem; color: #2A2A45; margin-bottom: 18px; }

.toast { position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%); background: #7B2FFF; color: #fff; padding: 10px 22px; border-radius: 100px; font-size: 0.82rem; font-weight: 600; letter-spacing: 0.5px; z-index: 800; white-space: nowrap; animation: toastUp .3s ease; box-shadow: 0 4px 20px rgba(123,47,255,0.5); }
@keyframes toastUp { from { opacity: 0; transform: translateX(-50%) translateY(8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

.home-empty { padding: 40px 20px 100px; text-align: center; }
.empty-title { font-family: 'Anton', sans-serif; font-size: 1.4rem; letter-spacing: 3px; text-transform: uppercase; color: #1A1A2E; margin-bottom: 8px; }
.empty-sub { font-size: 0.82rem; color: #1A1A2E; }
`;

const EVENT_TYPES = [
  { id: "wedding", label: "Häät", icon: "💍" },
  { id: "birthday", label: "Synttärit", icon: "🎂" },
  { id: "corporate", label: "Yritys", icon: "🏢" },
  { id: "tournament", label: "Turnaus", icon: "🏆" },
  { id: "festival", label: "Festarit", icon: "🎪" },
  { id: "other", label: "Muu", icon: "🎉" },
];

function SimpleQR({ text, size = 160 }) {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const cells = 21, cell = Math.floor(size / (cells + 2)), off = cell;
    canvas.width = cell * (cells + 2);
    canvas.height = cell * (cells + 2);
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    const hash = [...text].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 0);
    const grid = Array.from({ length: cells }, (_, r) => Array.from({ length: cells }, (_, c) => {
      if (r < 7 && c < 7) { if (r===0||r===6||c===0||c===6) return 1; if (r>=2&&r<=4&&c>=2&&c<=4) return 1; return 0; }
      if (r < 7 && c > cells-8) { const cc=c-(cells-7); if (r===0||r===6||cc===0||cc===6) return 1; if (r>=2&&r<=4&&cc>=2&&cc<=4) return 1; return 0; }
      if (r > cells-8 && c < 7) { const rr=r-(cells-7); if (rr===0||rr===6||c===0||c===6) return 1; if (rr>=2&&rr<=4&&c>=2&&c<=4) return 1; return 0; }
      if (r===6||c===6) return (r+c)%2===0?1:0;
      return ((hash^(r*137+c*251+r*c*13))>>>0)%3===0?1:0;
    }));
    grid.forEach((row,r)=>row.forEach((v,c)=>{ if(v) ctx.fillRect(off+c*cell,off+r*cell,cell,cell); }));
  }, [text, size]);
  return <canvas ref={canvasRef} style={{ borderRadius: 6 }} />;
}

function timeAgo(ts) {
  const d = Date.now()-ts, m = Math.floor(d/60000);
  if (m<1) return "juuri nyt";
  if (m<60) return `${m}min`;
  const h = Math.floor(m/60);
  if (h<24) return `${h}t`;
  return `${Math.floor(h/24)}pv`;
}

export default function DroPics() {
  const [screen, setScreen] = useState("landing");
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
  const [form, setForm] = useState({ name: "", date: "", type: "tournament", privacy: "public", cover: null });

  const videoRef = useRef();
  const canvasRef = useRef();
  const fileRef = useRef();
  const streamRef = useRef();

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  useEffect(() => {
    try {
      const evList = JSON.parse(localStorage.getItem("dp:events") || "[]");
      setEvents(evList);
      const photoData = {}, likeData = {};
      for (const ev of evList) {
        photoData[ev.id] = JSON.parse(localStorage.getItem(`dp:photos:${ev.id}`) || "[]");
        likeData[ev.id] = JSON.parse(localStorage.getItem(`dp:likes:${ev.id}`) || "{}");
      }
      setPhotos(photoData); setLikes(likeData);
      const name = localStorage.getItem("dp:username");
      if (name) setUserName(name);
    } catch {}
  }, []);

  const saveEvents = (list) => localStorage.setItem("dp:events", JSON.stringify(list));
  const savePhotos = (id, list) => localStorage.setItem(`dp:photos:${id}`, JSON.stringify(list));
  const saveLikes = (id, obj) => localStorage.setItem(`dp:likes:${id}`, JSON.stringify(obj));

  const startCamera = useCallback(async (facing = facingMode) => {
    try {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facing }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch { showToast("Kamera ei ole käytettävissä"); }
  }, [facingMode]);

  const stopCamera = () => { if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; };
  const openCamera = () => { if (!activeEvent) return; ensureName(() => { setShowCamera(true); setTimeout(() => startCamera(), 100); }); };
  useEffect(() => { if (!showCamera) stopCamera(); }, [showCamera]);
  const flipCamera = () => { const next = facingMode==="environment"?"user":"environment"; setFacingMode(next); startCamera(next); };

  const takePhoto = () => {
    try {
      const video = videoRef.current, canvas = canvasRef.current;
      if (!video||!canvas) { showToast("Kamera ei valmis"); return; }
      const w = video.videoWidth||1280, h = video.videoHeight||720;
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(video, 0, 0, w, h);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      stopCamera(); setShowCamera(false); setPreview({ src: dataUrl, fromCamera: true });
    } catch { showToast("Yritä uudelleen"); }
  };

  const confirmPhoto = async () => {
    if (!preview||!activeEvent) return;
    const photo = { id: Date.now().toString()+Math.random(), src: preview.src, author: userName||"Vieras", time: Date.now() };
    const updated = [photo, ...(photos[activeEvent]||[])];
    setPhotos(p => ({...p,[activeEvent]:updated})); savePhotos(activeEvent,updated);
    setPreview(null); showToast("Kuva lisätty!");
  };

  const handleFiles = async (files) => {
    if (!activeEvent) return;
    const newPhotos = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      const dataUrl = await new Promise(res => { const r=new FileReader(); r.onload=e=>res(e.target.result); r.readAsDataURL(file); });
      newPhotos.push({ id: Date.now().toString()+Math.random(), src: dataUrl, author: userName||"Vieras", time: Date.now() });
    }
    if (newPhotos.length>0) {
      const updated = [...newPhotos,...(photos[activeEvent]||[])];
      setPhotos(p=>({...p,[activeEvent]:updated})); savePhotos(activeEvent,updated);
      showToast(`${newPhotos.length} kuvaa lisätty!`);
    }
  };

  const openUpload = () => { if (!activeEvent) return; ensureName(() => fileRef.current?.click()); };
  const ensureName = (cb) => { if (userName) { cb(); return; } setPendingAction(()=>cb); setShowNameModal(true); };
  const submitName = () => { const t=userName.trim(); if(!t) return; localStorage.setItem("dp:username",t); setShowNameModal(false); if(pendingAction){pendingAction();setPendingAction(null);} };

  const createEvent = () => {
    if (!form.name.trim()) return;
    const ev = { id: Date.now().toString(), name: form.name.trim(), date: form.date, type: form.type, privacy: form.privacy, cover: form.cover, created: Date.now() };
    const updated = [ev,...events];
    setEvents(updated); setPhotos(p=>({...p,[ev.id]:[]})); setLikes(l=>({...l,[ev.id]:{}}));
    saveEvents(updated); savePhotos(ev.id,[]);
    setForm({name:"",date:"",type:"tournament",privacy:"public",cover:null});
    setActiveEvent(ev.id); setScreen("event"); showToast(`${ev.name} luotu!`);
  };

  const toggleLike = (photoId) => {
    if (!activeEvent) return;
    const evLikes = {...(likes[activeEvent]||{})};
    evLikes[photoId] = (evLikes[photoId]||0)+(evLikes[`me:${photoId}`]?-1:1);
    evLikes[`me:${photoId}`] = !evLikes[`me:${photoId}`];
    if (evLikes[photoId]<0) evLikes[photoId]=0;
    setLikes(l=>({...l,[activeEvent]:evLikes})); saveLikes(activeEvent,evLikes);
  };

  const currentEvent = events.find(e => e.id===activeEvent);
  const currentPhotos = photos[activeEvent]||[];
  const evLikes = likes[activeEvent]||{};
  const feedPhotos = feedTab==="popular" ? [...currentPhotos].sort((a,b)=>(evLikes[b.id]||0)-(evLikes[a.id]||0)) : currentPhotos;
  const fakeLink = `https://dro-pics.vercel.app/e/${activeEvent}`;

  return (
    <div className="app">
      <style>{css}</style>
      {toast && <div className="toast">{toast}</div>}
      <input ref={fileRef} type="file" accept="image/*" multiple style={{display:"none"}} onChange={e=>handleFiles(e.target.files)} />

      {lightbox && (<div className="lightbox" onClick={()=>setLightbox(null)}><button className="lightbox-close">✕</button><img src={lightbox.src} alt="" /></div>)}

      {preview && (
        <div className="cam-preview-overlay">
          <img src={preview.src} alt="preview" />
          <div className="preview-label">Hyväksytäänkö?</div>
          <div className="preview-btns">
            <button className="btn-secondary" style={{flex:1}} onClick={()=>{setPreview(null);if(preview.fromCamera){setShowCamera(true);setTimeout(()=>startCamera(),100);}}}>Ota uusi</button>
            <button className="btn-primary" style={{flex:1}} onClick={confirmPhoto}>Lisää</button>
          </div>
        </div>
      )}

      {showCamera && (
        <div className="camera-overlay">
          <div className="camera-view">
            <video ref={videoRef} autoPlay playsInline muted style={{width:"100%",height:"100%",objectFit:"cover"}} />
            <canvas ref={canvasRef} style={{display:"none"}} />
          </div>
          <div className="camera-controls">
            <button className="cam-icon-btn" onClick={()=>setShowCamera(false)}>✕</button>
            <button className="cam-shutter" onClick={takePhoto}><div className="cam-shutter-inner" /></button>
            <button className="cam-icon-btn" onClick={flipCamera}>↺</button>
          </div>
        </div>
      )}

      {showQR && activeEvent && (
        <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&setShowQR(false)}>
          <div className="modal-box">
            <h3>Jaa tapahtuma</h3>
            <p>Vieraat skannaavat QR-koodin ja liittyvät suoraan</p>
            <div className="qr-container"><SimpleQR text={fakeLink} size={160} /></div>
            <div className="qr-link">{fakeLink}</div>
            <button className="btn-primary" style={{width:"100%",marginBottom:10}} onClick={()=>{navigator.clipboard?.writeText(fakeLink);showToast("Linkki kopioitu!");}}>Kopioi linkki</button>
            <button className="modal-close" onClick={()=>setShowQR(false)}>Sulje</button>
          </div>
        </div>
      )}

      {showNameModal && (
        <div className="name-modal">
          <div className="name-modal-box">
            <h3>Sinun nimesi</h3>
            <p>Näkyy kuvissasi tapahtumassa</p>
            <input className="form-input" placeholder="esim. Mikko" value={userName} onChange={e=>setUserName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submitName()} autoFocus style={{marginBottom:14}} />
            <button className="btn-primary" onClick={submitName} style={{width:"100%"}}>Jatka</button>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav className="nav">
        <div style={{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"}} onClick={()=>setScreen("landing")}>
          <svg width="32" height="32" viewBox="0 0 200 200" style={{flexShrink:0}}>
            <rect width="200" height="200" rx="40" fill="#7B2FFF"/>
            <rect x="40" y="70" width="120" height="85" rx="14" fill="white" opacity="0.95"/>
            <rect x="72" y="58" width="44" height="20" rx="8" fill="white" opacity="0.95"/>
            <circle cx="100" cy="118" r="28" fill="#7B2FFF"/>
            <circle cx="100" cy="118" r="20" fill="#5010CC"/>
            <circle cx="100" cy="118" r="12" fill="#7B2FFF"/>
            <circle cx="93" cy="111" r="4" fill="white" opacity="0.4"/>
            <circle cx="140" cy="82" r="6" fill="#A855F7"/>
            <circle cx="140" cy="82" r="3" fill="white" opacity="0.6"/>
            <path d="M100 155 L86 140 H114 Z" fill="#5010CC"/>
            <rect x="86" y="148" width="28" height="8" fill="#5010CC"/>
          </svg>
          <div className="wordmark">Dro<em>Pics</em></div>
        </div>
        <div className="nav-right">
          {screen !== "landing" && <button className="nav-back" onClick={() => setScreen(screen==="event"?"home":"home")}>← Takaisin</button>}
          {screen === "landing" && <button className="nav-cta" onClick={() => setScreen("home")}>Avaa appi</button>}
          {screen === "home" && <button className="nav-cta" onClick={() => setScreen("create")}>+ Uusi</button>}
        </div>
      </nav>

      {/* LANDING */}
      {screen === "landing" && (
        <div className="screen">
          <div className="landing-hero">
            <div className="hero-kicker"><div className="hero-kicker-dot" />Tapahtumakuvaus</div>
            <h1 className="hero-title">KAIKKI<br />KUVAT<br /><span>YHDESSÄ</span></h1>
            <p className="hero-sub">Luo tapahtuma, jaa QR-koodi — vieraat lisää kuvat suoraan yhteiseen feediin. Ei rekisteröitymistä.</p>
            <div className="hero-btns">
              <button className="btn-hero-primary" onClick={() => setScreen("home")}>Luo tapahtuma ilmaiseksi</button>
              <button className="btn-hero-secondary" onClick={() => showToast("Tulossa pian!")}>Katso demo</button>
            </div>
          </div>

          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-number">0<span>s</span></div>
              <div className="stat-label">Rekisteröinti</div>
            </div>
            <div className="stat-item">
              <div className="stat-number"><span>∞</span></div>
              <div className="stat-label">Kuvia</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1<span>QR</span></div>
              <div className="stat-label">Liittyminen</div>
            </div>
          </div>

          <div className="section">
            <div className="section-eyebrow">Miten se toimii</div>
            <div className="section-title">Kolme askelta</div>
            <div className="steps">
              <div className="step">
                <div className="step-num">01</div>
                <div>
                  <div className="step-title">Luo tapahtuma</div>
                  <div className="step-desc">Häät, synttärit, turnaus tai festarit — luo tapahtuma 30 sekunnissa.</div>
                </div>
              </div>
              <div className="step">
                <div className="step-num">02</div>
                <div>
                  <div className="step-title">Jaa QR-koodi</div>
                  <div className="step-desc">Vieraat skannaavat koodin ja pääsevät suoraan lisäämään kuvia — ilman rekisteröitymistä.</div>
                </div>
              </div>
              <div className="step">
                <div className="step-num">03</div>
                <div>
                  <div className="step-title">Kaikki kuvat yhdessä</div>
                  <div className="step-desc">Jokainen kuva kerääntyy automaattisesti yhteiseen feediin. Ei enää kuvaviestejä.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="section-eyebrow">Käyttötapaukset</div>
            <div className="section-title">Sopii kaikkiin tapahtumiin</div>
            <div className="usecases">
              {[
                { icon: "💍", title: "Häät", desc: "Kerää vieraiden kuvat yhteen paikkaan" },
                { icon: "🏆", title: "Turnaukset", desc: "Joukkuekuvat ja voittohetket talteen" },
                { icon: "🎂", title: "Synttärit", desc: "Muistot yhteen albumiin" },
                { icon: "🏢", title: "Yritysjuhlat", desc: "Ammattimainen kuvajako tiimeille" },
                { icon: "🎪", title: "Festarit", desc: "Tunnelma talteen kaikilta kuvakulmilta" },
                { icon: "🎓", title: "Valmistujaiset", desc: "Juhlahetket kaikkien silmin" },
              ].map((u, i) => (
                <div key={i} className="usecase">
                  <div className="usecase-icon">{u.icon}</div>
                  <div className="usecase-title">{u.title}</div>
                  <div className="usecase-desc">{u.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="quote-block">
            <div className="quote-mark">"</div>
            <div className="quote-text">Ei enää <strong>sadan viestin</strong> ketjuja WhatsAppissa. Kaikki kuvat löytyvät <strong>yhdestä paikasta</strong> heti tapahtuman jälkeen.</div>
            <div className="quote-author">DroPics — Kuvat yhdessä paikassa</div>
          </div>

          <div className="section">
            <button className="btn-hero-primary" style={{width:"100%"}} onClick={() => setScreen("home")}>
              Aloita ilmaiseksi
            </button>
          </div>

          <div className="section">
            <div className="section-eyebrow">Hinnoittelu</div>
            <div className="section-title">Selkeät hinnat</div>
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
              <div style={{background:"#080814",border:"1px solid #0D0D1A",borderRadius:"14px",padding:"20px 18px"}}>
                <div style={{fontSize:"0.65rem",fontWeight:700,letterSpacing:"3px",textTransform:"uppercase",color:"#2A2A45",marginBottom:"8px"}}>Ilmainen</div>
                <div style={{fontFamily:"'Anton',sans-serif",fontSize:"2rem",letterSpacing:"1px",color:"#E0E0FF",marginBottom:"4px"}}>0€</div>
                <div style={{fontSize:"0.78rem",color:"#333",marginBottom:"14px"}}>Kokeile ilman sitoumuksia</div>
                <div style={{fontSize:"0.8rem",color:"#333",lineHeight:"1.8"}}>1 tapahtuma · 30 kuvaa · DroPics-vesileima</div>
              </div>
              <div style={{background:"#0D0D1A",border:"2px solid #7B2FFF",borderRadius:"14px",padding:"20px 18px",position:"relative"}}>
                <div style={{position:"absolute",top:"-11px",left:"18px",background:"#7B2FFF",color:"#fff",fontSize:"0.6rem",fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",padding:"3px 12px",borderRadius:"100px"}}>Suosituin</div>
                <div style={{fontSize:"0.65rem",fontWeight:700,letterSpacing:"3px",textTransform:"uppercase",color:"#7B2FFF",marginBottom:"8px"}}>Tapahtuma</div>
                <div style={{fontFamily:"'Anton',sans-serif",fontSize:"2rem",letterSpacing:"1px",color:"#E0E0FF",marginBottom:"4px"}}>4,99€</div>
                <div style={{fontSize:"0.78rem",color:"#555",marginBottom:"14px"}}>Per tapahtuma, ei kuukausimaksua</div>
                <div style={{fontSize:"0.8rem",color:"#666",lineHeight:"1.8"}}>1 tapahtuma · 200 kuvaa · Ei vesileimaa · QR-koodi</div>
              </div>
              <div style={{background:"#080814",border:"1px solid #0D0D1A",borderRadius:"14px",padding:"20px 18px"}}>
                <div style={{fontSize:"0.65rem",fontWeight:700,letterSpacing:"3px",textTransform:"uppercase",color:"#2A2A45",marginBottom:"8px"}}>Pro</div>
                <div style={{fontFamily:"'Anton',sans-serif",fontSize:"2rem",letterSpacing:"1px",color:"#E0E0FF",marginBottom:"4px"}}>14,99€<span style={{fontSize:"1rem",color:"#333"}}>/kk</span></div>
                <div style={{fontSize:"0.78rem",color:"#333",marginBottom:"14px"}}>Ammattilaisille ja yrityksille</div>
                <div style={{fontSize:"0.8rem",color:"#333",lineHeight:"1.8"}}>Rajaton tapahtumat · Rajaton kuvat · Oma brändäys · Tilastot</div>
              </div>
            </div>
          </div>

                    <div className="footer">
            <div className="footer-logo">Dro<em>Pics</em></div>
            <div className="footer-tagline">Kaikki kuvat yhdessä paikassa.<br />Tapahtumakuvaus tehty helpoksi.</div>
            <div className="footer-grid">
              <div>
                <div className="footer-col-title">Tuote</div>
                <span className="footer-link" onClick={() => setScreen("home")}>Avaa appi</span>
                <span className="footer-link" onClick={() => setScreen("create")}>Luo tapahtuma</span>
                <span className="footer-link">Hinnoittelu</span>
                <span className="footer-link">Miten toimii</span>
              </div>
              <div>
                <div className="footer-col-title">Käyttötapaukset</div>
                <span className="footer-link">Häät</span>
                <span className="footer-link">Turnaukset</span>
                <span className="footer-link">Yritysjuhlat</span>
                <span className="footer-link">Festarit</span>
              </div>
              <div>
                <div className="footer-col-title">Tuki</div>
                <span className="footer-link">UKK</span>
                <span className="footer-link">Yhteydenotto</span>
                <span className="footer-link">Tietosuoja</span>
                <span className="footer-link">Käyttöehdot</span>
              </div>
              <div>
                <div className="footer-col-title">Yritys</div>
                <span className="footer-link">Meistä</span>
                <span className="footer-link">Blogi</span>
                <span className="footer-link">Presse</span>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="footer-copy">© 2025 DroPics. Kaikki oikeudet pidätetään.</div>
              <div className="footer-badge">Beta</div>
            </div>
          </div>
        </div>
      )}

      {/* HOME — tapahtumalista */}
      {screen === "home" && (
        <div className="screen">
          <div style={{padding:"24px 20px 0"}}>
            <div style={{fontSize:"0.65rem",fontWeight:700,letterSpacing:"4px",textTransform:"uppercase",color:"#7B2FFF",marginBottom:8}}>Tapahtumat</div>
            <h2 style={{fontFamily:"'Anton',sans-serif",fontSize:"2rem",letterSpacing:"1px",textTransform:"uppercase",color:"#E0E0FF",marginBottom:6}}>SINUN<br /><span style={{color:"transparent",WebkitTextStroke:"1.5px #7B2FFF"}}>TAPAHTUMAT</span></h2>
          </div>
          <div style={{height:1,background:"linear-gradient(to right,#7B2FFF,transparent)",margin:"16px 20px"}} />
          <div className="home-cta">
            <button className="btn-primary" onClick={() => setScreen("create")}>+ Luo tapahtuma</button>
            <button className="btn-secondary" onClick={() => showToast("Skannaa QR liittyäksesi")}>QR</button>
          </div>
          {events.length > 0 ? (
            <>
              <div className="app-section-header">
                <div className="app-section-title">Kaikki</div>
                <div className="app-section-count">{events.length} kpl</div>
              </div>
              <div className="event-list">
                {events.map(ev => {
                  const count = (photos[ev.id]||[]).length;
                  const typeObj = EVENT_TYPES.find(t=>t.id===ev.type)||EVENT_TYPES[5];
                  return (
                    <div key={ev.id} className="event-card" onClick={()=>{setActiveEvent(ev.id);setScreen("event");}}>
                      <span className={`event-badge ${ev.privacy==="public"?"badge-public":"badge-private"}`}>{ev.privacy==="public"?"Julkinen":"Yksityinen"}</span>
                      {ev.cover ? <img src={ev.cover} alt={ev.name} className="event-card-cover" /> : <div className="event-card-cover-placeholder">{typeObj.label}</div>}
                      <div className="event-card-accent" />
                      <div className="event-card-body">
                        <div className="event-card-type">{typeObj.label}</div>
                        <div className="event-card-name">{ev.name}</div>
                        <div className="event-card-footer">
                          <span className="event-card-date">{ev.date||"Päivämäärä ei asetettu"}</span>
                          <span className="event-card-count">{count} kuvaa</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="home-empty">
              <div className="empty-title">Ei tapahtumia</div>
              <div className="empty-sub">Luo ensimmäinen tapahtuma yllä</div>
            </div>
          )}
        </div>
      )}

      {/* CREATE */}
      {screen === "create" && (
        <div className="screen">
          <div className="form-screen">
            <div className="form-hero">
              <h2>Uusi<br />tapahtuma</h2>
              <p>Täytä tiedot ja jaa QR-koodi vieraille</p>
            </div>
            <div className="form-field">
              <label className="form-label">Tapahtuman nimi *</label>
              <input className="form-input" placeholder="esim. FC Helsinki vs HJK" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
            </div>
            <div className="form-field">
              <label className="form-label">Päivämäärä</label>
              <input className="form-input" type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))} />
            </div>
            <div className="form-field">
              <label className="form-label">Tyyppi</label>
              <div className="type-grid">
                {EVENT_TYPES.map(t=>(
                  <button key={t.id} className={`type-btn${form.type===t.id?" active":""}`} onClick={()=>setForm(f=>({...f,type:t.id}))}>
                    <span className="type-icon">{t.icon}</span>{t.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">Näkyvyys</label>
              <div className="toggle-row">
                <button className={`toggle-btn${form.privacy==="public"?" active":""}`} onClick={()=>setForm(f=>({...f,privacy:"public"}))}>Julkinen</button>
                <button className={`toggle-btn${form.privacy==="private"?" active":""}`} onClick={()=>setForm(f=>({...f,privacy:"private"}))}>Yksityinen</button>
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">Kansikuva</label>
              <label className="cover-upload">
                {form.cover && <img src={form.cover} alt="cover" />}
                {!form.cover && <><span style={{fontSize:"1.6rem",color:"#2A2A45"}}>+</span><span className="cover-upload-label">Lisää kuva</span></>}
                <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(f){const r=new FileReader();r.onload=ev=>setForm(f=>({...f,cover:ev.target.result}));r.readAsDataURL(f);}}} />
              </label>
            </div>
            <button className="btn-primary" style={{width:"100%",padding:16}} onClick={createEvent} disabled={!form.name.trim()}>Luo tapahtuma</button>
          </div>
        </div>
      )}

      {/* FEED */}
      {screen === "event" && currentEvent && (
        <>
          <div className="feed-header">
            <div className="feed-event-name">{currentEvent.name}</div>
            <div className="feed-meta">{currentEvent.date||""} · {currentPhotos.length} kuvaa</div>
          </div>
          <div className="feed-tabs">
            <button className={`feed-tab${feedTab==="new"?" active":""}`} onClick={()=>setFeedTab("new")}>Uusimmat</button>
            <button className={`feed-tab${feedTab==="popular"?" active":""}`} onClick={()=>setFeedTab("popular")}>Suosituimmat</button>
          </div>
          <div className="screen" style={{paddingBottom:100}}>
            {feedPhotos.length===0 ? (
              <div className="feed-empty">
                <div className="feed-empty-title">Ei kuvia vielä</div>
                <div className="feed-empty-sub">Ota kuva tai lisää galleriasta</div>
              </div>
            ) : (
              <div className="feed-grid">
                {feedPhotos.map(photo=>{
                  const likeCount=evLikes[photo.id]||0, liked=!!evLikes[`me:${photo.id}`];
                  return (
                    <div key={photo.id} className="feed-item" onClick={()=>setLightbox(photo)}>
                      <img src={photo.src} alt={photo.author} loading="lazy" />
                      <button className="feed-like" style={{color:liked?"#9B6FFF":"#fff"}} onClick={e=>{e.stopPropagation();toggleLike(photo.id);}}>
                        {liked?"♥":"♡"} {likeCount>0?likeCount:""}
                      </button>
                      <div className="feed-item-meta">
                        <div className="feed-avatar">{photo.author[0]?.toUpperCase()}</div>
                        <div>
                          <div className="feed-author">{photo.author}</div>
                          <div className="feed-time">{timeAgo(photo.time)}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="bottom-bar">
            <button className="action-btn" onClick={()=>setShowQR(true)}>QR</button>
            <button className="cam-btn" onClick={openCamera}>📷</button>
            <button className="action-btn" onClick={openUpload}>Galleria</button>
          </div>
        </>
      )}
    </div>
  );
}