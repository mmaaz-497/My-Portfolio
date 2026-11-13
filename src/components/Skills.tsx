'use client';

import Image from 'next/image';
import { skillGroups } from '@/data/skills';
import { useView } from './three/useView';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import TiltCard from './ui/TiltCard';

export default function Skills() {
  const { enabled, quality } = useView();
  // On desktop with the full scene, the icons also orbit the 3D core in the
  // right half of the screen, so the list keeps to the left column. Everywhere
  // else (phones, low-power devices, no WebGL) the list uses the full width.
  const orbiting = enabled && quality === 'high';

  return (
    <section id="skills" className="relative px-5 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className={orbiting ? 'lg:max-w-[52%]' : ''}>
          <SectionHeading
            index="02"
            align={orbiting ? 'left' : 'center'}
            eyebrow="My Tech Stack"
            title={
              <>
                Skills & <span className="text-gradient">Technologies</span>
              </>
            }
            subtitle="Cutting-edge technologies I leverage to build exceptional digital experiences"
          />

          <div className={`grid gap-5 ${orbiting ? 'sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
            {skillGroups.map((group, i) => (
              <Reveal key={group.title} variant="tilt" delay={i * 0.08} className="h-full">
                <TiltCard className="h-full rounded-2xl" contentClassName="p-5" max={8}>
                  <div data-depth="1" className="flex items-center justify-between">
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent">{group.title}</h3>
                    <span className="chip-3d !rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold">
                      <span className="sr-only">Skills in this group: </span>
                      {String(group.skills.length).padStart(2, '0')}
                    </span>
                  </div>
                <ul className="-mx-2 mt-3 space-y-0.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors duration-200 hover:bg-accent/10"
                    >
                      {/* Icons sit on a light plate so dark and light artwork both read in either theme. */}
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-plate shadow-[inset_0_1px_0_#fff,inset_0_-2px_3px_rgba(15,23,42,0.18),0_6px_12px_-6px_var(--shadow)]">
                        <Image
                          src={skill.icon}
                          alt=""
                          width={22}
                          height={22}
                          unoptimized
                          className={`h-[22px] w-[22px] object-contain ${skill.invert ? 'invert' : ''}`}
                        />
                      </span>
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    </li>
                  ))}
                </ul>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
