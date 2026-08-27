/**
 * URL canônica do site. Usada em metadata, sitemap e robots.
 *
 * Ordem: env var explícita > domínio de produção da Vercel > fallback.
 * Quando o domínio próprio entrar, defina NEXT_PUBLIC_SITE_URL nas
 * Environment Variables da Vercel (ex.: https://biro.mov) — nada de código muda.
 */
const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const SITE_URL = (fromEnv || fromVercel || "https://biro-mov.vercel.app").replace(/\/$/, "");
