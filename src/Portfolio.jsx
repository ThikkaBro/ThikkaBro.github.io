import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const PHRASES = [
  "Founder of LexoraTech",
  "Full-Stack Engineer",
  "AI Builder",
  "SaaS Founder",
  "Product Creator",
  "Entrepreneur",
];

const PROJECTS = [
  {
    id: 1, cat: "Workspace · Platform",
    name: "Lexora Workspace",
    desc: "A fully integrated workspace platform under LexoraTech, designed for seamless collaboration and productivity.",
    status: "Live", sc: "#4A9DFF", sb: "rgba(74,157,255,0.08)", link: "https://apps.lexoratech.com/",
    icon: <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  },
  {
    id: 2, cat: "E-Commerce · SEO",
    name: "LexoraTech Store",
    desc: "Robust backend architecture and comprehensive SEO optimization driving high-performance e-commerce experiences.",
    status: "Live", sc: "#A78BFA", sb: "rgba(167,139,250,0.08)", link: "https://lexoratech.store",
    icon: <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  },
  {
    id: 3, cat: "API · Architecture",
    name: "Nimithi Platform",
    desc: "High-intensity backend API infrastructure built for demanding, data-heavy applications and seamless integrations.",
    status: "Live", sc: "#34D399", sb: "rgba(52,211,153,0.08)", link: "https://nimithi.com",
    icon: <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="14" width="8" height="8" rx="2" ry="2"/><rect x="14" y="2" width="8" height="8" rx="2" ry="2"/><line x1="6" y1="14" x2="6" y2="10"/><line x1="18" y1="10" x2="18" y2="14"/><line x1="6" y1="10" x2="18" y2="10"/></svg>,
  },
  {
    id: 4, cat: "AI · Stealth",
    name: "Project Nova",
    desc: "Next-generation AI automation tool currently in stealth mode.",
    status: "Building", sc: "#636678", sb: "rgba(99,102,120,0.08)", blurred: true,
    icon: <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  },
];

const EXPERTISE = [
  {
    title: "AI-Powered Products",
    desc: "Custom AI solutions, LLM integrations, and intelligent automation that transform business operations.",
    gradient: "linear-gradient(135deg, #4A9DFF 0%, #6366F1 100%)",
    iconColor: "#4A9DFF",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>,
  },
  {
    title: "SaaS Development",
    desc: "End-to-end SaaS architecture from MVP to scale. Payment systems, auth, dashboards, and APIs.",
    gradient: "linear-gradient(135deg, #A78BFA 0%, #EC4899 100%)",
    iconColor: "#A78BFA",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  },
  {
    title: "Full-Stack Engineering",
    desc: "Production-grade applications with React, Next.js, Node.js, and cloud-native infrastructure.",
    gradient: "linear-gradient(135deg, #34D399 0%, #06B6D4 100%)",
    iconColor: "#34D399",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  },
  {
    title: "Hardware & IoT",
    desc: "Custom PCB design, ESP32 firmware, 3D-printed enclosures, and smart device prototyping.",
    gradient: "linear-gradient(135deg, #FBBF24 0%, #F97316 100%)",
    iconColor: "#FBBF24",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  },
];

const TECH = [
  { group: "Frontend",   sym: "◈", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Figma"] },
  { group: "Backend",    sym: "◉", items: ["Node.js", "PHP", "MySQL", "PostgreSQL", "REST API"] },
  { group: "AI & Cloud", sym: "◆", items: ["OpenAI", "AWS", "Vercel", "Docker", "Redis"] },
  { group: "Hardware",   sym: "◧", items: ["Arduino", "ESP32", "C++", "Fusion 360", "Linux"] },
];

const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/theekshana-sudeepa-130321290/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:hello@thikka.me",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/ThikkaBro",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@200;300;400;500;600;700;800;900&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Caveat:wght@400;500;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body,#root{background:#06060A;color:#EDF0F7;font-family:'Sora',sans-serif;overflow-x:hidden}
::-webkit-scrollbar{width:2px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(74,157,255,0.35);border-radius:2px}

@keyframes glow1{0%,100%{transform:translate(0,0)scale(1)}42%{transform:translate(26px,-18px)scale(1.06)}72%{transform:translate(-14px,10px)scale(0.96)}}
@keyframes glow2{0%,100%{transform:translate(0,0)scale(1)}35%{transform:translate(-22px,24px)scale(1.04)}68%{transform:translate(16px,-14px)scale(0.97)}}
@keyframes glow3{0%,100%{transform:translate(0,0)scale(1)}50%{transform:translate(18px,22px)scale(1.03)}80%{transform:translate(-10px,-16px)scale(0.98)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
@keyframes revealUp{from{opacity:0;transform:translateY(105%)}to{opacity:1;transform:translateY(0)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes bob{0%,100%{transform:translateX(-50%)translateY(0);opacity:.5}55%{transform:translateX(-50%)translateY(8px);opacity:.16}}
@keyframes pulse{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.2)}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes float{0%,100%{transform:translateY(0px)}50%{transform:translateY(-10px)}}
@keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes borderGlow{0%,100%{border-color:rgba(74,157,255,0.15)}50%{border-color:rgba(74,157,255,0.35)}}
@keyframes particleFloat{0%{transform:translateY(0) translateX(0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-100vh) translateX(20px);opacity:0}}
@keyframes navSlideDown{from{opacity:0;transform:translateX(-50%) translateY(-20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

.sa{opacity:0;transform:translateY(24px);transition:opacity .72s cubic-bezier(.16,1,.3,1),transform .72s cubic-bezier(.16,1,.3,1)}
.sa.v{opacity:1;transform:none}
.ia{opacity:0;transform:translateY(14px);transition:opacity .5s ease,transform .5s ease}
.ia.v{opacity:1;transform:none}

.gc{background:rgba(255,255,255,0.028);border:1px solid rgba(255,255,255,0.065);backdrop-filter:blur(20px);border-radius:20px;transition:all .38s cubic-bezier(.16,1,.3,1)}
.gc:hover{border-color:rgba(74,157,255,0.22);transform:translateY(-5px);box-shadow:0 24px 60px rgba(0,0,0,.46),0 0 40px rgba(74,157,255,.05)}

.project-link-icon{transition:all .3s cubic-bezier(.16,1,.3,1)}
.gc:hover .project-link-icon{opacity:1!important;color:#4A9DFF;transform:translate(2px,-2px) scale(1.1)}

/* Floating glass nav */
.floating-nav{position:fixed;top:18px;left:50%;transform:translateX(-50%);z-index:100;display:flex;align-items:center;gap:6px;padding:8px 10px;border-radius:100px;background:rgba(255,255,255,0.022);border:1px solid rgba(255,255,255,0.12);backdrop-filter:blur(60px) saturate(2.2);-webkit-backdrop-filter:blur(60px) saturate(2.2);box-shadow:0 8px 32px rgba(0,0,0,0.35),0 0 0 0.5px rgba(255,255,255,0.1) inset,inset 0 1px 0 rgba(255,255,255,0.08);transition:all .4s cubic-bezier(.16,1,.3,1);animation:navSlideDown 0.7s cubic-bezier(.16,1,.3,1) 0.15s both}
.floating-nav.scrolled{background:rgba(255,255,255,0.03);border-color:rgba(255,255,255,0.1);box-shadow:0 12px 44px rgba(0,0,0,0.45),0 0 0 0.5px rgba(255,255,255,0.08) inset,inset 0 1px 0 rgba(255,255,255,0.06)}

.nav-item{font-size:13px;color:#8D91A3;cursor:pointer;transition:all .25s ease;font-weight:400;letter-spacing:.01em;padding:8px 16px;border-radius:100px;position:relative;user-select:none}
.nav-item:hover{color:#EDF0F7;background:rgba(255,255,255,0.06)}

.nav-logo{font-weight:800;font-size:16;letter-spacing:-0.044em;cursor:pointer;user-select:none;padding:4px 12px 4px 8px}

.nav-cta-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 20px;border-radius:100px;background:linear-gradient(135deg,#4A9DFF 0%,#6366F1 100%);color:#fff;font-size:12.5px;font-weight:600;cursor:pointer;border:none;text-decoration:none;letter-spacing:.01em;font-family:'Sora',sans-serif;transition:all .3s cubic-bezier(.16,1,.3,1);position:relative;overflow:hidden;white-space:nowrap}
.nav-cta-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#70BCFF 0%,#818CF8 100%);opacity:0;transition:opacity .3s ease}
.nav-cta-btn:hover::before{opacity:1}
.nav-cta-btn:hover{transform:scale(1.04);box-shadow:0 8px 24px rgba(74,157,255,.35)}
.nav-cta-btn span,.nav-cta-btn svg{position:relative;z-index:1}

.nav-divider{width:1px;height:20px;background:rgba(255,255,255,0.08);margin:0 4px}

.nb{font-size:14px;color:#8D91A3;cursor:pointer;transition:all .25s;font-weight:400;letter-spacing:.01em;position:relative}
.nb:hover{color:#EDF0F7}
.nb::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:linear-gradient(90deg,#4A9DFF,#A78BFA);transition:width .3s cubic-bezier(.16,1,.3,1)}
.nb:hover::after{width:100%}

.bp{display:inline-flex;align-items:center;gap:8px;padding:12px 26px;border-radius:100px;background:linear-gradient(135deg,#4A9DFF 0%,#6366F1 100%);color:#fff;font-size:14px;font-weight:600;cursor:pointer;border:none;text-decoration:none;letter-spacing:.01em;font-family:'Sora',sans-serif;transition:all .3s cubic-bezier(.16,1,.3,1);position:relative;overflow:hidden}
.bp::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#70BCFF 0%,#818CF8 100%);opacity:0;transition:opacity .3s ease}
.bp:hover::before{opacity:1}
.bp:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(74,157,255,.38),0 0 60px rgba(74,157,255,.12)}
.bp span,.bp svg{position:relative;z-index:1}

.bg{display:inline-flex;align-items:center;gap:8px;padding:12px 26px;border-radius:100px;background:transparent;border:1px solid rgba(255,255,255,.1);color:#EDF0F7;font-size:14px;font-weight:500;cursor:pointer;text-decoration:none;font-family:'Sora',sans-serif;transition:all .3s ease}
.bg:hover{border-color:rgba(255,255,255,.2);background:rgba(255,255,255,.04);transform:translateY(-2px)}

.pl{display:inline-flex;align-items:center;padding:7px 16px;border-radius:100px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.025);font-size:12.5px;color:#8A8E9E;font-family:'JetBrains Mono',monospace;transition:all .25s ease;cursor:default;white-space:nowrap}
.pl:hover{border-color:rgba(74,157,255,.28);color:#4A9DFF;background:rgba(74,157,255,.06)}

/* Minimal connect buttons */
.connect-btn{display:inline-flex;align-items:center;gap:14px;padding:16px 24px;border-radius:16px;text-decoration:none;color:#6B6F84;font-size:14px;font-weight:500;background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.06);transition:all .35s cubic-bezier(.16,1,.3,1);font-family:'Sora',sans-serif}
.connect-btn:hover{color:#EDF0F7;border-color:rgba(74,157,255,0.22);background:rgba(74,157,255,0.05);transform:translateY(-4px);box-shadow:0 20px 48px rgba(0,0,0,.4),0 0 40px rgba(74,157,255,.06)}
.connect-btn svg{color:#4E5164;transition:color .3s ease;flex-shrink:0}
.connect-btn:hover svg{color:#4A9DFF}
.connect-btn .connect-arrow{color:#262838;transition:all .3s ease;margin-left:auto}
.connect-btn:hover .connect-arrow{color:#4A9DFF;transform:translate(2px,-2px)}

.cc{display:flex;align-items:center;gap:12px;padding:16px 26px;border-radius:18px;text-decoration:none;color:#EDF0F7;font-size:15px;font-weight:500;background:rgba(255,255,255,.028);border:1px solid rgba(255,255,255,.065);transition:all .32s cubic-bezier(.16,1,.3,1);font-family:'Sora',sans-serif}
.cc:hover{border-color:rgba(74,157,255,.22);transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,.42),0 0 28px rgba(74,157,255,.05)}

.at{background:linear-gradient(118deg,#4A9DFF 0%,#A78BFA 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

.expertise-card{position:relative;padding:36px 30px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:22px;backdrop-filter:blur(20px);transition:all .4s cubic-bezier(.16,1,.3,1);overflow:hidden;cursor:default}
.expertise-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;border-radius:2px 2px 0 0;opacity:0;transition:opacity .4s ease}
.expertise-card:hover{border-color:rgba(74,157,255,0.18);transform:translateY(-6px);box-shadow:0 28px 70px rgba(0,0,0,.5),0 0 50px rgba(74,157,255,.04)}
.expertise-card:hover::before{opacity:1}

.cta-expertise{display:inline-flex;align-items:center;gap:10px;padding:16px 34px;border-radius:100px;background:linear-gradient(135deg,#4A9DFF 0%,#A78BFA 50%,#EC4899 100%);background-size:200% 200%;animation:gradientShift 4s ease infinite;color:#fff;font-size:15px;font-weight:700;cursor:pointer;border:none;text-decoration:none;letter-spacing:.02em;font-family:'Sora',sans-serif;transition:all .3s cubic-bezier(.16,1,.3,1);position:relative;overflow:hidden;box-shadow:0 8px 32px rgba(74,157,255,.2),0 0 80px rgba(167,139,250,.08)}
.cta-expertise:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 16px 48px rgba(74,157,255,.35),0 0 100px rgba(167,139,250,.15)}

.noise-overlay{position:fixed;inset:0;pointer-events:none;z-index:9998;opacity:0.018;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}

@media(max-width:768px){
  .hn{font-size:54px!important;line-height:1.04!important}
  .pg{grid-template-columns:1fr!important}
  .ag{grid-template-columns:1fr!important}
  .eg{grid-template-columns:1fr!important}
  .nl{display:none!important}
  .hb{flex-direction:column!important;align-items:center!important}
  .mobile-menu-btn{display:flex!important}
  .mobile-nav{display:flex!important}
  .floating-nav{padding:8px 8px;gap:4px}
  .floating-nav .nl{display:none!important}
  .connect-buttons-row{grid-template-columns:repeat(2, 1fr)!important}
}
@media(min-width:769px){
  .mobile-menu-btn{display:none!important}
  .mobile-nav{display:none!important}
}
`;

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const d = parseInt(e.target.dataset.d || "0");
            setTimeout(() => e.target.classList.add("v"), d);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.07 }
    );
    document.querySelectorAll(".sa,.ia").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useTyper(phrases) {
  const [txt, setTxt] = useState("");
  const [pi, setPi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const phrase = phrases[pi];
    const speed = del ? 40 : 75;
    const t = setTimeout(() => {
      if (!del) {
        if (ci < phrase.length) {
          setTxt(phrase.slice(0, ci + 1));
          setCi((c) => c + 1);
        } else {
          setTimeout(() => setDel(true), 2200);
        }
      } else {
        if (ci > 0) {
          setTxt(phrase.slice(0, ci - 1));
          setCi((c) => c - 1);
        } else {
          setDel(false);
          setPi((i) => (i + 1) % phrases.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [ci, del, pi, phrases]);

  return txt;
}

function useMouseGlow(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, [ref]);
}

/* ─────────────────────────────────────────────
   FLOATING PARTICLES
───────────────────────────────────────────── */

function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 20,
    duration: Math.random() * 15 + 18,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            bottom: "-5%",
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: `rgba(74, 157, 255, ${p.opacity})`,
            animation: `particleFloat ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */

function Nav({ scrolled }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        id="main-nav"
        className={`floating-nav${scrolled ? " scrolled" : ""}`}
      >
        {/* Logo */}
        <span
          className="nav-logo"
          id="nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          T<span style={{ color: "#4A9DFF" }}>.</span>
        </span>

        <span className="nav-divider nl" />

        {/* Nav links */}
        <div className="nl" style={{ display: "flex", gap: 2 }}>
          {["About", "Expertise", "Projects", "Stack", "Connect"].map((s) => (
            <span key={s} className="nav-item" onClick={() => go(s.toLowerCase())}>
              {s}
            </span>
          ))}
        </div>

        <span className="nav-divider nl" />

        {/* CTA */}
        <span
          className="nav-cta-btn nl"
          id="nav-cta"
          onClick={() => document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span>Let's Talk</span>
          <svg width={10} height={10} viewBox="0 0 14 14" fill="none" style={{ position: "relative", zIndex: 1 }}>
            <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none", alignItems: "center", justifyContent: "center",
            width: 36, height: 36, border: "none",
            borderRadius: 100, background: "rgba(255,255,255,.06)", cursor: "pointer",
            flexDirection: "column", gap: 4, padding: 8,
          }}
        >
          <span style={{
            width: 16, height: 1.5, background: "#EDF0F7", borderRadius: 2,
            transition: "all .3s ease",
            transform: mobileOpen ? "rotate(45deg) translate(2px, 2px)" : "none",
          }} />
          <span style={{
            width: 16, height: 1.5, background: "#EDF0F7", borderRadius: 2,
            transition: "all .3s ease",
            opacity: mobileOpen ? 0 : 1,
          }} />
          <span style={{
            width: 16, height: 1.5, background: "#EDF0F7", borderRadius: 2,
            transition: "all .3s ease",
            transform: mobileOpen ? "rotate(-45deg) translate(2px, -2px)" : "none",
          }} />
        </button>
      </nav>

      {/* Mobile Nav */}
      <div
        className="mobile-nav"
        style={{
          display: "none",
          position: "fixed", top: 72, left: "50%", transform: "translateX(-50%)",
          width: "calc(100% - 32px)", maxWidth: 400,
          zIndex: 99, flexDirection: "column", alignItems: "center",
          padding: "16px", gap: 2,
          background: "rgba(12,12,18,0.92)", backdropFilter: "blur(40px)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 20,
          boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-10px)",
          transition: "all .35s cubic-bezier(.16,1,.3,1)",
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
      >
        {["About", "Expertise", "Projects", "Stack", "Connect"].map((s) => (
          <span
            key={s}
            onClick={() => go(s.toLowerCase())}
            style={{
              padding: "12px 16px", width: "100%", textAlign: "center",
              fontSize: 14, fontWeight: 500,
              color: "#8D91A3", cursor: "pointer", borderRadius: 12,
              transition: "all .2s ease",
            }}
          >
            {s}
          </span>
        ))}
        <span
          className="nav-cta-btn"
          style={{ marginTop: 8, padding: "10px 28px", fontSize: 13 }}
          onClick={() => { setMobileOpen(false); document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" }); }}
        >
          <span>Let's Talk</span>
        </span>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */

function Hero() {
  const typed = useTyper(PHRASES);
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 80); }, []);

  const anim = (delay) =>
    vis ? `fadeUp 0.62s cubic-bezier(.16,1,.3,1) ${delay} both` : "none";

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", textAlign: "center",
        padding: "120px 6% 80px", position: "relative", overflow: "hidden",
      }}
    >
      {/* Ambient orbs */}
      <div style={{
        position: "absolute", top: "8%", left: "3%",
        width: "52vw", height: "52vw", maxWidth: 680, maxHeight: 680,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(74,157,255,0.052) 0%, transparent 70%)",
        animation: "glow1 13s ease-in-out infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "22%", right: "2%",
        width: "40vw", height: "40vw", maxWidth: 540, maxHeight: 540,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 70%)",
        animation: "glow2 17s ease-in-out infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "5%", left: "40%",
        width: "35vw", height: "35vw", maxWidth: 460, maxHeight: 460,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(236,72,153,0.025) 0%, transparent 70%)",
        animation: "glow3 21s ease-in-out infinite", pointerEvents: "none",
      }} />

      <div style={{
        opacity: vis ? 1 : 0, transition: "opacity 0.55s ease",
        maxWidth: 860, width: "100%", position: "relative", zIndex: 1,
      }}>
        {/* Status badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 9,
          padding: "6px 20px", borderRadius: "100px",
          border: "1px solid rgba(74,157,255,0.18)",
          background: "rgba(74,157,255,0.06)", marginBottom: 36,
          animation: anim("0.1s"),
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4A9DFF", display: "block", animation: "pulse 2.3s infinite" }} />
          <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11.5, color: "#4A9DFF", letterSpacing: "0.06em" }}>
            Available for collaboration
          </span>
        </div>

        {/* Hello */}
        <p style={{
          fontFamily: "Caveat", fontSize: 23, color: "#636678",
          marginBottom: 10, letterSpacing: "0.02em", animation: anim("0.2s"),
        }}>
          Hello, I'm
        </p>

        {/* Name — rising reveal */}
        {["Theekshana", "Sudeepa"].map((word, wi) => (
          <div key={word} style={{ overflow: "hidden", lineHeight: 1 }}>
            <h1
              className={wi === 1 ? "hn at" : "hn"}
              style={{
                fontSize: "clamp(60px, 9.5vw, 112px)",
                fontWeight: 900,
                letterSpacing: "-0.046em",
                lineHeight: 1.0,
                marginBottom: wi === 0 ? 4 : 30,
                ...(wi === 0 ? { color: "#EDF0F7" } : {}),
                animation: vis
                  ? `revealUp 0.88s cubic-bezier(.16,1,.3,1) ${0.28 + wi * 0.1}s both`
                  : "none",
              }}
            >
              {word}
            </h1>
          </div>
        ))}

        {/* Typewriter */}
        <div style={{
          fontFamily: "'JetBrains Mono'",
          fontSize: "clamp(14px, 2vw, 20px)",
          color: "#4E5164",
          marginBottom: 24, minHeight: 32, animation: anim("0.52s"),
        }}>
          <span style={{ color: "rgba(74,157,255,0.48)" }}>$ </span>
          <span style={{ color: "#8A8E9E" }}>{typed}</span>
          <span style={{ animation: "blink 1s step-end infinite", color: "#4A9DFF" }}>█</span>
        </div>

        {/* Description */}
        <p style={{
          maxWidth: 510, margin: "0 auto 44px",
          fontSize: "clamp(15px, 1.8vw, 17px)", lineHeight: 1.84,
          color: "#636678", fontWeight: 300, animation: anim("0.62s"),
        }}>
          Building AI-powered products and scalable SaaS businesses from Sri Lanka transforming ideas into digital ventures that reach the world.
        </p>

        {/* CTAs */}
        <div className="hb" style={{
          display: "flex", gap: 14, justifyContent: "center",
          flexWrap: "wrap", animation: anim("0.72s"),
        }}>
          <a href="#expertise" className="cta-expertise" id="hero-cta-expertise"
            onClick={(e) => { e.preventDefault(); document.getElementById("expertise")?.scrollIntoView({ behavior: "smooth" }); }}>
            <span>Discover My Expertise</span>
            <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
              <path d="M7 1V13M7 13L12 8M7 13L2 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <span className="bg" id="hero-cta-connect" onClick={() => document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" })}>
            Let's Connect
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          opacity: vis ? 1 : 0, transition: "opacity 1.1s ease 1.1s", cursor: "pointer",
        }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, color: "#262838", letterSpacing: "0.18em" }}>SCROLL</span>
        <div style={{
          width: 1, height: 46,
          background: "linear-gradient(to bottom, rgba(255,255,255,0.14), transparent)",
          animation: "bob 2.4s ease-in-out infinite",
        }} />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────── */

function Label({ n, text }) {
  return (
    <p style={{
      fontFamily: "'JetBrains Mono'", fontSize: 11, color: "#4A9DFF",
      letterSpacing: "0.17em", marginBottom: 14, textTransform: "uppercase",
    }}>
      {n} / {text}
    </p>
  );
}

/* ─────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────── */

function About() {
  const stats = [
    { v: "4+", l: "Products Shipping" },
    { v: "20+", l: "Technologies" },
    { v: "∞", l: "Ideas in Motion" },
  ];
  const chips = [
    { text: "SE Degree · In Progress", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>, color: "#A78BFA" },
    { text: "Micro-SaaS Builder", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><mpath d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>, color: "#EC4899" },
    { text: "AI Developer", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>, color: "#4A9DFF" },
    { text: "Hardware Tinkerer", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>, color: "#FBBF24" },
    { text: "Sri Lanka → World", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>, color: "#34D399" },
  ];

  return (
    <section id="about" style={{ padding: "108px 6%", maxWidth: 1100, margin: "0 auto" }}>
      <div className="sa" style={{ marginBottom: 58 }}>
        <Label n="01" text="About" />
        <h2 style={{
          fontSize: "clamp(26px, 4vw, 46px)", fontWeight: 700,
          letterSpacing: "-0.034em", lineHeight: 1.18, maxWidth: 580,
        }}>
          Building products that{" "}
          <span className="at">transform ideas</span>{" "}
          into scalable businesses.
        </h2>
      </div>

      <div className="ag" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 60, alignItems: "start" }}>
        {/* Text */}
        <div className="sa">
          <p style={{ fontSize: 17, lineHeight: 1.92, color: "#636678", fontWeight: 300, marginBottom: 22 }}>
            Software Engineer, Entrepreneur, and Founder of <strong style={{ color: "#4A9DFF", fontWeight: 600 }}>LexoraTech</strong> from{" "}
            <strong style={{ color: "#EDF0F7", fontWeight: 600 }}>Sri Lanka</strong> completing a
            Software Engineering degree while actively building and shipping ventures with a founder's mindset.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.92, color: "#636678", fontWeight: 300, marginBottom: 36 }}>
            Focused on{" "}
            <strong style={{ color: "#EDF0F7", fontWeight: 500 }}>AI-native applications</strong>,
            global SaaS platforms, and helping entrepreneurs scale through technology.
            Beyond software bridging digital and physical through hardware engineering.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {chips.map((c) => (
              <span key={c.text} className="ia chip" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "8px 18px",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "100px", fontSize: 13.5, color: "#EDF0F7",
                background: "rgba(255,255,255,0.02)",
                transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)", cursor: "default"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.color; e.currentTarget.style.background = `rgba(255,255,255,0.04)`; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${c.color}25`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <span style={{ color: c.color, display: "flex", filter: `drop-shadow(0 0 8px ${c.color}60)` }}>{c.icon}</span>
                {c.text}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {stats.map((s, i) => (
            <div key={s.l} className="gc ia" data-d={i * 110}
              style={{ padding: "26px 30px", display: "flex", alignItems: "center", gap: 22 }}>
              <div style={{
                fontSize: "clamp(40px, 5.5vw, 56px)", fontWeight: 800,
                letterSpacing: "-0.044em", lineHeight: 1, color: "#EDF0F7",
              }}>{s.v}</div>
              <div style={{ fontSize: 14, color: "#4E5164", fontWeight: 400 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   EXPERTISE (NEW — replaces "Visit thikka.me")
───────────────────────────────────────────── */

function Expertise() {
  const containerRef = useRef(null);

  return (
    <section id="expertise" style={{ padding: "108px 6%", maxWidth: 1100, margin: "0 auto", position: "relative" }}>
      {/* Section glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "70vw", height: "70vw", maxWidth: 900, maxHeight: 900,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(74,157,255,0.018) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div className="sa" style={{ marginBottom: 54, position: "relative" }}>
        <Label n="02" text="Expertise" />
        <h2 style={{ fontSize: "clamp(26px, 4vw, 46px)", fontWeight: 700, letterSpacing: "-0.034em", lineHeight: 1.18, maxWidth: 600 }}>
          What I bring to the{" "}
          <span className="at">table.</span>
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.84, color: "#636678", fontWeight: 300, marginTop: 18, maxWidth: 520 }}>
          From concept to deployment full-spectrum product engineering for founders, startups, and enterprises.
        </p>
      </div>

      <div ref={containerRef} className="eg" style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18,
        position: "relative",
      }}>
        {EXPERTISE.map((item, i) => (
          <div
            key={item.title}
            className="expertise-card ia"
            data-d={i * 100}
            style={{ "--card-gradient": item.gradient }}
          >
            {/* Top gradient line */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: item.gradient, borderRadius: "2px 2px 0 0",
              opacity: 0, transition: "opacity .4s ease",
            }}
              className="card-line"
            />
            <style>{`
              .expertise-card:hover .card-line { opacity: 1 !important; }
            `}</style>

            {/* Icon */}
            <div style={{
              width: 58, height: 58, borderRadius: 16,
              background: `linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))`,
              border: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: item.iconColor, marginBottom: 20,
              boxShadow: `0 8px 32px ${item.iconColor}15`
            }}>
              {item.icon}
            </div>

            {/* Content */}
            <h3 style={{
              fontSize: 19, fontWeight: 700, letterSpacing: "-0.02em",
              marginBottom: 10, color: "#EDF0F7",
            }}>
              {item.title}
            </h3>
            <p style={{
              fontSize: 14, lineHeight: 1.78, color: "#4E5164", fontWeight: 300,
            }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* CTA — Start a Project */}
      <div className="sa" style={{ textAlign: "center", marginTop: 56 }}>
        <a
          href="mailto:hello@thikka.me?subject=Let's%20Build%20Something%20Together"
          className="cta-expertise"
          id="expertise-cta"
        >
          <span>Start a Project</span>
          <svg width={13} height={13} viewBox="0 0 14 14" fill="none">
            <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <p style={{
          fontFamily: "'JetBrains Mono'", fontSize: 11, color: "#262838",
          marginTop: 16, letterSpacing: "0.04em",
        }}>
          AI Products · SaaS Platforms · Full-Stack Engineering · IoT Solutions
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────── */

function Projects() {
  return (
    <section id="projects" style={{ padding: "108px 6%", maxWidth: 1100, margin: "0 auto" }}>
      <div className="sa" style={{ marginBottom: 54 }}>
        <Label n="03" text="Currently Building" />
        <h2 style={{ fontSize: "clamp(26px, 4vw, 46px)", fontWeight: 700, letterSpacing: "-0.034em" }}>
          Products in motion.
        </h2>
      </div>

      <div className="pg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {PROJECTS.map((p, i) => (
          <div key={p.id} className="gc ia" data-d={i * 88}
            style={{ 
              padding: "32px 30px", position: "relative", overflow: "hidden",
              cursor: p.link ? "pointer" : "default" 
            }}
            onClick={() => p.link && window.open(p.link, "_blank")}
          >
            {/* Accent line */}
            <div style={{
              position: "absolute", top: 0, left: 30, right: 30, height: 1,
              background: `linear-gradient(90deg, transparent, ${p.sc}50, transparent)`,
            }} />

            <div style={{ filter: p.blurred ? "blur(8px)" : "none", transition: "filter 0.3s ease", opacity: p.blurred ? 0.4 : 1, pointerEvents: p.blurred ? "none" : "auto" }}>
              {/* Header row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <span style={{
                  fontFamily: "'JetBrains Mono'", fontSize: 10.5, color: "#262838",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                }}>{p.cat}</span>
                <span style={{
                  padding: "4px 13px", borderRadius: "100px",
                  background: p.sb, border: `1px solid ${p.sc}45`,
                  fontSize: 11, color: p.sc, fontFamily: "'JetBrains Mono'", letterSpacing: "0.04em",
                }}>{p.status}</span>
              </div>

              <div style={{ marginBottom: 18, color: p.sc, filter: `drop-shadow(0 0 16px ${p.sc}55)` }}>{p.icon}</div>
              <h3 style={{
                fontSize: 20, fontWeight: 700, letterSpacing: "-0.025em",
                marginBottom: 10, color: "#EDF0F7",
              }}>{p.name}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.74, color: "#4E5164", fontWeight: 300 }}>{p.desc}</p>
            </div>
            
            {p.blurred && (
              <div style={{
                position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", zIndex: 10
              }}>
                <div style={{ color: "#EDF0F7", marginBottom: 12, filter: "drop-shadow(0 0 12px rgba(255,255,255,0.3))" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 12, color: "#EDF0F7", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>In Development</span>
              </div>
            )}
            
            {p.link && (
              <div style={{
                position: "absolute", bottom: 30, right: 30,
                opacity: 0.3, color: "#8A8E9E"
              }} className="project-link-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STACK
───────────────────────────────────────────── */

function Stack() {
  return (
    <section id="stack" style={{ padding: "108px 6%", maxWidth: 1100, margin: "0 auto" }}>
      <div className="sa" style={{ marginBottom: 54 }}>
        <Label n="04" text="Tech Stack" />
        <h2 style={{ fontSize: "clamp(26px, 4vw, 46px)", fontWeight: 700, letterSpacing: "-0.034em" }}>
          Tools of the craft.
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 38 }}>
        {TECH.map((g, gi) => (
          <div key={g.group} className="sa" data-d={gi * 80}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 15 }}>
              <span style={{ color: "#4A9DFF", fontFamily: "'JetBrains Mono'", fontSize: 14 }}>{g.sym}</span>
              <span style={{
                fontFamily: "'JetBrains Mono'", fontSize: 10.5, color: "#262838",
                letterSpacing: "0.15em", textTransform: "uppercase",
              }}>{g.group}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {g.items.map((item, ii) => (
                <span key={item} className="pl ia" data-d={gi * 100 + ii * 55}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   VISION
───────────────────────────────────────────── */

function Vision() {
  return (
    <section style={{ padding: "108px 6%", position: "relative", overflow: "hidden" }}>
      {/* Subtle glow band */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent 0%, rgba(74,157,255,0.016) 50%, transparent 100%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <div className="sa">
          <Label n="05" text="Vision" />
          <div style={{ height: 24 }} />
          <blockquote style={{
            fontSize: "clamp(20px, 3.2vw, 33px)", fontWeight: 300,
            lineHeight: 1.72, letterSpacing: "-0.01em", color: "#EDF0F7",
          }}>
            <span style={{ color: "#1C1D2A" }}>"</span>
            The best products aren't built by the smartest people alone they're built by those who{" "}
            <em style={{ color: "#636678", fontStyle: "italic" }}>deeply understand the problem</em>,{" "}
            <strong className="at" style={{ fontWeight: 600 }}>relentlessly simplify</strong>{" "}
            the solution, and{" "}
            <em style={{ color: "#636678" }}>obsessively ship</em>.
            <span style={{ color: "#1C1D2A" }}>"</span>
          </blockquote>
          <p style={{ marginTop: 30, fontFamily: "Caveat", fontSize: 21, color: "#2E2F3E" }}>
            — Theekshana Sudeepa
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CONNECT
───────────────────────────────────────────── */

function Connect() {
  return (
    <section id="connect" style={{ padding: "108px 6% 80px", maxWidth: 1100, margin: "0 auto" }}>
      {/* Heading */}
      <div className="sa" style={{ textAlign: "center", marginBottom: 56 }}>
        <Label n="06" text="Connect" />
        <h2 style={{
          fontSize: "clamp(36px, 6.5vw, 72px)", fontWeight: 900,
          letterSpacing: "-0.048em", lineHeight: 1.04, marginBottom: 22,
        }}>
          Let's build something<br />
          <span className="at">amazing.</span>
        </h2>
        <p style={{
          fontSize: 17, color: "#4E5164", fontWeight: 300,
          maxWidth: 470, margin: "0 auto",
        }}>
          Whether you're a founder, investor, developer, or recruiter - I'm open to
          conversations about building things that matter.
        </p>
      </div>

      {/* Social buttons — minimal row */}
      <div className="connect-buttons-row" style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14,
        maxWidth: 520, margin: "0 auto",
      }}>
        {SOCIALS.map((s, i) => (
          <a key={s.name} href={s.href} target="_blank" rel="noreferrer"
            className="connect-btn ia" data-d={i * 85}
            style={{ flexDirection: "column", textAlign: "center", justifyContent: "center" }}
          >
            {s.icon}
            <span style={{ fontWeight: 500, fontSize: 13, letterSpacing: "0.01em" }}>{s.name}</span>
          </a>
        ))}
      </div>

      {/* Footer rule */}
      <div style={{
        marginTop: 110, paddingTop: 28,
        borderTop: "1px solid rgba(255,255,255,0.05)",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.044em" }}>
          Theekshana<span style={{ color: "#4A9DFF" }}>.</span>
        </span>
        <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: "#1C1D2A" }}>
          © {new Date().getFullYear()} · Built with precision
        </span>
        <span
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: "#4E5164", textDecoration: "none", cursor: "pointer" }}>
          Back to top ↑
        </span>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   APP
───────────────────────────────────────────── */

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useReveal();

  return (
    <div style={{ background: "#06060A", minHeight: "100vh", position: "relative" }}>
      <style>{CSS}</style>

      {/* Film grain noise overlay */}
      <div className="noise-overlay" />

      {/* Subtle dot-grid bg */}
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Floating particles */}
      <Particles />

      <Nav scrolled={scrolled} />

      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Stack />
        <Vision />
        <Connect />
      </main>
    </div>
  );
}
