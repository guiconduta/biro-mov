import Image from "next/image";
import { site } from "@/lib/catalog";

export function About() {
  const { text, photo } = site.about;
  return (
    <section className="section section--jade" id="about">
      <div className="wrap about-grid">
        <Image src={photo} alt="Biro" width={460} height={300} sizes="(max-width:800px) 100vw, 460px" style={{ width: "100%", height: "auto" }} />
        <div className="about__body">
          <span className="eyebrow">About</span>
          <span className="topic__rule" />
          <h2>Faço conteúdo comercial parecer cinema — e ainda vender.</h2>
          {text ? (
            text.split("\n\n").map((para, i) => <p key={i}>{para}</p>)
          ) : (
            <>
              <p className="todo">
                [texto em 1ª pessoa — pendente. Visão sobre imagem e narrativa, curto, sem bio
                genérica de currículo.]
              </p>
              <p className="todo">[segunda linha — o que te move como diretor.]</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
