// Ícones de linha — vocabulário de filme (design-foundation.md §3). Nunca emoji.

type P = { size?: number };
const base = (size = 24) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function IconFrame({ size }: P) {
  return (
    <svg {...base(size)} aria-hidden>
      <path d="M4 4h4M16 4h4M4 20h4M16 20h4M4 4v4M20 4v4M4 20v-4M20 20v-4" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconSequence({ size }: P) {
  return (
    <svg {...base(size)} aria-hidden>
      <rect x="3" y="5" width="10" height="3.5" rx="1" />
      <rect x="3" y="10.25" width="17" height="3.5" rx="1" />
      <rect x="3" y="15.5" width="7" height="3.5" rx="1" />
    </svg>
  );
}

export function IconMotion({ size }: P) {
  return (
    <svg {...base(size)} aria-hidden>
      <path d="M3 12c4-7 14-7 18 0M3 12c4 7 14 7 18 0" />
      <circle cx="12" cy="12" r="2.4" />
    </svg>
  );
}

export function IconPlay({ size }: P) {
  return (
    <svg {...base(size)} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5l6 3.5-6 3.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconBuilding({ size }: P) {
  return (
    <svg {...base(size)} aria-hidden>
      <path d="M4 20V8l8-4 8 4v12" />
      <path d="M4 20h16" />
      <rect x="10" y="13" width="4" height="7" />
      <path d="M8 10h.01M16 10h.01M8 13h.01M16 13h.01" />
    </svg>
  );
}
