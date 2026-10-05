"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import shapes from "../lib/shapes.json";
import { PARTS, TARGET, CHAPTERS } from "../lib/parts";

const N = CHAPTERS.length;
const VB = { x: -250, y: -120, w: 1900, h: 1360 };

const Shape = ({ s, fill }) =>
  s.t === "e" ? (
    <ellipse cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} fill={fill} />
  ) : (
    <polygon points={s.pts.map((p) => p.join(",")).join(" ")} fill={fill} />
  );

export default function BikeScroll() {
  const root = useRef(null);
  const tilt = useRef(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const q = (s) => root.current.querySelector(s);
      const part = (k) => q(`[data-part="${k}"]`);
      const holes = q("#holes");
      const names = Object.keys(PARTS);

      names.forEach((k) => gsap.set(part(k), { svgOrigin: PARTS[k].c.join(" ") }));
      gsap.set(q("#ghost"), { svgOrigin: "700 1110" });

      // Opening: the pieces fly in and lock together
      if (!reduce) {
        gsap.set(holes, { opacity: 1 });
        gsap.from(names.map(part), {
          x: (i) => PARTS[names[i]].e[0] * 2.2, y: (i) => PARTS[names[i]].e[1] * 2.2 - 120,
          rotation: (i) => PARTS[names[i]].r * 4, opacity: 0, scale: 0.6,
          duration: 1.9, ease: "expo.out", stagger: 0.09, delay: 0.15,
          onComplete: () => gsap.set(holes, { opacity: 0 }),
        });
        gsap.from(".hero-line", { yPercent: 110, duration: 1.2, ease: "expo.out", stagger: 0.12, delay: 0.5 });
        gsap.from(".fade-in", { opacity: 0, duration: 1.2, delay: 1.3 });
      }

      // Scroll story
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut", duration: 0.75 },
        scrollTrigger: {
          trigger: root.current, start: "top top", end: "bottom bottom", scrub: 1.2,
          onUpdate: (self) => setIdx(Math.min(N - 1, Math.floor(self.progress * N))),
        },
      });
      tl.to(holes, { opacity: 1, duration: 0.05, ease: "none" }, 0.9);
      tl.to(".bgword", { xPercent: -42, duration: N, ease: "none" }, 0);

      CHAPTERS.forEach((ch, i) => {
        if (i === 0) return;
        names.forEach((k) => {
          const P = PARTS[k];
          let v;
          if (ch.cta) v = { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 };
          else if (ch.part === k) v = { x: TARGET[0] - P.c[0], y: TARGET[1] - P.c[1], scale: P.s, rotation: 0, opacity: 1 };
          else v = { x: P.e[0], y: P.e[1], scale: k === "frame" ? 0.82 : 0.8, rotation: P.r, opacity: 0.14 };
          tl.to(part(k), v, i);
        });
        tl.to("#ghost", { opacity: ch.cta ? 1 : 0.25, scaleX: ch.cta ? 1 : 1.2, duration: 0.75 }, i);
        if (ch.cta) tl.to(holes, { opacity: 0, duration: 0.05, ease: "none" }, i + 0.72);
      });

      // Pointer parallax
      if (!reduce) {
        const rx = gsap.quickTo(tilt.current, "rotationY", { duration: 1, ease: "power3" });
        const ry = gsap.quickTo(tilt.current, "rotationX", { duration: 1, ease: "power3" });
        const move = (e) => { rx((e.clientX / innerWidth - 0.5) * 8); ry(-(e.clientY / innerHeight - 0.5) * 5); };
        window.addEventListener("pointermove", move);
        return () => window.removeEventListener("pointermove", move);
      }
    }, root);
    return () => ctx.revert();
  }, []);

  const go = (i) => {
    const total = root.current.offsetHeight - innerHeight;
    window.scrollTo({ top: ((i + 0.55) / N) * total, behavior: "smooth" });
  };
  const ch = CHAPTERS[idx];

  return (
    <main ref={root} className="root">
      <header className="top">
        <span className="brand">VESCO Downtown</span>
        <a className="btn small" href="#">Book a test ride</a>
      </header>

      <div className="stage">
        <div className="bgword" aria-hidden>VESCO DOWNTOWN VESCO DOWNTOWN</div>
        <div className="tiltwrap" ref={tilt}>
          <svg viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} role="img" aria-label="VESCO Downtown mountain bike coming apart as you scroll">
            <defs>
              <radialGradient id="g"><stop offset="0" stopColor="#000" stopOpacity=".55" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
              {Object.entries(shapes).map(([k, v]) => (
                <clipPath id={`c-${k}`} key={k}>{v.map((s, i) => <Shape key={i} s={s} />)}</clipPath>
              ))}
              <mask id="m" maskUnits="userSpaceOnUse" x={VB.x} y={VB.y} width={VB.w} height={VB.h}>
                <rect x={VB.x} y={VB.y} width={VB.w} height={VB.h} fill="#fff" />
                <g id="holes" opacity="0">
                  {Object.values(shapes).flat().map((s, i) => <Shape key={i} s={s} fill="#000" />)}
                </g>
              </mask>
            </defs>
            <ellipse id="ghost" cx="700" cy="1110" rx="620" ry="55" fill="url(#g)" />
            <g data-part="frame"><g mask="url(#m)"><image href="/bike.png" width="1402" height="1122" /></g></g>
            {Object.keys(shapes).map((k) => (
              <g data-part={k} key={k}><g clipPath={`url(#c-${k})`}><image href="/bike.png" width="1402" height="1122" /></g></g>
            ))}
          </svg>
        </div>

        <section className="card" key={idx} aria-live="polite">
          {idx === 0 ? <h1><span className="mask"><span className="hero-line">Take it apart.</span></span><span className="mask"><span className="hero-line">See what you ride.</span></span></h1> : <h2>{ch.title}</h2>}
          <p>{idx === 0 ? ch.body : ch.body}</p>
          {ch.chips.length > 0 && <ul>{ch.chips.map((c) => <li key={c}>{c}</li>)}</ul>}
          {ch.cta && <a className="btn" href="#">Book a test ride</a>}
          {idx === 0 && <div className="hint fade-in"><i /> Scroll</div>}
        </section>

        <nav className="rail" aria-label="Bike parts">
          {CHAPTERS.map((c, i) => (
            <button key={i} className={i === idx ? "on" : ""} onClick={() => go(i)} aria-label={c.title}>
              <span>{c.part ? c.title.split(",")[0].split(" and ")[0].replace(/^The /, "") : i ? "Whole bike" : "Start"}</span><b />
            </button>
          ))}
        </nav>
      </div>
    </main>
  );
}
