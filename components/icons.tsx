// Ícones de linha — set do mockup de identidade (film / color / audio / motion),
// traço fino, grid 24, centrados em .icon-badge circular. Nunca emoji.

type P = { size?: number };
const base = (size = 24) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/** Edição — filmstrip */
export function IconFilm({ size }: P) {
  return (
    <svg {...base(size)} aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M3 15h18M9 4v16M15 4v16" />
    </svg>
  );
}

/** Color grading — círculos que se sobrepõem */
export function IconColor({ size }: P) {
  return (
    <svg {...base(size)} aria-hidden>
      <circle cx="9" cy="10" r="5" />
      <circle cx="15" cy="10" r="5" />
      <circle cx="12" cy="15" r="5" />
    </svg>
  );
}

/** Áudio — waveform */
export function IconAudio({ size }: P) {
  return (
    <svg {...base(size)} aria-hidden>
      <path d="M4 10v4M8 6v12M12 3v18M16 7v10M20 10v4" />
    </svg>
  );
}

/** Motion — sparkle */
export function IconMotion({ size }: P) {
  return (
    <svg {...base(size)} aria-hidden>
      <path d="M13 3l1.8 4.7L19.5 9.5 14.8 11.3 13 16l-1.8-4.7L6.5 9.5l4.7-1.8z" />
      <path d="M18 15l.7 1.8L20.5 17.5l-1.8.7L18 20l-.7-1.8L15.5 17.5l1.8-.7z" />
    </svg>
  );
}

/** Direção — frame / enquadramento */
export function IconFrame({ size }: P) {
  return (
    <svg {...base(size)} aria-hidden>
      <path d="M4 4h4M16 4h4M4 20h4M16 20h4M4 4v4M20 4v4M4 20v-4M20 20v-4" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

/** Imobiliário — edifício */
export function IconBuilding({ size }: P) {
  return (
    <svg {...base(size)} aria-hidden>
      <path d="M4 20V9l8-5 8 5v11" />
      <path d="M3 20h18" />
      <rect x="10" y="13" width="4" height="7" />
      <path d="M8 10h.01M16 10h.01" />
    </svg>
  );
}

/** Play */
export function IconPlay({ size }: P) {
  return (
    <svg {...base(size)} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5l6 3.5-6 3.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

// aliases retrocompat
export { IconFilm as IconSequence };
