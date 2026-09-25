import "./home.css";
import { SHOWREEL } from "@/content/home.config";
import { Navigation } from "@/components/site/Navigation";
import { Hero } from "@/components/site/Hero";
import { Showreel } from "@/components/site/Showreel";
import { SelectedWorks } from "@/components/site/SelectedWorks";
import { About } from "@/components/site/About";
import { Clients } from "@/components/site/Clients";
import { Workflow } from "@/components/site/Workflow";
import { WhyMe } from "@/components/site/WhyMe";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { ScrollTimecode } from "@/components/ui/ScrollTimecode";

// Ordem fixa da Home: 01 Hero · 02 Showreel · 03 Trabalhos · 04 Sobre ·
// 05 Clientes e experiências · 06 Como trabalho · 07 Por que me escolher · 08 Contato
export default function HomePage() {
  return (
    <>
      <Navigation intro />
      <main id="main">
        <Hero />
        <Showreel config={SHOWREEL} />
        <SelectedWorks />
        <About />
        <Clients />
        <Workflow />
        <WhyMe />
        <Contact />
      </main>
      <Footer />
      <ScrollTimecode />
    </>
  );
}
