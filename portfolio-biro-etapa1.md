# Portfólio Biro — Etapa 1 (Estratégia + Primeira Tarefa)

**Eixo:** diretor/produtor autoral (marca pessoal forte) → público misto, peso comercial premium.
**Associação central:** *direção cinematográfica que converte.* O diretor que faz conteúdo comercial parecer cinema — e ainda vender.
**Status:** direção para aprovação. Sem site, sem inventário (só quando você mandar o canal). Categorias, serviços e clientes abaixo são *schema* — preenchidos na curadoria.

Este documento entrega os 8 itens da tua Primeira Tarefa.

---

## 1. Arquitetura da informação

Estrutura em **uma página de scroll narrativo (Home)** + **rotas dedicadas** para o que precisa de profundidade e link compartilhável (cases e biblioteca). Isso combina o storytelling por scroll (Bruna/Monolith) com a navegação de galeria (DLVRD).

Lógica do scroll da Home — *impacto → prova → oferta → prova profunda → método → pessoa → ação*:

```
Hero (filme) → Selected Work → Clients → What I Do
→ Featured Cases (teasers) → Process → About → Contact
```

Racional, ancorado no que a Bruna faz e no que muda pro teu caso:
- **Portfólio cedo, antes de serviços.** Ela mostra antes de explicar. Pra um diretor isso é ainda mais verdadeiro — teu Selected Work é o argumento.
- **Clients vira "autoridade", não fileira de logos.** O padrão mais forte dela é apresentar cada nome com uma linha de contexto que empresta a autoridade do cliente. Recomendo o mesmo: clientes selecionados + 1 linha de quem são.
- **About perto do fim.** Quando já convenceu pelo trabalho, aí conta quem é o Biro.
- **Cases e biblioteca saem da Home** pra páginas próprias — case profundo não cabe em seção, e link de case é material comercial que você manda por DM.

---

## 2. Sitemap

```
/                         Home — scroll narrativo (as 8 seções acima)
/work                     Biblioteca filtrável (DLVRD-style: tags, formato, cliente)
/work/[slug]              Detalhe do vídeo (ou modal sobre a biblioteca)
/cases                    Índice de Featured Cases
/cases/[slug]             Case profundo, compartilhável
/pricing                  Existe, gated por pricingEnabled=false — sem link no menu
```

- Menu fixo com âncoras da Home + link "Work".
- Pricing: rota construída, componente pronto, **não renderizada nem linkada** enquanto o flag estiver falso. Nada de "Em breve".
- Detalhe de vídeo: começar como **modal** sobre a biblioteca (mais fluido, menos rota pra manter). Vira página só se você quiser SEO por vídeo depois.

---

## 3. Estrutura recomendada da Home

| Seção | O que é | Referência que puxa |
|-------|---------|--------------------|
| **Hero** | Filme horizontal do site (autoplay mudo, som opcional), nome + tagline, 1 CTA. Deixa o vídeo respirar. | CR7 (impacto/minimalismo) |
| **Selected Work** | 6–12 melhores. Grid/scroll respeitando formato: 9:16 em pé, 16:9 deitado. Preview no hover/tap. | DLVRD / Obsidian |
| **Clients** | Clientes selecionados como *autoridade*: nome/logo + 1 linha de contexto. Não precisa mostrar todos. | Bruna (Autoridade) |
| **What I Do** | 3–4 **áreas de capacidade** (não barra de skills com %). Cada uma: 1 linha de intenção + exemplo visual. | Obsidian (reinterpretado) |
| **Featured Cases** | 2–4 teasers levando aos cases profundos. | Monolith |
| **Process** | Timeline de scroll, na tua voz, cada etapa com o que o cliente recebe. | Monolith / Bruna |
| **About** | Primeira pessoa, foto, visão sobre imagem e narrativa. Curto, não bio genérica. | Bruna (Sobre) |
| **Contact** | CTA forte. WhatsApp + Instagram + e-mail. Sem formulário complexo. | Bruna (FAQ+CTA) |

Elemento a considerar (a Bruna usa e funciona): uma micro-**escassez/disponibilidade** perto do CTA ("agenda aberta pra X projetos"). Opcional, decide você.

---

## 4. Taxonomia de vídeos *(proposta inicial — confirmar no inventário)*

Baseada só no que você descreveu. Hipótese, não classificação final.

**Categorias candidatas:** Social Films · Commercial / Sales · Brand / Institutional · Interviews · Real Estate / Architecture · Special Projects.

**Eixos de filtro na biblioteca:**
- Categoria (acima)
- Formato: 9:16 · 16:9 · outros
- Cliente
- Tier de curadoria: Selected · Portfolio · Archive

**Tiers = filtros sobre a mesma base**, não bases separadas:
- **Selected** — os 6–12, aparecem na Home.
- **Portfolio** — seleção ampla, aparece em /work.
- **Archive** — catalogado, oculto por padrão.

Curadoria interna A/B/C (nota tua, não pública): A = representa forte teu nível hoje · B = complementar · C = não usar.

---

## 5. Estrutura de dados recomendada

Modelo pronto pro Claude Code (interfaces enxutas, catálogo editável). Três entidades: `Client`, `Project`, `Video`.

```ts
interface Client {
  id: string;
  name: string;
  logo?: string;
  context?: string;      // "1 linha de autoridade" — quem é o cliente
  featured: boolean;     // aparece na seção Clients
  order: number;
}

interface Project {         // campanha que agrupa vários vídeos
  id: string;
  clientId: string | null; // null = trabalho autoral/pessoal
  name: string;
  year?: number;
  isCase: boolean;         // vira Featured Case?
  caseSlug?: string;
  order: number;
}

interface Video {
  id: string;
  youtubeId: string;
  url: string;
  title: string;
  description?: string;
  thumbnail: string;       // ver risco #2 sobre thumb de vertical
  clientId: string | null;
  projectId: string | null;
  category: string;        // do §4, após aprovação
  format: "9:16" | "16:9" | "other";
  year?: number;
  tags: string[];
  tier: "selected" | "portfolio" | "archive";
  grade: "A" | "B" | "C";  // interno, não público
  role?: string[];         // ["direção","edição","cor"] — reforça o autoral
  featured: boolean;       // destaque dentro da categoria
  order: number;
  status: "published" | "draft" | "hidden";
}
```

Fonte dos vídeos: **YouTube por embed/ID**. Nada de duplicar arquivo. O catálogo vive num JSON (ou CMS leve — ver risco #4).

---

## 6. Organização entre cliente, projeto e vídeo

```
Cliente ──1:N── Projeto/Campanha ──1:N── Vídeo
```

- Cada vídeo aponta pra um **projeto**; o projeto aponta pro **cliente** (ou `null` = autoral).
- Vários vídeos da mesma campanha = mesmo `projectId` → agrupam automaticamente (resolve teu exemplo Cliente A → Projeto X → Vídeos 01/02/03).
- Um **projeto** com `isCase: true` vira Featured Case e puxa seus vídeos.
- Curadoria (tier + grade) é atributo do **vídeo** — independente de cliente/projeto.
- Nada de tratar cada vídeo como projeto solto.

---

## 7. Fluxo Claude · Claude Design · Claude Code

| Etapa | Ferramenta | Entrega |
|-------|-----------|---------|
| **1 Estratégia** | Claude (chat) | Este documento. Aprovação. |
| **2 Inventário** | Claude (chat) | Levanto os vídeos, monto tabela na taxonomia do §5, você marca A/B/C e confirma categorias/clientes. |
| **3 Design** | **Claude Design** | Exploro UI/UX, sistema visual, tratamento do vertical, microinterações — antes de qualquer código. Você aprova a direção. |
| **4 Code** | **Claude Code** | Implemento com os dados reais e o design aprovado. Componentes reutilizáveis, performance, SEO, analytics. |

Regra: cada etapa só começa com a anterior aprovada. Design não começa sem curadoria fechada; código não começa sem design aprovado.

---

## 8. Riscos técnicos e decisões a resolver antes do dev

Em ordem de impacto:

**1. Como levantar a lista de vídeos (bloqueador da Etapa 2).**
Não consigo raspar o canal inteiro de forma confiável só pela URL. Opções: (a) você gera uma **chave da YouTube Data API** — eu puxo tudo estruturado; (b) você me manda um **export/lista** (a página de vídeos do canal já serve); (c) levantamos semi-manual. A (a) é a mais limpa. **Decisão sua.**

**2. Thumbnail de vídeo vertical (sutil e importante).**
A thumb que o YouTube gera é **16:9 mesmo pra vídeo 9:16** — ou seja, vem com tarjas pretas. Se a galeria vertical usar a thumb do YouTube, o vertical fica feio (o oposto do que você quer). Opções: gerar **poster frames verticais próprios** pros 9:16 (melhor resultado) ou aceitar a thumb padrão. Recomendo posters próprios pros Selected/verticais. **Decisão sua** (afeta trabalho de curadoria).

**3. Embed de 9:16 sem tarjas.**
O iframe padrão do YouTube adiciona controles/moldura que atrapalham o vertical. Solução: **facade + lite-youtube-embed** (carrega thumb primeiro, player só no play — já atende teu requisito de performance) com wrapper de aspecto correto. Resolvo no dev, mas fica registrado.

**4. Onde o catálogo é editado ("fácil de atualizar").**
JSON versionado (simples, eu edito/você edita no código) vs. **CMS leve** (Sanity/Airtable — você edita sozinho sem tocar código). Se você quer autonomia pra adicionar vídeo depois sem mim, vale o CMS. **Decisão sua.**

**5. Stack.**
Recomendo **Next.js** (SSR/SEO + rotas de case + fácil no Claude Code) ou **Astro** (mais leve, ótimo Core Web Vitals) se o site for majoritariamente estático. Inclino pra Next pelos cases e escala. **A confirmar no design.**

**6. SEO com vídeo.** Embed não gera SEO sozinho — precisa de `VideoObject` schema + títulos/descrições reais por vídeo. Barato de fazer, decidir se cada vídeo terá rota própria (§2).

**7. Menores:** domínio; analytics (GA4 vs Plausible); e o flag `pricingEnabled=false` (trivial — componente existe, não renderiza).

---

## Próximo passo

Preciso de você em 3 pontos pra destravar a Etapa 2:
1. Aprovar (ou ajustar) ordem da Home e as categorias candidatas do §4.
2. Decidir como levanto os vídeos (risco #1).
3. Mandar o **URL do canal**.

Com isso eu abro o inventário na taxonomia do §5 e te devolvo pronto pra marcar A/B/C.
