import { motion } from 'framer-motion';
import { SolarSystem } from '@/components/SolarSystem';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { ArrowRight, Mail, Code2, Briefcase, Heart, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const projects = [
  {
    title: 'Document Intelligence QnA System',
    tech: 'Python, LangChain, FAISS, Gemini',
    desc: 'RAG pipeline for semantic search and automated data extraction.',
  },
  {
    title: 'PracLeeCode',
    tech: 'JS, React, Node.js, Gemini',
    desc: 'DSA revision platform with spaced-repetition and AI grading.',
  },
  {
    title: 'SEC Financial Data Scraper',
    tech: 'Python, MySQL, Tableau',
    desc: 'Scraped 10,000+ SEC filings, reducing review time by 60%.',
  },
];

const experiences = [
  {
    title: 'Software Engineering Trainee @ DRDO',
    desc: 'Built attendance portals and RAG systems with Gemini API.',
  },
  {
    title: 'Student Body Coordinator @ IoT Lab',
    desc: 'Led a 100+ member team for 8+ technical projects.',
  },
  {
    title: 'PCR Lead @ Enactus KIIT',
    desc: 'Managed data for Project Vistaar and organized SDG competitions.',
  },
];

const skills = [
  { category: 'Languages', items: ['Python', 'Java', 'JavaScript', 'SQL'] },
  { category: 'Frameworks', items: ['Django', 'Flask', 'React', 'Express'] },
  { category: 'Cloud', items: ['AWS', 'Docker', 'CI/CD'] },
  { category: 'Tools', items: ['Git', 'Tableau', 'Matlab'] },
];

function NetflixRow({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  const rowRef = useRef<HTMLDivElement>(null);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 px-6 lg:px-12">
        {icon}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">{title}</h2>
      </div>
      <div ref={rowRef} className="flex gap-4 overflow-x-auto hide-scrollbar px-6 lg:px-12 pb-4">
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SEOHead />
      <SolarSystem />

      <div className="relative z-10 min-h-screen">
        {/* Hero */}
        <section className="relative h-screen flex flex-col items-center justify-center px-6">
          <motion.div
            className="text-center space-y-6 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              AYUSH DAS
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl font-light tracking-wide text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Technologist | Python Developer | Social Impact Advocate
            </motion.p>
          </motion.div>

          <motion.div
            className="absolute bottom-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
              <motion.div
                className="w-1.5 h-3 bg-primary rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
          </motion.div>
        </section>

        {/* About */}
        <section className="py-24 px-6 lg:px-12">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">About Me</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                As a passionate technologist with a keen interest in Python and a B.Tech in CSE from KIIT, I solve real-world problems through code. I am a drummer, traveler, and trivia enthusiast, dedicated to leveraging technology for social impact. I bring leadership, empathy, and practical know-how to every project.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Projects - Netflix row */}
        <section className="py-16">
          <ScrollReveal>
            <NetflixRow title="Projects" icon={<Code2 className="size-6 text-primary" />}>
              {projects.map((p) => (
                <motion.div
                  key={p.title}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="flex-shrink-0 w-80 bg-card border border-border rounded-xl p-6 space-y-3 cursor-default"
                >
                  <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                  <p className="text-sm text-primary font-mono">{p.tech}</p>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </motion.div>
              ))}
            </NetflixRow>
          </ScrollReveal>
        </section>

        {/* Skills */}
        <section className="py-24 px-6 lg:px-12">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto space-y-10">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground text-center">Skills</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {skills.map((s) => (
                  <div key={s.category} className="bg-card border border-border rounded-xl p-5 space-y-3">
                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">{s.category}</h3>
                    <ul className="space-y-1">
                      {s.items.map((item) => (
                        <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                          <ChevronRight className="size-3 text-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Experience - Netflix row */}
        <section className="py-16">
          <ScrollReveal>
            <NetflixRow title="Experience & Leadership" icon={<Briefcase className="size-6 text-cosmic-orange" />}>
              {experiences.map((e) => (
                <motion.div
                  key={e.title}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="flex-shrink-0 w-80 bg-card border border-border rounded-xl p-6 space-y-3 cursor-default"
                >
                  <h3 className="text-lg font-semibold text-foreground">{e.title}</h3>
                  <p className="text-sm text-muted-foreground">{e.desc}</p>
                </motion.div>
              ))}
            </NetflixRow>
          </ScrollReveal>
        </section>

        {/* Devoted to Cause */}
        <section className="py-24 px-6 lg:px-12">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="flex justify-center">
                <Heart className="size-10 text-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">Devoted to Cause</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Through my work with Enactus KIIT and beyond, I'm driven by a singular goal: innovating for the social sector. Whether it's managing data for Project Vistaar or organizing SDG competitions, I believe technology can bridge gaps and empower communities for a more equitable world.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Contact */}
        <section className="py-24 px-6 lg:px-12">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">Get in Touch</h2>
              <p className="text-lg text-muted-foreground">
                Interested in collaborating or just want to say hello? I'd love to hear from you.
              </p>
              <a
                href="mailto:dasayush483@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
              >
                <Mail className="size-5" />
                Email Me
              </a>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}
