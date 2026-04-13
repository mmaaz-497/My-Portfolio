'use client';

import { motion } from 'framer-motion';

const skills = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'OpenAI', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1200px-OpenAI_Logo.svg.png' },
  { name: 'Streamlit', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Hugging Face', icon: 'https://huggingface.co/datasets/huggingface/brand-assets/resolve/main/hf-logo.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Sanity', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sanity/sanity-original.svg' },
];

// Duplicate for seamless infinite loop
const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 lg:px-12 py-24 bg-[#0A0A0A] overflow-hidden">
      {/* Subtle particle/grid background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(0, 245, 255, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(0, 191, 255, 0.1) 0%, transparent 50%)
            `
          }}
        />
      </div>

      {/* Section Title */}
      <motion.div
        className="text-center mb-20 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#F1F1F1] tracking-tight">
          Skills & <span className="text-[#00F5FF]">Technologies</span>
        </h2>
        {/* Neon underline */}
        <div className="mt-4 mx-auto w-32 h-1.5 bg-gradient-to-r from-[#00F5FF] via-[#00BFFF] to-[#00F5FF] rounded-full relative">
          <div className="absolute inset-0 blur-md bg-[#00F5FF] opacity-50 rounded-full" />
        </div>
        <p className="mt-6 text-[#A3A3A3] text-lg max-w-2xl mx-auto">
          Cutting-edge technologies I leverage to build exceptional digital experiences
        </p>
      </motion.div>

      {/* Infinite Scrolling Marquee */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-20 pointer-events-none" />

        {/* Marquee track */}
        <div className="relative overflow-hidden">
          <div className="marquee-track flex gap-6">
            {duplicatedSkills.map((skill, index) => (
              <motion.div
                key={`${skill.name}-${index}`}
                className="flex-shrink-0 group"
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="glass-card rounded-2xl p-6 min-w-[140px] min-h-[140px] flex flex-col items-center justify-center gap-3 transition-all duration-300 cursor-pointer relative overflow-hidden group hover:border-[#00F5FF]/40 hover:shadow-[0_0_30px_rgba(0,245,255,0.2)]">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00F5FF]/0 to-[#00F5FF]/0 group-hover:from-[#00F5FF]/5 group-hover:to-transparent transition-all duration-500" />
                  
                  {/* Icon */}
                  <div className="relative w-16 h-16 flex items-center justify-center bg-[#0A0A0A] rounded-xl p-3 transition-all duration-300 group-hover:bg-[#00F5FF]/10 group-hover:shadow-[0_0_15px_rgba(0,245,255,0.3)]">
                    <img
                      src={skill.icon}
                      alt={`${skill.name} logo`}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `<span class="text-3xl">⚡</span>`;
                      }}
                    />
                  </div>
                  
                  {/* Label */}
                  <span className="text-sm font-semibold text-[#F1F1F1] group-hover:text-[#00F5FF] transition-colors duration-300 relative z-10">
                    {skill.name}
                  </span>

                  {/* Motion blur effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-[#00F5FF]/5 blur-xl" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="mt-20 mx-auto max-w-4xl h-px bg-gradient-to-r from-transparent via-[#00F5FF]/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
    </section>
  );
}
