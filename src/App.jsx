import photo1 from './assets/1.jpg';
import photo2 from './assets/2.jpg';
import photo3 from './assets/3.jpg';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

/* ------------------------------------------------------------------ */
/*  GLOBAL STYLES (fonts + keyframes)                                  */
/* ------------------------------------------------------------------ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');

    .font-script { font-family: 'Great Vibes', cursive; }
    .font-serif-soft { font-family: 'Cormorant Garamond', Georgia, serif; }
    .font-display { font-family: 'Playfair Display', Georgia, serif; }

    @keyframes twinkle { 0%,100% { opacity: .15; transform: scale(.8);} 50% { opacity: .9; transform: scale(1.2);} }
    @keyframes riseSway {
      0%   { transform: translate3d(0,108vh,0) scale(.7) rotate(-10deg); opacity: 0; }
      12%  { opacity: .55; }
      50%  { transform: translate3d(var(--sway),50vh,0) scale(1) rotate(10deg); }
      88%  { opacity: .45; }
      100% { transform: translate3d(calc(var(--sway) * -1),-12vh,0) scale(1.15) rotate(-12deg); opacity: 0; }
    }
    @keyframes petalFall {
      0%   { transform: translate3d(0,-10vh,0) rotate(0deg); opacity: 0; }
      10%  { opacity: .75; }
      100% { transform: translate3d(var(--drift),110vh,0) rotate(var(--spin)); opacity: 0; }
    }
    @keyframes heartbeat { 0%,100% { transform: scale(1);} 14% { transform: scale(1.18);} 28% { transform: scale(1);} 42% { transform: scale(1.12);} 70% { transform: scale(1);} }
    @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
    @keyframes flame { 0%,100% { transform: translateX(-50%) scale(1,1) rotate(-1deg);} 25% { transform: translateX(-50%) scale(.92,1.08) rotate(2deg);} 50% { transform: translateX(-50%) scale(1.05,.95) rotate(-2deg);} 75% { transform: translateX(-50%) scale(.95,1.06) rotate(1deg);} }
    @keyframes glowPulse { 0%,100% { opacity: .55; transform: translateX(-50%) scale(1);} 50% { opacity: .9; transform: translateX(-50%) scale(1.15);} }
    @keyframes smoke { 0% { transform: translate(-50%,0) scale(.6); opacity: .7;} 100% { transform: translate(-30%,-70px) scale(2.2); opacity: 0;} }
    @keyframes burst { 0% { transform: translate(0,0) scale(.3); opacity: 1;} 100% { transform: translate(var(--dx),var(--dy)) scale(1.1) rotate(var(--rot)); opacity: 0;} }
    @keyframes trail { 0% { transform: translate(-50%,-50%) scale(.6); opacity: .9;} 100% { transform: translate(-50%,-190%) scale(1.3); opacity: 0;} }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(32px);} to { opacity: 1; transform: translateY(0);} }
    @keyframes blink { 0%,50% { opacity: 1;} 51%,100% { opacity: 0;} }
    @keyframes envelopeFloat { 0%,100% { transform: translateY(0) rotate(-1deg);} 50% { transform: translateY(-8px) rotate(1deg);} }
    @keyframes popIn { 0% { transform: scale(.7); opacity: 0;} 70% { transform: scale(1.04);} 100% { transform: scale(1); opacity: 1;} }
    @keyframes ringSpin { to { transform: rotate(360deg);} }

    .reveal { opacity: 0; transform: translateY(32px); transition: opacity 1.1s ease, transform 1.1s ease; }
    .reveal.in { opacity: 1; transform: translateY(0); }

    .shimmer-text {
      background: linear-gradient(90deg, #fecdd3 0%, #fde68a 25%, #fda4af 50%, #fde68a 75%, #fecdd3 100%);
      background-size: 200% auto;
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent; color: transparent;
      animation: shimmer 6s linear infinite;
    }
    .glass { background: rgba(32, 20, 38, .62); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
    .paper {
      background-color: #f6ead9;
      background-image:
        repeating-linear-gradient(transparent, transparent 31px, rgba(150,90,80,.14) 32px),
        radial-gradient(ellipse at top left, rgba(255,255,255,.55), transparent 60%);
    }
    @media (prefers-reduced-motion: reduce) {
      .heart-particle, .petal, .star { animation: none !important; }
    }
  `}</style>
);

/* ------------------------------------------------------------------ */
/*  BACKGROUND LAYERS                                                  */
/* ------------------------------------------------------------------ */
const Starfield = () => {
  const stars = useMemo(
    () =>
      [...Array(70)].map((_, i) => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.2,
        dur: 2.5 + Math.random() * 4,
        delay: Math.random() * 5,
      })),
    []
  );
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((s, i) => (
        <span
          key={i}
          className="star absolute rounded-full bg-amber-100"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            boxShadow: '0 0 6px rgba(253,230,138,.8)',
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

const FloatingHearts = () => {
  const hearts = useMemo(
    () =>
      [...Array(22)].map((_, i) => ({
        size: 12 + Math.random() * 26,
        left: Math.random() * 100,
        dur: 14 + Math.random() * 16,
        delay: Math.random() * 14,
        sway: (Math.random() - 0.5) * 120,
        color: ['#fda4af', '#fb7185', '#fecdd3', '#fcd34d'][i % 4],
      })),
    []
  );
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h, i) => (
        <div
          key={i}
          className="heart-particle absolute"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            color: h.color,
            opacity: 0,
            '--sway': `${h.sway}px`,
            animation: `riseSway ${h.dur}s linear ${h.delay}s infinite`,
            filter: 'drop-shadow(0 0 8px rgba(251,113,133,.45))',
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
};

const RosePetals = () => {
  const petals = useMemo(
    () =>
      [...Array(14)].map(() => ({
        left: Math.random() * 100,
        w: 10 + Math.random() * 10,
        dur: 16 + Math.random() * 14,
        delay: Math.random() * 18,
        drift: (Math.random() - 0.3) * 260,
        spin: 360 + Math.random() * 540,
      })),
    []
  );
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((p, i) => (
        <div
          key={i}
          className="petal absolute"
          style={{
            left: `${p.left}%`,
            width: p.w,
            height: p.w * 1.35,
            background: 'radial-gradient(ellipse at 30% 30%, #fb7185, #9f1239 80%)',
            borderRadius: '70% 0 70% 0',
            opacity: 0,
            '--drift': `${p.drift}px`,
            '--spin': `${p.spin}deg`,
            animation: `petalFall ${p.dur}s linear ${p.delay}s infinite`,
            filter: 'blur(.3px)',
          }}
        />
      ))}
    </div>
  );
};

/* Hearts that follow the finger / cursor */
const HeartTrail = () => {
  const [trail, setTrail] = useState([]);
  const last = useRef(0);
  const idRef = useRef(0);

  useEffect(() => {
    const onMove = (e) => {
      const now = Date.now();
      if (now - last.current < 90) return;
      last.current = now;
      const pt = e.touches ? e.touches[0] : e;
      const id = idRef.current++;
      setTrail((t) => [...t.slice(-14), { id, x: pt.clientX, y: pt.clientY, s: 10 + Math.random() * 10 }]);
      setTimeout(() => setTrail((t) => t.filter((h) => h.id !== id)), 1100);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60]">
      {trail.map((h) => (
        <span
          key={h.id}
          className="absolute text-rose-300"
          style={{
            left: h.x,
            top: h.y,
            fontSize: h.s,
            animation: 'trail 1.1s ease-out forwards',
            textShadow: '0 0 10px rgba(251,113,133,.9)',
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */
const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const Divider = () => (
  <div className="flex items-center justify-center gap-3 text-rose-300/60">
    <span className="h-px w-16 bg-gradient-to-r from-transparent to-rose-400/50" />
    <span style={{ animation: 'heartbeat 2s ease-in-out infinite' }} className="text-sm">♥</span>
    <span className="h-px w-16 bg-gradient-to-l from-transparent to-rose-400/50" />
  </div>
);

const Burst = () => {
  const bits = useMemo(
    () =>
      [...Array(36)].map((_, i) => {
        const angle = (i / 36) * Math.PI * 2 + Math.random() * 0.4;
        const dist = 90 + Math.random() * 170;
        return {
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - 40,
          rot: (Math.random() - 0.5) * 360,
          size: 12 + Math.random() * 14,
          char: ['♥', '✦', '♥', '✧'][i % 4],
          color: ['#fda4af', '#fcd34d', '#fb7185', '#fef3c7'][i % 4],
        };
      }),
    []
  );
  return (
    <div className="absolute left-1/2 top-10 pointer-events-none">
      {bits.map((b, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            fontSize: b.size,
            color: b.color,
            '--dx': `${b.dx}px`,
            '--dy': `${b.dy}px`,
            '--rot': `${b.rot}deg`,
            animation: 'burst 1.8s ease-out forwards',
          }}
        >
          {b.char}
        </span>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  MAIN                                                               */
/* ------------------------------------------------------------------ */
export default function BirthdaySurprise() {
  const [unlocked, setUnlocked] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [typed, setTyped] = useState('');
  const [activeReason, setActiveReason] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showGift, setShowGift] = useState(false);

  const letterText = `My dearest Fatima,

Happy Birthday, my love.

I sat down to build this place for you because ordinary gifts never felt personal enough. I wanted to make something only for you — a quiet little sanctuary on the internet that belongs to us alone.

Thank you for being my anchor, my best friend, and the warmest part of my life. Every single day with you is a gift I never take for granted.

I hope this year brings you as much comfort, peace and boundless happiness as you give to me every day.

Forever yours,
Zain ❤️`;

  /* typewriter for the letter */
  useEffect(() => {
    if (!letterOpen) return;
    setTyped('');
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTyped(letterText.slice(0, i));
      if (i >= letterText.length) clearInterval(t);
    }, 34);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letterOpen]);

  const skipTyping = useCallback(() => setTyped(letterText), [letterText]);

  const reasons = [
    { icon: '🏡', title: 'The warmth you bring home', desc: 'No matter how hectic or noisy the world gets outside, coming home to you instantly calms everything down.' },
    { icon: '🕊️', title: 'Your quiet strength', desc: "The graceful way you handle life's challenges with patience, wisdom, and unmatched kindness." },
    { icon: '✨', title: 'How we laugh together', desc: 'Our inside jokes, shared looks across a room, and the effortless comfort of just being ourselves.' },
    { icon: '🌹', title: 'Your endless generosity', desc: 'How deeply and selflessly you care for the people in your life, giving your whole heart to everything you do.' },
  ];

 const photos = [
  { title: 'Quiet Moments', caption: 'Our favorite quiet coffee dates & late evening talks.', img: photo3, tilt: -4 },
  { title: 'Shared Smiles', caption: 'The laughter we share when no one else is watching.', img: photo2, tilt: 3 },
  { title: 'Side by Side', caption: 'Building our dream life, hand in hand, step by step.', img: photo1, tilt: -2 },
];

  return (
    <div className="relative min-h-screen text-[#f8ece8] overflow-x-hidden antialiased selection:bg-rose-800 selection:text-rose-50 font-serif-soft"
         style={{ background: 'linear-gradient(180deg,#0f0a14 0%,#1a0f1f 45%,#2a1020 100%)' }}>
      <GlobalStyles />

      {/* Ambient light */}
      <div className="fixed inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(circle at 50% 15%, rgba(251,191,36,.10), transparent 55%), radial-gradient(circle at 50% 90%, rgba(190,18,60,.20), transparent 60%)' }} />
      <Starfield />
      <RosePetals />
      <FloatingHearts />
      <HeartTrail />

      {/* ------------------------- LOCK SCREEN ------------------------- */}
      {!unlocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
             style={{ background: 'radial-gradient(circle at 50% 40%, #2a1226 0%, #0f0a14 75%)' }}>
          <div className="relative max-w-md w-full glass border border-rose-400/20 rounded-[2rem] p-10 text-center space-y-8 shadow-[0_0_80px_rgba(190,18,60,.25)]"
               style={{ animation: 'popIn .9s ease both' }}>
            {/* rotating ring around heart */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-dashed border-amber-300/40" style={{ animation: 'ringSpin 18s linear infinite' }} />
              <div className="absolute inset-2 rounded-full border border-rose-400/30" />
              <span className="text-5xl text-rose-400" style={{ animation: 'heartbeat 1.6s ease-in-out infinite', textShadow: '0 0 24px rgba(251,113,133,.9)' }}>♥</span>
            </div>

            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-[.4em] text-amber-200/70">A Private Surprise</span>
              <h1 className="font-script text-6xl shimmer-text leading-tight">For Fatima</h1>
              <p className="text-lg text-rose-100/70 italic font-light leading-relaxed">
                A little world, handcrafted by Zain,<br />to celebrate you today.
              </p>
            </div>

            <button
              onClick={() => setUnlocked(true)}
              className="group relative w-full py-4 rounded-full text-rose-50 tracking-[.25em] text-xs uppercase font-medium overflow-hidden border border-rose-300/30 cursor-pointer transition-transform hover:scale-[1.03]"
              style={{ background: 'linear-gradient(90deg,#9f1239,#be123c,#9f1239)', boxShadow: '0 0 30px rgba(190,18,60,.55)' }}
            >
              <span className="relative z-10">Open Your Surprise ♥</span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </button>
          </div>
        </div>
      )}

      {/* --------------------------- MAIN PAGE --------------------------- */}
      {unlocked && (
        <main className="relative z-10 max-w-2xl mx-auto px-5 py-20 space-y-28" style={{ animation: 'fadeUp 1.4s ease both' }}>

          {/* HEADER */}
          <header className="text-center space-y-6">
            <div className="text-5xl text-rose-400" style={{ animation: 'heartbeat 1.8s ease-in-out infinite', textShadow: '0 0 30px rgba(251,113,133,.9)' }}>♥</div>
            <span className="inline-block text-[11px] uppercase tracking-[.4em] text-amber-200/80 px-5 py-2 rounded-full border border-amber-300/25 bg-amber-950/20">
              Happy Birthday, My Love
            </span>
            <h1 className="font-script text-7xl sm:text-8xl shimmer-text leading-[1.1] py-2">Fatima</h1>
            <p className="text-xl sm:text-2xl italic font-light text-rose-100/75 max-w-md mx-auto leading-relaxed">
              Every day with you is a gift, but today is all about celebrating the incredible woman you are.
            </p>
            <Divider />
            <div className="text-rose-300/50 text-xs tracking-[.3em] uppercase animate-bounce pt-4">scroll gently ↓</div>
          </header>

          {/* CANDLE */}
          <Reveal>
            <section className="relative glass border border-rose-400/15 rounded-[2rem] p-10 text-center space-y-7 shadow-[0_0_60px_rgba(190,18,60,.15)]">
              <h2 className="font-display text-2xl text-rose-100">Make a Wish</h2>

              <div className="relative w-40 h-48 mx-auto">
                {/* warm glow */}
                {!candlesBlown && (
                  <div className="absolute left-1/2 top-0 w-40 h-40 rounded-full pointer-events-none"
                       style={{ background: 'radial-gradient(circle, rgba(253,186,116,.45), transparent 65%)', animation: 'glowPulse 2.2s ease-in-out infinite' }} />
                )}
                {/* cake */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-24 rounded-2xl border border-rose-300/20 overflow-hidden"
                     style={{ background: 'linear-gradient(180deg,#fda4af 0%,#be123c 35%,#7f1230 100%)', boxShadow: '0 10px 30px rgba(0,0,0,.5)' }}>
                  <div className="absolute top-0 inset-x-0 h-5 bg-rose-50/90"
                       style={{ borderRadius: '0 0 60% 60% / 0 0 100% 100%' }} />
                  <div className="absolute bottom-3 inset-x-4 flex justify-between text-rose-100/70 text-xs">
                    <span>♥</span><span>♥</span><span>♥</span><span>♥</span>
                  </div>
                </div>
                {/* candle */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[5.6rem] w-4 h-14 rounded-sm"
                     style={{ background: 'repeating-linear-gradient(135deg,#fef3c7 0 6px,#fecdd3 6px 12px)', boxShadow: '0 0 10px rgba(254,243,199,.3)' }}>
                  {!candlesBlown ? (
                    <div className="absolute -top-8 left-1/2 w-5 h-8"
                         style={{
                           background: 'radial-gradient(ellipse at 50% 75%, #fff7cc 0%, #fcd34d 40%, #f97316 80%, transparent 100%)',
                           borderRadius: '50% 50% 50% 50% / 65% 65% 35% 35%',
                           transformOrigin: '50% 100%',
                           animation: 'flame .9s ease-in-out infinite',
                           filter: 'blur(.4px) drop-shadow(0 0 10px rgba(251,146,60,.9))',
                         }} />
                  ) : (
                    <div className="absolute -top-3 left-1/2 w-3 h-8 rounded-full bg-slate-300/40 blur-md" style={{ animation: 'smoke 2.6s ease-out forwards' }} />
                  )}
                </div>
                {candlesBlown && <Burst />}
              </div>

              <p className="text-lg italic text-rose-100/70 max-w-xs mx-auto min-h-[3.5rem]">
                {candlesBlown
                  ? '✨ May every secret prayer and heart’s desire come true, my love.'
                  : 'Close your eyes, take a deep breath, make a wish… and blow out the candle.'}
              </p>

              <button
                onClick={() => setCandlesBlown(true)}
                disabled={candlesBlown}
                className={`px-8 py-3 rounded-full text-xs tracking-[.25em] uppercase transition-all border ${
                  candlesBlown
                    ? 'bg-rose-950/40 text-rose-300/50 border-rose-900/30 cursor-default'
                    : 'bg-amber-700/30 hover:bg-amber-600/40 text-amber-100 border-amber-300/40 cursor-pointer hover:scale-105 shadow-[0_0_25px_rgba(251,191,36,.25)]'
                }`}
              >
                {candlesBlown ? 'Wish Sent ♥' : 'Blow the Candle 🕯️'}
              </button>
            </section>
          </Reveal>

          {/* LETTER */}
          <Reveal>
            <section className="space-y-8">
              <div className="text-center space-y-2">
                <span className="text-[11px] text-rose-300/70 uppercase tracking-[.4em]">Written With Love</span>
                <h2 className="font-script text-5xl text-rose-100">A Letter for You</h2>
              </div>

              {!letterOpen ? (
                <div onClick={() => setLetterOpen(true)}
                     className="cursor-pointer mx-auto max-w-sm text-center space-y-5 group"
                     style={{ animation: 'envelopeFloat 4s ease-in-out infinite' }}>
                  {/* envelope */}
                  <div className="relative mx-auto w-72 h-44 rounded-xl overflow-hidden border border-rose-300/30 shadow-[0_20px_50px_rgba(190,18,60,.35)] transition-transform group-hover:scale-105"
                       style={{ background: 'linear-gradient(160deg,#fbe4d8,#f1c9bd)' }}>
                    <div className="absolute inset-0"
                         style={{ background: 'linear-gradient(to top right, transparent 49.5%, rgba(159,18,57,.18) 50%), linear-gradient(to top left, transparent 49.5%, rgba(159,18,57,.18) 50%)' }} />
                    <div className="absolute top-0 inset-x-0 h-24 origin-top"
                         style={{ background: 'linear-gradient(180deg,#f4c7b8,#e9b3a3)', clipPath: 'polygon(0 0,100% 0,50% 100%)' }} />
                    <div className="absolute left-1/2 top-[4.6rem] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-rose-100 text-xl"
                         style={{ background: 'radial-gradient(circle at 35% 30%,#e11d48,#7f1230)', boxShadow: '0 4px 12px rgba(0,0,0,.4)', animation: 'heartbeat 2s ease-in-out infinite' }}>
                      ♥
                    </div>
                  </div>
                  <p className="font-script text-3xl text-rose-200">Tap to open your letter</p>
                  <span className="text-xs text-rose-300/50 tracking-[.3em] uppercase">From Zain</span>
                </div>
              ) : (
                <div className="paper rounded-2xl p-7 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,.55)] text-[#4a2230] relative"
                     style={{ animation: 'popIn .8s ease both' }}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-rose-700 text-2xl" style={{ animation: 'heartbeat 2s ease-in-out infinite' }}>♥</div>
                  <p className="font-script text-2xl sm:text-[1.7rem] leading-[32px] whitespace-pre-line min-h-[24rem]">
                    {typed}
                    {typed.length < letterText.length && <span style={{ animation: 'blink 1s steps(1) infinite' }}>|</span>}
                  </p>
                  <div className="pt-5 mt-5 border-t border-rose-900/20 flex justify-between items-center text-xs tracking-widest uppercase text-rose-900/60 font-serif-soft">
                    {typed.length < letterText.length ? (
                      <button onClick={skipTyping} className="hover:text-rose-800 cursor-pointer">Show all</button>
                    ) : <span />}
                    <button onClick={() => setLetterOpen(false)} className="hover:text-rose-800 cursor-pointer">Fold letter</button>
                  </div>
                </div>
              )}
            </section>
          </Reveal>

          {/* REASONS */}
          <section className="space-y-10">
            <Reveal>
              <div className="text-center space-y-2">
                <span className="text-[11px] text-rose-300/70 uppercase tracking-[.4em]">What I Cherish Most</span>
                <h2 className="font-script text-5xl text-rose-100">Why I Love You</h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {reasons.map((r, i) => (
                <Reveal key={i} delay={i * 120}>
                  <div
                    onClick={() => setActiveReason(activeReason === i ? null : i)}
                    className={`cursor-pointer glass border rounded-3xl p-6 text-left transition-all duration-500 hover:-translate-y-1 ${
                      activeReason === i
                        ? 'border-amber-300/50 shadow-[0_0_40px_rgba(251,191,36,.2)]'
                        : 'border-rose-400/15 hover:border-rose-300/40 hover:shadow-[0_0_30px_rgba(190,18,60,.25)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-3xl" style={{ animation: activeReason === i ? 'heartbeat 1.4s ease-in-out infinite' : 'none' }}>{r.icon}</span>
                      <span className="text-rose-300/50 text-lg">{activeReason === i ? '−' : '+'}</span>
                    </div>
                    <h3 className="font-display text-lg text-rose-100 mt-3">{r.title}</h3>
                    <div className={`overflow-hidden transition-all duration-500 ${activeReason === i ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-lg italic text-rose-100/75 leading-snug border-t border-rose-400/20 pt-3">{r.desc}</p>
                    </div>
                    {activeReason !== i && <span className="text-xs text-rose-300/40 tracking-widest uppercase block mt-2">tap to read</span>}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* GALLERY */}
          <section className="space-y-10">
            <Reveal>
              <div className="text-center space-y-2">
                <span className="text-[11px] text-rose-300/70 uppercase tracking-[.4em]">Our Journey</span>
                <h2 className="font-script text-5xl text-rose-100">Precious Memories</h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
              {photos.map((p, i) => (
                <Reveal key={i} delay={i * 150}>
                  <div
                    onClick={() => setSelectedPhoto(p)}
                    className="cursor-pointer bg-[#fbf1e6] p-3 pb-5 rounded-sm shadow-[0_15px_35px_rgba(0,0,0,.55)] transition-all duration-500 hover:!rotate-0 hover:scale-105 hover:z-10 relative"
                    style={{ transform: `rotate(${p.tilt}deg)` }}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-rose-300/50 rotate-[-3deg]" />
<img src={p.img} alt={p.title} className="w-full aspect-square object-contain bg-[#2a1a22]" loading="lazy" />                    <p className="font-script text-2xl text-[#5a2a38] text-center mt-3 leading-none">{p.title}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="text-center text-sm italic text-rose-200/40">(swap these for your own photos ♥)</p>
          </section>

          {/* FINAL SURPRISE */}
          <Reveal>
            <section className="text-center space-y-6">
              <Divider />
              <p className="font-script text-4xl text-rose-100">One last thing…</p>
              <button
                onClick={() => setShowGift(true)}
                className="group relative px-10 py-5 rounded-full text-rose-50 text-xs tracking-[.3em] uppercase cursor-pointer border border-amber-300/40 overflow-hidden transition-transform hover:scale-105"
                style={{ background: 'linear-gradient(90deg,#92400e,#be123c,#92400e)', boxShadow: '0 0 45px rgba(251,113,133,.45)', animation: 'heartbeat 2.4s ease-in-out infinite' }}
              >
                <span className="relative z-10">Open Your Surprise 🕯️</span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </button>
              <p className="pt-16 text-rose-200/40 italic text-lg">Made with all my heart, by Zain ♥</p>
            </section>
          </Reveal>
        </main>
      )}

      {/* --------------------------- MODALS --------------------------- */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
             onClick={() => setSelectedPhoto(null)}>
          <div className="max-w-md w-full bg-[#fbf1e6] p-4 pb-7 rounded-sm shadow-2xl"
               style={{ animation: 'popIn .5s ease both' }}
               onClick={(e) => e.stopPropagation()}>
            <img src={selectedPhoto.img} alt={selectedPhoto.title} className="w-full h-72 object-cover sepia-[.2]" />
            <h3 className="font-script text-4xl text-[#5a2a38] text-center mt-4">{selectedPhoto.title}</h3>
            <p className="text-lg italic text-[#7a4452] text-center mt-1 px-2">{selectedPhoto.caption}</p>
            <button onClick={() => setSelectedPhoto(null)} className="block mx-auto mt-4 text-xs tracking-[.3em] uppercase text-rose-900/60 hover:text-rose-800 cursor-pointer">Close</button>
          </div>
        </div>
      )}

      {showGift && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
             onClick={() => setShowGift(false)}>
          <div className="relative max-w-md w-full glass border border-amber-300/40 rounded-[2rem] p-10 text-center space-y-6 shadow-[0_0_90px_rgba(251,191,36,.3)] overflow-hidden"
               style={{ animation: 'popIn .7s ease both' }}
               onClick={(e) => e.stopPropagation()}>
            <div className="absolute left-1/2 top-24"><Burst /></div>
            <div className="text-6xl" style={{ animation: 'heartbeat 1.5s ease-in-out infinite' }}>🕯️</div>
            <div className="space-y-3">
              <h3 className="font-script text-5xl shimmer-text">A Table for Two</h3>
              <p className="text-xl italic text-rose-100/80 leading-relaxed">
                My gift to you is an evening: good food, soft light, and my whole heart across the table from you. ❤️
              </p>
            </div>

            {/* Dinner voucher */}
            <div className="relative mx-auto rounded-2xl border border-dashed border-amber-300/50 bg-amber-100/5 px-6 py-5 text-left space-y-2">
              <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#1a0f1f]" />
              <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#1a0f1f]" />
              <p className="text-[11px] tracking-[.35em] uppercase text-amber-200/80 text-center">Dinner Voucher</p>
              <ul className="text-lg text-rose-100/85 italic space-y-1">
                <li>♥ One candlelit dinner for two</li>
                <li>♥ Your favorite food, your choice entirely</li>
                <li>♥ Dessert shared from one plate</li>
                <li>♥ Phones away, just us talking</li>
              </ul>
              <p className="font-script text-2xl text-rose-200 text-center pt-2">You choose the place & the day ♥</p>
            </div>
            <button
              onClick={() => setShowGift(false)}
              className="w-full py-3 rounded-full text-xs tracking-[.3em] uppercase text-rose-50 border border-rose-300/30 cursor-pointer hover:scale-[1.02] transition-transform"
              style={{ background: 'linear-gradient(90deg,#9f1239,#be123c)' }}
            >
              Close & Celebrate ♥
            </button>
          </div>
        </div>
      )}
    </div>
  );
}