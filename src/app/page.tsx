
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const headline = "WELCOME ITZ FIZZ";
const letters = [...headline];

const stats = [
  { value: "58%", text: "Increase in pick up point use", color: "lime", position: "top-left" },
  { value: "23%", text: "Decreased in customer phone calls", color: "blue", position: "bottom-left" },
  { value: "27%", text: "Increase in pick up point use", color: "dark", position: "top-right" },
  { value: "40%", text: "Decreased in customer phone calls", color: "orange", position: "bottom-right" },
];

function Car() {
  return (
    <svg viewBox="0 0 180 90" className="car-image" aria-label="Top view of a sports car" role="img">
      <defs>
        <linearGradient id="paint" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f5f5f5" />
          <stop offset=".4" stopColor="#a7a7a7" />
          <stop offset="1" stopColor="#383838" />
        </linearGradient>
        <linearGradient id="windshield" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#a8d8e5" />
          <stop offset="1" stopColor="#19242e" />
        </linearGradient>
      </defs>
      {/* Wheels */}
      <g fill="#111">
        <rect x="28" y="3" width="37" height="15" rx="5" />
        <rect x="28" y="72" width="37" height="15" rx="5" />
        <rect x="116" y="3" width="37" height="15" rx="5" />
        <rect x="116" y="72" width="37" height="15" rx="5" />
      </g>
      {/* Body */}
      <path
        d="M8 45 L15 29 Q22 21 43 18 L60 7 Q67 3 83 3 L121 3 Q137 5 145 19 L162 27 Q173 31 176 45 Q173 59 162 63 L145 71 Q137 85 121 87 L83 87 Q67 87 60 83 L43 72 Q22 69 15 61Z"
        fill="url(#paint)" stroke="#222" strokeWidth="2"
      />
      <path d="M53 20 Q61 10 79 10 L119 10 Q133 12 140 25 L145 35 L48 35Z"
        fill="url(#windshield)" stroke="#555" strokeWidth="1.5" />
      <path d="M48 55 L145 55 L140 65 Q133 78 119 80 L79 80 Q61 80 53 70Z"
        fill="url(#windshield)" stroke="#555" strokeWidth="1.5" />
      <path d="M44 45 H151" stroke="#444" strokeWidth="2" />
      <path d="M18 34 L34 31 L34 39 L15 40Z" fill="#fff7bf" />
      <path d="M18 56 L34 51 L34 59 L15 50Z" fill="#ff3333" />
      <path d="M62 5 L124 5" stroke="#f5f5f5" strokeWidth="2" />
      <path d="M64 85 L124 85" stroke="#f5f5f5" strokeWidth="2" />
      <path d="M85 22 V34 M85 56 V68" stroke="#b8eaff" strokeWidth="1.5" />
      <text x="100" y="48" fontSize="7" fill="#222" fontWeight="bold" textAnchor="middle">FIZZ</text>
    </svg>
  );
}

export default function Home() {
  const sectionRef = useRef<HTMLElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const statsRef = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const car = carRef.current;
    const trail = trailRef.current;
    const road = roadRef.current;

    if (!section || !car || !trail || !road) return;

    const ctx = gsap.context(() => {
      const getTravelDistance = () => {
        const roadWidth = road.clientWidth;
        const carWidth = car.getBoundingClientRect().width;
        return Math.max(0, roadWidth - carWidth - 12);
      };

      gsap.set(car, { x: 0 });
      gsap.set(trail, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(lettersRef.current.filter(Boolean), { opacity: 0, y: 12 });
      gsap.set(statsRef.current.filter(Boolean), { opacity: 0, y: 22 });

      const drive = gsap.to(car, {
        x: getTravelDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const carLeft = Number(gsap.getProperty(car, "x"));
          const carCenter = carLeft + car.offsetWidth * 0.5;

          gsap.set(trail, {
            scaleX: Math.min(1, carCenter / road.clientWidth),
          });

          lettersRef.current.forEach((letter) => {
            if (!letter) return;
            const letterCenter =
              letter.offsetLeft + letter.offsetWidth / 2;
            gsap.to(letter, {
              opacity: carCenter >= letterCenter ? 1 : 0,
              y: carCenter >= letterCenter ? 0 : 12,
              duration: 0.12,
              overwrite: true,
            });
          });
        },
      });

      statsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.to(card, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: `top+=${300 + index * 190} top`,
            end: `top+=${470 + index * 190} top`,
            scrub: true,
          },
        });
      });

      // Refresh after images/fonts/layout settle.
      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => drive.scrollTrigger?.kill();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <section className="drive-section" ref={sectionRef}>
        <div className="stage">
          <div className="stage-label">
            <span className="stage-dot" /> ITZ FIZZ <span>SCROLL EXPERIENCE</span>
          </div>

          <div className="road" ref={roadRef}>
            <div className="road-lane" />
            <div className="green-trail" ref={trailRef} />
            <div className="headline" aria-label={headline}>
              {letters.map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  ref={(el) => { lettersRef.current[index] = el; }}
                  className={letter === " " ? "letter space" : "letter"}
                  aria-hidden="true"
                >
                  {letter === " " ? "\u00a0" : letter}
                </span>
              ))}
            </div>
            <div className="car" ref={carRef}>
              <Car />
            </div>
          </div>

          {stats.map((stat, index) => (
            <article
              key={stat.value}
              className={`stat-card ${stat.color} ${stat.position}`}
              ref={(el) => { statsRef.current[index] = el; }}
            >
              <strong>{stat.value}</strong>
              <span>{stat.text}</span>
            </article>
          ))}

          <div className="stage-footer">
            <span>SCROLL TO DRIVE ↓</span>
            <span>01 — 04</span>
          </div>
        </div>
      </section>

      <section className="next-section">
        <p>ITZ FIZZ / INTERACTIVE EXPERIENCE</p>
        <h2>You made it.</h2>
        <span>Scroll-driven motion. One journey from start to finish.</span>
      </section>
    </main>
  );
}
