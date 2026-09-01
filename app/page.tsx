import "./home.css";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { SelectedWork } from "@/components/site/SelectedWork";
import { Clients } from "@/components/site/Clients";
import { WhatIDo } from "@/components/site/WhatIDo";
import { Process } from "@/components/site/Process";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <SelectedWork />
        <Clients />
        <WhatIDo />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
