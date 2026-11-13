export interface Skill {
  name: string;
  icon: string;
  /** White-on-transparent artwork that must be drawn dark on the light icon plate. */
  invert?: boolean;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

const icon = (file: string) => `/skill-icons/${file}.svg`;

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: icon('react') },
      { name: 'Next.js', icon: icon('nextjs') },
      { name: 'TypeScript', icon: icon('typescript') },
      { name: 'Tailwind CSS', icon: icon('tailwindcss') },
    ],
  },
  {
    title: 'AI & Backend',
    skills: [
      { name: 'Python', icon: icon('python') },
      { name: 'OpenAI', icon: icon('openai'), invert: true },
      { name: 'Hugging Face', icon: icon('huggingface') },
      { name: 'Streamlit', icon: icon('streamlit') },
      { name: 'Node.js', icon: icon('nodejs') },
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'Docker', icon: icon('docker') },
      { name: 'Kubernetes', icon: icon('kubernetes') },
      { name: 'AWS', icon: icon('aws') },
      { name: 'Vercel', icon: icon('vercel') },
      { name: 'Git', icon: icon('git') },
    ],
  },
  {
    title: 'Design & CMS',
    skills: [
      { name: 'Figma', icon: icon('figma') },
      { name: 'Sanity', icon: icon('sanity') },
    ],
  },
];

export const skills: Skill[] = skillGroups.flatMap((group) => group.skills);
