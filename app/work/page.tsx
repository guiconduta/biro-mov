import type { Metadata } from "next";
import "./work.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WorkBrowser } from "@/components/work/WorkBrowser";
import { getLibrary, getCategories, getClients } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Work",
  description: "Biblioteca de trabalhos — filmes sociais, comerciais, entrevistas e projetos imobiliários.",
};

export default function WorkPage() {
  const videos = getLibrary();
  const usedClientIds = new Set(videos.map((v) => v.clientId).filter(Boolean));
  const clients = getClients()
    .filter((c) => usedClientIds.has(c.id))
    .map((c) => ({ id: c.id, name: c.name }));

  return (
    <>
      <Header />
      <main id="main" className="wrap">
        <div className="work-head">
          <span className="eyebrow">Biblioteca — SEQ. 02</span>
          <h1>Work</h1>
        </div>
        <WorkBrowser videos={videos} categories={getCategories()} clients={clients} />
      </main>
      <Footer />
    </>
  );
}
