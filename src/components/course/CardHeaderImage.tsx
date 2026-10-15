import type { ReactNode } from "react";
import type { CardHeaderImageProps } from "../props";
import type { HeaderPattern } from "@/types/hub";

/**
 * Inline SVG recreations of Moodle's generated course patterns (and the MAT112
 * uploaded banner). Inline SVG means no image request, so headers never delay
 * paint. Base colours were sampled from the production screenshot.
 */

const W = 324;
const H = 220;

/** Deterministic 0..1 sequence so each course's pattern is stable across renders. */
function rng(seed: number) {
  let s = seed % 2147483647 || 1;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function tealWaves(r: () => number) {
  const bands: ReactNode[] = [];
  for (let i = -2; i < 12; i++) {
    const x = i * 32;
    const amp = 18 + r() * 10;
    const d = `M${x} -10 C ${x + amp} 50, ${x - amp} 110, ${x} 160 S ${x + amp} 230, ${x} 240`;
    bands.push(
      <path key={i} d={d} fill="none" stroke="#5FC4C4" strokeOpacity={0.18 + r() * 0.25} strokeWidth={10 + r() * 14} />,
    );
  }
  return (
    <>
      <rect width={W} height={H} fill="#8FEAEA" />
      {bands}
    </>
  );
}

function circles(base: string, r: () => number, dark: string) {
  const items: ReactNode[] = [];
  const R = 52;
  for (let y = 0; y <= H + R; y += R) {
    for (let x = 0; x <= W + R; x += R) {
      const op = 0.04 + r() * 0.14;
      items.push(
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={R}
          fill={r() > 0.5 ? dark : "#ffffff"}
          fillOpacity={op}
          stroke={dark}
          strokeOpacity={0.08}
        />,
      );
    }
  }
  return (
    <>
      <rect width={W} height={H} fill={base} />
      {items}
    </>
  );
}

function grayHexagons(r: () => number) {
  const items: ReactNode[] = [];
  const s = 46; // octagon/square tiling as in production
  for (let y = -s; y < H + s; y += s * 1.6) {
    for (let x = -s; x < W + s; x += s * 1.6) {
      const a = s * 0.41;
      const pts = [
        [x + a, y],
        [x + s - a, y],
        [x + s, y + a],
        [x + s, y + s - a],
        [x + s - a, y + s],
        [x + a, y + s],
        [x, y + s - a],
        [x, y + a],
      ]
        .map((p) => p.join(","))
        .join(" ");
      items.push(
        <polygon
          key={`${x}-${y}`}
          points={pts}
          fill={r() > 0.5 ? "#7D8A90" : "#ffffff"}
          fillOpacity={0.05 + r() * 0.16}
          stroke="#ffffff"
          strokeOpacity={0.25}
        />,
      );
    }
  }
  return (
    <>
      <rect width={W} height={H} fill="#B2BEC3" />
      {items}
    </>
  );
}

function pinkDiamonds(r: () => number) {
  const items: ReactNode[] = [];
  const s = 34;
  for (let y = -s; y < H + s; y += s) {
    for (let x = -s; x < W + s; x += s) {
      const ox = (Math.round(y / s) % 2) * (s / 2);
      const cx = x + ox;
      items.push(
        <polygon
          key={`${x}-${y}`}
          points={`${cx},${y - s / 2} ${cx + s / 2},${y} ${cx},${y + s / 2} ${cx - s / 2},${y}`}
          fill={r() > 0.45 ? "#B4486F" : "#ffffff"}
          fillOpacity={0.05 + r() * 0.2}
        />,
      );
    }
  }
  return (
    <>
      <rect width={W} height={H} fill="#F27AA5" />
      {items}
    </>
  );
}

function purpleLowpoly(r: () => number, overlayText?: string) {
  const shards: ReactNode[] = [];
  const colours = ["#7FD3F5", "#55B6EA", "#9A6BD0", "#C2368F", "#E05BB0", "#3E95CB"];
  for (let i = 0; i < 26; i++) {
    const topRight = i < 14;
    const cx = topRight ? 170 + r() * 160 : r() * 150;
    const cy = topRight ? r() * 90 : 130 + r() * 90;
    const k = 16 + r() * 34;
    shards.push(
      <polygon
        key={i}
        points={`${cx},${cy} ${cx + k},${cy + k * (r() - 0.3)} ${cx + k * (r() - 0.5)},${cy + k}`}
        fill={colours[Math.floor(r() * colours.length)]}
        fillOpacity={0.55 + r() * 0.4}
      />,
    );
  }
  return (
    <>
      <defs>
        <linearGradient id="mat-bg" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4FA5DA" />
          <stop offset="0.5" stopColor="#6576BE" />
          <stop offset="1" stopColor="#B83790" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#mat-bg)" />
      {shards}
      {/* UFE mark */}
      <g transform="translate(148 46)" fill="#ffffff">
        <rect x="0" y="0" width="28" height="5" rx="1" />
        <rect x="4" y="9" width="24" height="5" rx="1" />
        <rect x="0" y="18" width="28" height="5" rx="1" />
        <rect x="6" y="0" width="3" height="23" fill="#6576BE" />
      </g>
      {overlayText && (
        <text
          x={W / 2}
          y={110}
          textAnchor="middle"
          fill="#ffffff"
          fontSize="15"
          fontWeight="800"
          letterSpacing="0.5"
          style={{ fontFamily: "var(--font-manrope), sans-serif" }}
        >
          {splitTwoLines(overlayText).map((line, i) => (
            <tspan key={i} x={W / 2} dy={i === 0 ? 0 : 18}>
              {line}
            </tspan>
          ))}
        </text>
      )}
    </>
  );
}

function splitTwoLines(text: string): string[] {
  const words = text.split(" ");
  if (words.length < 3) return [text];
  return [words.slice(0, -1).join(" "), words[words.length - 1]];
}

function render(pattern: HeaderPattern, seed: number, overlayText?: string) {
  const r = rng(seed);
  switch (pattern) {
    case "teal-waves":
      return tealWaves(r);
    case "purple-lowpoly":
      return purpleLowpoly(r, overlayText);
    case "gray-hexagons":
      return grayHexagons(r);
    case "green-circles":
      return circles("#3DB596", r, "#0A7F67");
    case "blue-circles":
      return circles("#93DEDE", r, "#3F9C9C");
    case "pink-diamonds":
      return pinkDiamonds(r);
  }
}

export function CardHeaderImage({ header, seed }: CardHeaderImageProps) {
  if (header.imageUrl) {
    // Uploaded Moodle course image. Decorative: the title below names the course.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={header.imageUrl} alt="" className="h-card-header w-full object-cover" />;
  }
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="block h-card-header w-full"
      aria-hidden="true"
      focusable="false"
    >
      {render(header.pattern, seed, header.overlayTextMn)}
    </svg>
  );
}
