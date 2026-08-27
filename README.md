# BIRO.MOV — portfólio

Site do portfólio audiovisual de BIRO.MOV. Next.js 15 (App Router), catálogo em JSON
versionado, sem CMS — todo conteúdo é editado no repositório.

## Rodar

```bash
npm install
npm run dev            # http://localhost:3000
```

## Scripts

| Script | O que faz |
|--------|-----------|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção (⚠️ pare o `dev` antes — no Windows os dois brigam pelo `.next`) |
| `npm run seed` | regenera `content/*.json` a partir de `scripts/build-seed.mjs` |
| `npm run validate:catalog` | valida schema + integridade de chaves do catálogo |
| `npm run typecheck` | `tsc --noEmit` |

## Onde está o conteúdo

- `scripts/build-seed.mjs` — **fonte de verdade** dos vídeos/clientes/projetos. Edite as
  tabelas ali e rode `npm run seed`.
- `content/site.json` — textos da Home (hero, process, about, contatos), flag `pricingEnabled`.
- `content/capabilities.json`, `content/cases.json` — editados à mão (o seed não sobrescreve).
- `public/branding/` — imagens (hero, filmmaker, logo).
- `design-foundation.md` — sistema visual (cores, tipografia, HUD).

## Estrutura

- `app/` — rotas: `/` (Home), `/work` (biblioteca + modal), `/cases`, `/cases/[slug]`,
  `/pricing` (gated por `pricingEnabled`, `noindex`), `sitemap.ts`, `robots.ts`.
- `lib/catalog.ts` — leitura tipada do catálogo; remove `grade`/`status` do que vai ao cliente.
- `components/site/` — seções da Home. `components/work/` — biblioteca. `components/LiteYouTube.tsx`
  — facade do player (thumb primeiro, iframe só no play, `youtube-nocookie`).

## Deploy (Fase 6)

1. Criar/entrar numa conta na [Vercel](https://vercel.com) e conectar este repositório
   (subir para o GitHub antes).
2. Vercel detecta Next.js — build `npm run build`, sem config extra.
3. Apontar o domínio nas configurações do projeto na Vercel.
4. Trocar `https://biro.mov` em `app/robots.ts`, `app/sitemap.ts` e `metadataBase`
   (`app/layout.tsx`) pelo domínio real.
5. Cada push na branch principal redeploya automático.
