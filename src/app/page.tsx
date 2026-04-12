import { Header, Hero, AboutMe, Skills, Projects, Contact, Footer, Testimonials, Experience, Services, Certifications, Blog, Newsletter, LoadingScreen, ThemeToggle } from '@/components';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-teal-900 to-black text-white font-sans">
      <LoadingScreen />
      <ScrollProgress />
      <Header />
      <ThemeToggle />
      <Hero />
      <AboutMe />
      <Services />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Testimonials />
      <Blog />
      <Newsletter />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}
