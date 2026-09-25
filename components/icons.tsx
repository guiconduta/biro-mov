// Ícones minimalistas (traço fino, grid 24). Sempre decorativos: quem usa dá o aria-label ao link.

type P = { size?: number; className?: string };
const base = (size = 20) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
  focusable: false as const,
});

export function IconInstagram({ size, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconYoutube({ size, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.2 9.4v5.2l4.5-2.6z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconMail({ size, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.6 7.2 12 13l8.4-5.8" />
    </svg>
  );
}

export function IconPhone({ size, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5.5 4h3l1.5 4-2 1.3a10 10 0 0 0 5.7 5.7L15 13l4 1.5v3A2 2 0 0 1 17 19.5 13.5 13.5 0 0 1 4.5 7 2 2 0 0 1 5.5 4z" />
    </svg>
  );
}

export function IconArrow({ size, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function IconMouse({ size = 26, className }: P) {
  return (
    <svg {...base(size)} viewBox="0 0 24 32" className={className}>
      <rect x="4" y="2" width="16" height="28" rx="8" />
      <path className="mouse__wheel" d="M12 8v5" />
    </svg>
  );
}

export function IconPlay({ size = 22, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M8.5 5.5v13l10-6.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconClose({ size, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

/* ---- "Por que me escolher?" ---- */
export function IconUsers({ size, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3.5 19c.6-3.1 2.8-5 5.5-5s4.9 1.9 5.5 5" />
      <path d="M15.5 5.6a3 3 0 0 1 0 5.8M17.5 14.3c1.7.6 2.8 2.2 3.1 4.7" />
    </svg>
  );
}
export function IconPalette({ size, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.3 0 1.9-.8 1.9-1.7 0-1.3-1.2-1.6-1.2-2.8 0-1 .8-1.7 1.8-1.7h2.2a3.8 3.8 0 0 0 3.8-3.8c0-3.9-3.8-7-8.5-7z" />
      <circle cx="7.8" cy="11" r=".9" fill="currentColor" stroke="none" />
      <circle cx="10" cy="7.3" r=".9" fill="currentColor" stroke="none" />
      <circle cx="14.4" cy="7.3" r=".9" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function IconEye({ size, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M2.5 12S5.8 5.8 12 5.8 21.5 12 21.5 12 18.2 18.2 12 18.2 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.8" />
    </svg>
  );
}
export function IconSparkle({ size, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M11 3.5c.5 4.1 2 5.6 6.1 6.1-4.1.5-5.6 2-6.1 6.1-.5-4.1-2-5.6-6.1-6.1 4.1-.5 5.6-2 6.1-6.1z" />
      <path d="M18 14.5c.2 1.8.9 2.5 2.7 2.7-1.8.2-2.5.9-2.7 2.7-.2-1.8-.9-2.5-2.7-2.7 1.8-.2 2.5-.9 2.7-2.7z" />
    </svg>
  );
}
export function IconChart({ size, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 4.5v15h16" />
      <path d="M8.5 16v-4M12.5 16V8.5M16.5 16v-6" />
    </svg>
  );
}
export function IconClipboard({ size, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="5" y="5" width="14" height="15.5" rx="2.5" />
      <path d="M9 5V3.8h6V5" />
      <path d="m9 12.8 2 2 4-4.3" />
    </svg>
  );
}
