'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-teal-900 to-black text-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 flex flex-wrap md:flex-nowrap justify-between items-center px-6 py-4 bg-black/90 backdrop-blur shadow-md border-b border-teal-600">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-teal-400 tracking-wide mb-2 md:mb-0 drop-shadow-lg">Muhammad Maaz</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-base sm:text-lg">
          <Link href="#" className="hover:text-teal-300 transition duration-300">Home</Link>
          <Link href="#skills" className="hover:text-teal-300 transition duration-300">Skills</Link>
          <Link href="#projects" className="hover:text-teal-300 transition duration-300">Projects</Link>
          <Link href="#contact" className="hover:text-teal-300 transition duration-300">Contact</Link>
          <Link href="https://github.com/mmaaz-497" target="_blank" className="hover:text-teal-300 transition duration-300">GitHub</Link>
          <Link href="https://www.linkedin.com/in/muhammad-maaz-5448b5336?" target="_blank" className="hover:text-teal-300 transition duration-300">LinkedIn</Link>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <details className="relative">
            <summary className="cursor-pointer text-teal-400 font-semibold">Menu</summary>
            <div className="absolute right-0 mt-2 bg-black border border-teal-700 rounded-lg shadow-lg p-4 z-50 flex flex-col space-y-3 text-sm">
              <Link href="#" className="hover:text-teal-300">Home</Link>
              <Link href="#skills" className="hover:text-teal-300">Skills</Link>
              <Link href="#projects" className="hover:text-teal-300">Projects</Link>
              <Link href="#contact" className="hover:text-teal-300">Contact</Link>
              <Link href="https://github.com/mmaaz-497" target="_blank" className="hover:text-teal-300">GitHub</Link>
              <Link href="https://www.linkedin.com/in/muhammad-maaz-5448b5336?" target="_blank" className="hover:text-teal-300">LinkedIn</Link>
            </div>
          </details>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 py-20 bg-gradient-to-b from-teal-900 via-teal-800 to-black">
        <motion.h2
          className="text-5xl md:text-7xl font-extrabold text-teal-400 mb-6 drop-shadow-xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hi, I&apos;m Agentic AI & Full-Stack Developer
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg md:text-2xl max-w-5xl text-teal-200 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          I am an <b>Agentic AI Developer</b> and <b>Full-Stack Engineer</b> specializing in building intelligent, scalable, and high-performance digital solutions. With expertise in <b>Next.js, Node.js, Python, Streamlit, and the OpenAI Agents SDK</b>, I design systems that combine strong engineering with advanced <b>AI automation.</b>
My work focuses on delivering <b>AI chatbots, agentic workflow automation, full-stack web applications, data tools, and seamless API integrations</b>—all built with precision, innovation, and fast turnaround. I approach every project with a problem-solving mindset, ensuring smooth execution even for complex requirements.
As an independent developer, my goal is to help businesses leverage the power of <b>AI</b> and <b>agentic systems</b> to operate smarter, faster, and more efficiently. I am committed to creating intelligent experiences that not only perform but scale—moving towards a long-term vision of becoming an <b>AI Architect </b>who builds next-generation <b>agentic ecosystems</b>, automation pipelines, and intelligent applications.
        </motion.p>
      </section>

      {/* Skills Section */}
      <section id="skills" className="px-6 py-20 bg-gradient-to-b from-black via-teal-900 to-teal-950">
        <h3 className="text-3xl md:text-5xl font-bold mb-10 text-center text-teal-400 drop-shadow-md">My Skills</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 text-center text-teal-100 font-medium">
          {[
            'HTML', 'CSS', 'JavaScript', 'TypeScript',
            'React', 'Tailwind CSS', 'Node.js', 'Next.js',
            'Python','Figma','Sanity','Streamlit',
            'OpenAI Agents SDK', 'Git & GitHub','Prompt & Context Engineering'
          ].map((skill, index) => (
            <div key={index} className="bg-gradient-to-tr from-orange-500 to-orange-700 rounded-xl shadow-lg hover:shadow-orange-500 p-5 border border-orange-600 transition duration-300 cursor-pointer text-black font-semibold">
              {skill}
            </div>
          ))}
        </div>
        <p className="text-center mt-8 text-teal-300 text-sm">
          I specialize in programming languages with practical experience in user interface design and managing data workflows.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-6 py-20 bg-[#0a0a0a]">
        <h3 className="text-3xl md:text-5xl font-bold mb-12 text-center text-teal-400 drop-shadow-md">My Projects</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Growth Mindset App', url: 'https://mmaaz-497-growth-mindset-app-gfeevb.streamlit.app/' },
            { title: 'CV Generator', url: 'https://dynamic-resume-builder-xi-orcin.vercel.app/' },
            { title: 'Personal Library', url: 'https://rk-personallibrarymanager.streamlit.app/' },
            { title: 'Unit Convertor', url: 'https://mmaaz-497-unit-convertor-app-unit-convertor-sht9oj.streamlit.app/' },
            { title: 'Interative Resume', url: 'https://static-interactive-resume-ochre-one.vercel.app/' },
            { title: 'Blog Website', url: 'https://blog-website-beige-psi.vercel.app/' },
            { title: 'Resturant Website', url: 'https://quick-commerce-hackathon-zthw.vercel.app/' },
            { title: 'Password Strength Meter', url: 'https://mmaaz-497-password-strength-meter-password-generator-5nohxp.streamlit.app/' },
            { title: 'Task Manager', url: 'https://task-manager-one-psi-50.vercel.app/'},
            { title: 'Random Joke Generator ', url: 'https://mmaaz-497-random-joke-genrator-main-0mjngs.streamlit.app/'},
            { title: 'Planets Weight Calculator', url: 'https://mmaaz-497-time-zone-convertor-main-ossttg.streamlit.app/'},
            { title: 'Time Zone Converter', url: 'https://mmaaz-497-time-zone-convertor-main-ossttg.streamlit.app/'},
            { title: 'Cafe Management System', url: 'https://mmaaz-497-cafe-managment-system-main-tkwitb.streamlit.app/'},
            { title: 'Cooking Recipies AI Agent:', url: 'https://mmaaz-497-cooking-recipies-ai-agent-main-owgks1.streamlit.app/'},
            { title: 'Agentic Essay Pilot:', url: 'https://agentic-essay-pilot.vercel.app/'},

          ].map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-tr from-teal-900 to-black p-6 rounded-xl shadow-lg border border-teal-700 hover:shadow-orange-500 hover:bg-orange-900 transition duration-300"
            >
              <h4 className="text-xl font-semibold mb-2 text-orange-400">{project.title}</h4>
              <p className="text-sm text-teal-200 break-words">{project.url}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20 bg-gradient-to-b from-teal-950 via-teal-900 to-black">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center text-teal-400 drop-shadow-md">Contact Me</h2>
        <p className="text-center text-teal-200 mb-6 text-base sm:text-lg">
          Open to professional collaborations and project opportunities. Let&apos;s connect.
        </p>
        <div className="flex flex-col items-center gap-3 text-base sm:text-lg">
          <Link href="mailto:mmaazjatt497@gmail.com" className="text-teal-400 hover:underline">mmaazjatt497@gmail.com</Link>
          <Link href="https://github.com/mmaaz-497" target="_blank" className="text-teal-400 hover:underline">GitHub Profile</Link>
          <Link href="https://www.linkedin.com/in/muhammad-maaz-5448b5336?" target="_blank" className="text-teal-400 hover:underline">LinkedIn Profile</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-teal-300 py-6 border-t border-teal-800 bg-black text-sm drop-shadow-md">
        &copy; {new Date().getFullYear()} Muhammad Maaz. Crafted with 🧡 using Next.js & Tailwind CSS.
      </footer>
    </main>
  );
}
