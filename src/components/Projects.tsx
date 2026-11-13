'use client';

import { useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import Image from 'next/image';
import { projectCategories, projects, type Project, type ProjectCategory } from '@/data/projects';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import TiltCard from './ui/TiltCard';
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, CarouselIcon, GridIcon } from './ui/Icons';

type Filter = 'all' | ProjectCategory;
type View = 'carousel' | 'grid';

const CATEGORY_LABEL: Record<ProjectCategory, string> = { ai: 'AI', web: 'Web', tool: 'Tool' };
// Cards further than this from the centre are hidden.
const VISIBLE_RANGE = 2;

const VIEWS: { id: View; label: string; Icon: typeof GridIcon }[] = [
  { id: 'carousel', label: 'Carousel', Icon: CarouselIcon },
  { id: 'grid', label: 'Grid', Icon: GridIcon },
];

/** Screenshot, text and link of one project. Shared by the carousel and the grid. */
function ProjectContent({ project, sizes }: { project: Project; sizes: string }) {
  return (
    <>
      {/* Rounds its own top corners: in the grid the card cannot clip without flattening its 3D layers. */}
      <div className="relative m-px aspect-video shrink-0 overflow-hidden rounded-t-[calc(1.5rem-1px)] bg-card">
        <Image
          src={project.screenshot}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes={sizes}
          // A native image drag would cancel the carousel's swipe gesture.
          draggable={false}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transform-none"
        />
        <span className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-accent backdrop-blur">
          {CATEGORY_LABEL[project.category]}
        </span>
      </div>
      {/* Fixed line counts and row heights keep every card the same size. */}
      <div className="preserve-3d flex flex-col p-5 sm:p-6">
        <h3 data-depth="1" className="truncate text-lg font-bold leading-7 text-foreground sm:text-xl">{project.title}</h3>
        <p className="mt-2 line-clamp-3 h-[4.5rem] text-sm leading-6 text-muted">{project.description}</p>
        <ul className="mt-4 flex h-[60px] flex-wrap content-start gap-1.5 overflow-hidden">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="flex h-[27px] items-center rounded-md border border-line bg-accent/5 px-2 text-[11px] font-medium text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5 w-full shrink-0 !py-3">
          Visit Live Site
          <ArrowUpRightIcon className="btn-arrow h-4 w-4" />
          <span className="sr-only"> — {project.title} (opens in a new tab)</span>
        </a>
      </div>
    </>
  );
}

function CarouselCard({ project, offset, onSelect }: { project: Project; offset: number; onSelect: () => void }) {
  const distance = Math.abs(offset);
  const isActive = offset === 0;
  const hidden = distance > VISIBLE_RANGE;

  return (
    <li
      aria-hidden={!isActive}
      // Every card sits in the same grid cell, so the carousel is as tall as
      // its content needs at any screen width (no fixed height to overflow).
      className="relative col-start-1 row-start-1 w-[min(84vw,540px)] justify-self-center transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"
      style={{
        transform: `translateX(${offset * 58}%) translateZ(${-distance * 240}px) rotateY(${offset * -30}deg)`,
        opacity: hidden ? 0 : 1 - distance * 0.35,
        zIndex: 10 - distance,
        pointerEvents: hidden ? 'none' : 'auto',
      }}
    >
      {/* Standing in space: a pool of light on the floor under the front card. */}
      <span
        className={`floor-shadow transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
      />
      {/* The front card also leans toward the pointer; side cards are covered by the button below. */}
      <TiltCard plate="" max={isActive ? 4 : 0} className="rounded-3xl">
        <article
          // Opaque (not glass): the cards overlap, and a translucent front card
          // would let the text of the ones behind it show through.
          className={`group flex flex-col overflow-hidden rounded-3xl border bg-card ${
            isActive ? 'border-accent/40 shadow-[var(--elev-3)]' : 'border-line'
          }`}
          inert={!isActive}
        >
          <ProjectContent project={project} sizes="(max-width: 640px) 84vw, 540px" />
        </article>
      </TiltCard>

      {/* Side cards act as one big "bring to front" button. */}
      {!isActive && !hidden && (
        <button
          type="button"
          tabIndex={-1}
          onClick={onSelect}
          aria-label={`Show ${project.title}`}
          className="absolute inset-0 cursor-pointer rounded-3xl"
        />
      )}
    </li>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('all');
  const [view, setView] = useState<View>('carousel');
  const [active, setActive] = useState(0);
  const swipeStart = useRef<number | null>(null);

  const list = useMemo(() => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)), [filter]);
  const current = list[active];
  const last = list.length - 1;

  const go = (index: number) => setActive(Math.min(Math.max(index, 0), last));
  const changeFilter = (next: Filter) => {
    setFilter(next);
    setActive(0);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target: Record<string, number> = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: last };
    if (!(event.key in target)) return;
    event.preventDefault();
    go(target[event.key]);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    swipeStart.current = event.clientX;
  };
  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (swipeStart.current === null) return;
    const dx = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
  };

  return (
    <section id="projects" className="relative overflow-x-clip px-5 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="04"
          eyebrow="My Work"
          title={
            <>
              Featured <span className="text-gradient">Projects</span>
            </>
          }
          subtitle="Live, deployed work — open any of them and try it yourself."
        />

        <Reveal className="mb-10 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="well flex flex-wrap justify-center gap-1 rounded-full p-1" role="group" aria-label="Filter projects by type">
            {projectCategories.map((category) => {
              const selected = filter === category.id;
              const count = category.id === 'all' ? projects.length : projects.filter((p) => p.category === category.id).length;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => changeFilter(category.id)}
                  aria-pressed={selected}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors sm:px-5 ${
                    selected ? 'key text-accent' : 'border border-transparent text-muted hover:text-foreground'
                  }`}
                >
                  {category.label} <span className="ml-1 font-mono text-xs opacity-70">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Carousel to browse one at a time, grid to see everything at once. */}
          <div className="well flex gap-1 rounded-full p-1" role="group" aria-label="Project layout">
            {VIEWS.map(({ id, label, Icon }) => {
              const selected = view === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setView(id)}
                  aria-pressed={selected}
                  className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                    selected ? 'key text-accent' : 'border border-transparent text-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {view === 'grid' ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((project, i) => (
              // Keyed by filter too, so cards replay their entrance when the filter changes.
              <li key={`${filter}-${project.id}`}>
                <Reveal variant="tilt" delay={(i % 3) * 0.07} className="h-full">
                  <TiltCard className="group h-full rounded-3xl">
                    <article className="preserve-3d flex h-full flex-col">
                      <ProjectContent project={project} sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 400px" />
                    </article>
                  </TiltCard>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal>
            <div
              role="group"
              aria-roledescription="carousel"
              aria-label="Projects. Use the left and right arrow keys to browse."
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => (swipeStart.current = null)}
              className="relative touch-pan-y select-none rounded-3xl"
              style={{ perspective: '1600px' }}
            >
              <ul className="grid" style={{ transformStyle: 'preserve-3d' }}>
                {list.map((project, i) => (
                  <CarouselCard key={project.id} project={project} offset={i - active} onSelect={() => go(i)} />
                ))}
              </ul>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4 sm:gap-5">
              <button
                type="button"
                onClick={() => go(active - 1)}
                disabled={active === 0}
                aria-label="Previous project"
                className="control-3d h-12 w-12 rounded-full !text-accent"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>

              {/* One dot per project; the active one stretches into a bar. */}
              <ul className="flex max-w-[60vw] flex-wrap items-center justify-center gap-y-1">
                {list.map((project, i) => (
                  <li key={project.id}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Show ${project.title}`}
                      aria-current={i === active ? 'true' : undefined}
                      // The padding makes a finger-sized target around a small dot.
                      className="group/dot flex h-8 items-center px-1"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all duration-500 ${
                          i === active ? 'w-7 bg-accent' : 'w-1.5 bg-muted/40 group-hover/dot:bg-accent/60'
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => go(active + 1)}
                disabled={active === last}
                aria-label="Next project"
                className="control-3d h-12 w-12 rounded-full !text-accent"
              >
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-3 text-center font-mono text-sm text-muted" aria-live="polite">
              <span className="sr-only">{current?.title}, </span>
              <span className="text-base font-bold text-foreground">{String(active + 1).padStart(2, '0')}</span> /{' '}
              {String(list.length).padStart(2, '0')}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
