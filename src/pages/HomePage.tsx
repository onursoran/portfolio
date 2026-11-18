import { site } from '../data/site';
import { usePageMeta } from '../lib/hooks';
import { About } from '../sections/About';
import { Contact } from '../sections/Contact';
import { Hero } from '../sections/Hero';
import { Motorsport } from '../sections/Motorsport';
import { Projects } from '../sections/Projects';
import { Skills } from '../sections/Skills';

export default function HomePage() {
  usePageMeta(site.title, site.description);
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Motorsport />
      <Skills />
      <Contact />
    </>
  );
}
