import { useEffect, useRef, useState } from "react";

// Each layout has its own viewBox and quadratic bezier: [start, control, end]
const LAYOUTS = {
  // Laptop/desktop (>= 1024px): big curve behind the heading
  desktop: {
    viewBox: "0 0 1200 400",
    points: [[-20, 330], [600, -80], [1220, 260]],
    planeScale: 1.8,
    className:
      "pointer-events-none absolute inset-x-0 top-0 h-auto w-full text-primary",
  },
  // Phones/tablets (< 1024px): sits in the gap between the logo and the heading
  compact: {
    viewBox: "0 0 400 130",
    points: [[-20, 115], [200, -35], [420, 115]],
    planeScale: 1.6,
    className:
      "pointer-events-none mx-auto mt-2 block h-auto w-full max-w-xl text-primary " +
      "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
  },
};

const T_START = 0.5;   // peak of the curve
const T_END = 0.78;    // parked position
const DURATION = 2800; // ms
const DELAY = 300;     // ms

function pointAt([p0, p1, p2], t) {
  const u = 1 - t;
  const x = u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0];
  const y = u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1];
  const dx = 2 * u * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
  const dy = 2 * u * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
  return { x, y, angle };
}

const easeInOut = (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);

const transformFor = (layout, t) => {
  const { x, y, angle } = pointAt(layout.points, t);
  return `translate(${x} ${y}) rotate(${angle}) scale(${layout.planeScale}) translate(-12 -12)`;
};

function useIsDesktop() {
  const query = "(min-width: 1024px)";
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}

// Decorative dotted flight path with a plane. Change colors via Tailwind classes.
export default function FlightPath() {
  const planeRef = useRef(null);
  const isDesktop = useIsDesktop();
  const layout = isDesktop ? LAYOUTS.desktop : LAYOUTS.compact;
  const [p0, p1, p2] = layout.points;

  useEffect(() => {
    const plane = planeRef.current;
    if (!plane) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      plane.setAttribute("transform", transformFor(layout, T_END));
      return;
    }

    let frame;
    let startTime;

    const step = (now) => {
      if (startTime === undefined) startTime = now;
      const elapsed = now - startTime - DELAY;
      const p = Math.min(Math.max(elapsed / DURATION, 0), 1);
      const t = T_START + (T_END - T_START) * easeInOut(p);
      plane.setAttribute("transform", transformFor(layout, t));
      if (p < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [layout]);

  return (
    <svg className={layout.className} viewBox={layout.viewBox} fill="none" aria-hidden="true">
      <path
        d={`M ${p0[0]} ${p0[1]} Q ${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]}`}
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 16"
      />
      <g ref={planeRef} transform={transformFor(layout, T_START)} fill="currentColor">
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
      </g>
    </svg>
  );
}