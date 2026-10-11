import type { Metadata } from "next";
import "../home.css";
import "./work.css";
import { Navigation } from "@/components/site/Navigation";
import { Footer } from "@/components/site/Footer";
import { WorkStage } from "@/components/work/WorkStage";
import { getLibrary, getCategories, getClients } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Work",
  description: "Biblioteca de trabalhos — filmes sociais, comerciais, entrevistas e projetos imobiliários.",
};

export default function WorkPage() {
  // o palco 3D é só para os vídeos em pé; os deitados ficam fora daqui por enquanto
  const videos = getLibrary().filter((v) => v.format === "9:16");
  const usedClientIds = new Set(videos.map((v) => v.clientId).filter(Boolean));
  const clients = getClients()
    .filter((c) => usedClientIds.has(c.id))
    .map((c) => ({ id: c.id, name: c.name }));

  return (
    <>
      <Navigation />
      <main id="main">
        <WorkStage videos={videos} categories={getCategories()} clients={clients} />
      </main>
      <Footer />
    </>
  );
}
