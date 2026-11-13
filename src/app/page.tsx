import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutMe from '@/components/AboutMe';
import Skills from '@/components/Skills';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import Preloader from '@/components/Preloader';
import SceneCanvas from '@/components/three/SceneCanvas';
import SmoothScroll from '@/components/ui/SmoothScroll';

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      {/* The 3D scene is one fixed layer behind everything; sections scroll over it. */}
      <SceneCanvas />
      <ScrollProgress />
      <Header />
      <main id="main" tabIndex={-1} className="relative z-10 outline-none">
        <Hero />
        <AboutMe />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
