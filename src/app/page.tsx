import { Header, Hero, AboutMe, Skills, Projects, Experience, Contact, Footer, LoadingScreen } from '@/components';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F1F1F1] font-sans relative">
      <LoadingScreen />
      <ScrollProgress />
      <Header />
      <Hero />
      <AboutMe />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}
