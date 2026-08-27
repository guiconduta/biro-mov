import "./home.css";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { SelectedWork } from "@/components/site/SelectedWork";
import { Clients } from "@/components/site/Clients";
import { WhatIDo } from "@/components/site/WhatIDo";
import { FeaturedCases } from "@/components/site/FeaturedCases";
import { Process } from "@/components/site/Process";
import { MotionStrip } from "@/components/site/MotionStrip";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SelectedWork />
        <Clients />
        <WhatIDo />
        <FeaturedCases />
        <Process />
        <MotionStrip />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
