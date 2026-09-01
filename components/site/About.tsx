import Image from "next/image";
import { site } from "@/lib/catalog";

export function About() {
  const { text, photo } = site.about;
  return (
    <section className="section" id="about">
      <div className="wrap about-grid">
        <Image
          src={photo}
          alt="Biro"
          width={440}
          height={300}
          sizes="(max-width:800px) 100vw, 440px"
          style={{ width: "100%", height: "auto" }}
        />
        <div className="about__body">
          <span className="eyebrow"><span className="eyebrow__n">06</span>Sobre</span>
          <h2>Faço conteúdo comercial parecer cinema — e ainda vender.</h2>
          {text ? (
            text.split("\n\n").map((para, i) => <p key={i}>{para}</p>)
          ) : (
            <>
              <p>
                [texto em 1ª pessoa — pendente. Visão sobre imagem e narrativa, curto, sem bio
                genérica de currículo.]
              </p>
              <p>[segunda linha — o que te move como diretor.]</p>
            </>
          )}

          <dl className="about__meta">
            <div>
              <dt>Papéis</dt>
              <dd>Direção · Edição · Cor</dd>
            </div>
            <div>
              <dt>Base</dt>
              <dd translate="no">Joinville, SC</dd>
            </div>
            <div>
              <dt>Foco</dt>
              <dd>Social · Comercial · Imobiliário</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
