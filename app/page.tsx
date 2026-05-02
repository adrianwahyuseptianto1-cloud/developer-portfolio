"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { marquee, profile, stack, works } from "./portfolio-data";

export default function Home() {
  const [activeWork, setActiveWork] = useState(0);
  const [language, setLanguage] = useState<"id" | "en">("id");
  const time = useLocalTime(profile.timezone);
  const totalStack = Object.values(stack).reduce((sum, items) => sum + items.length, 0);
  const copy = getCopy(language);

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-language");
    if (stored === "id" || stored === "en") setLanguage(stored);
  }, []);

  const toggleLanguage = () => {
    setLanguage((value) => {
      const next = value === "id" ? "en" : "id";
      window.localStorage.setItem("portfolio-language", next);
      return next;
    });
  };

  return (
    <main>
      <section className="marquee" aria-label="Portfolio status">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}
              <b>*</b>
            </span>
          ))}
        </div>
      </section>

      <header className="site-header">
        <div className="brand-tools">
          <a href="#top" className="logo">
            {profile.initials}
            <span>.</span>
          </a>
          <button className="language-switch" onClick={toggleLanguage} aria-label="Switch language">
            <span className={language === "id" ? "active" : ""}>ID</span>
            <i />
            <span className={language === "en" ? "active" : ""}>EN</span>
          </button>
        </div>
        <nav aria-label="Primary navigation">
          <a href="#about"><span>01</span> {copy.nav.about}</a>
          <a href="#stack"><span>02</span> stack</a>
          <a href="#works"><span>03</span> {copy.nav.works}</a>
          <a href="#contact"><span>04</span> contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-left">
          <div>
            <p className="eyebrow">portfolio - 2026</p>
            <h1>
              {copy.headline.line1}
              <br />
              {copy.headline.line2}
              <br />
              <em>{copy.headline.italic}</em>
            </h1>
            <p className="hero-sub">{copy.shortBio}</p>
          </div>

          <dl className="hero-meta">
            <div>
              <dt>// {copy.meta.name}</dt>
              <dd>{profile.name}</dd>
            </div>
            <div>
              <dt>// role</dt>
              <dd>{profile.role}</dd>
            </div>
            <div>
              <dt>// based</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>// status</dt>
              <dd>open</dd>
            </div>
          </dl>
        </div>

        <aside className="hero-right" aria-label="Terminal status">
          <div className="terminal">
            <p><strong>~/portfolio</strong> $ whoami</p>
            <p>{profile.name.toLowerCase().replaceAll(" ", "_")}</p>
            <br />
            <p><strong>~/portfolio</strong> $ cat status.txt</p>
            <p>-&gt; {profile.status} <i /></p>
            <p>-&gt; Inbox open: {profile.email}</p>
            <p>-&gt; Local time: {time}</p>
            <br />
            <p><strong>~/portfolio</strong> $ uname -srm</p>
            <p>portfolio v.1.1.0 / handcrafted</p>
            <br />
            <p><strong>~/portfolio</strong> $ _</p>
          </div>
        </aside>
      </section>

      <SectionLabel id="about" num="01" label={copy.nav.about} right={copy.scroll} />
      <section className="about">
        <div className="about-bio" dangerouslySetInnerHTML={{ __html: copy.bio }} />
        <div className="about-facts">
          {copy.facts.map(([key, value]) => (
            <dl key={key} className="fact">
              <dt>{key}</dt>
              <dd>{value}</dd>
            </dl>
          ))}
        </div>
      </section>

      <SectionLabel id="stack" num="02" label="Stack & Tools" right={`${totalStack} items`} />
      <section className="stack-grid">
        {Object.entries(stack).map(([group, items]) => (
          <article className="stack-col" key={group}>
            <h2>{group}</h2>
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <SectionLabel id="works" num="03" label={copy.worksLabel} right={`${works.length} demos`} />
      <section className="works">
        {works.map((work, index) => (
          <Link
            className={index === activeWork ? "work-row active" : "work-row"}
            href={`/demos/${work.slug}`}
            key={work.title}
            onFocus={() => setActiveWork(index)}
            onMouseEnter={() => setActiveWork(index)}
          >
            <span className="work-year">{String(index + 1).padStart(2, "0")} / {work.year}</span>
            <span className="work-main">
              <strong>{work.title}</strong>
              <em>{work.description}</em>
            </span>
            <span className="work-tags">
              {work.tags.slice(0, 4).map((tag) => <i key={tag}>{tag}</i>)}
              <i>OPEN DEMO</i>
            </span>
          </Link>
        ))}
      </section>

      <SectionLabel id="now" num="04" label={copy.nowLabel} />
      <section className="now">
        <div className="now-mark">{language === "id" ? "kini" : "now"}<span>.</span></div>
        <ul>
          {copy.now.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <SectionLabel id="contact" num="05" label={copy.contactLabel} />
      <section className="contact">
        <h2>
          {copy.contactHeadline.before} <em>{copy.contactHeadline.accent}</em>
          <br />
          {copy.contactHeadline.after}
        </h2>
        <div className="contact-grid">
          <div>
            <h3>// reach out</h3>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <div>
            <h3>// elsewhere</h3>
            <a href={`https://${profile.github}`} target="_blank" rel="noreferrer">{profile.github}</a>
            <span>{profile.linkedin}</span>
          </div>
          <div>
            <h3>// social</h3>
            <span>{profile.discord}</span>
            <span>{profile.telegram}</span>
          </div>
        </div>
      </section>

      <footer>
        <span>© 2026 {profile.name}. All rights / no rights.</span>
      </footer>
    </main>
  );
}

function getCopy(language: "id" | "en") {
  if (language === "en") {
    return {
      nav: { about: "about", works: "works" },
      headline: { line1: "Custom systems", line2: "built from", italic: "real requests." },
      shortBio: profile.shortBioEn,
      bio: profile.bioEn,
      scroll: "Scroll down",
      meta: { name: "name" },
      facts: [
        ["based in", "Surabaya, ID"],
        ["experience", "1 year"],
        ["focus", "Request-based systems"],
        ["education", "Self-directed software engineering"],
        ["languages", "Bahasa / English"],
        ["open to", "Remote, Hybrid"]
      ],
      worksLabel: "Selected Works",
      nowLabel: "Currently",
      now: [
        "Refining office automation: dashboards, WhatsApp flow, Excel export",
        "Learning better deployment, SEO, and public repository storytelling",
        "Maintaining request-based internal tools for reporting, monitoring, and daily office workflows",
        "Improving scraper and automation pipelines so repeated data work can run with cleaner logs and safer exports"
      ],
      contactLabel: "Get in touch",
      contactHeadline: { before: "Let's", accent: "build", after: "something good." }
    };
  }

  return {
    nav: { about: "tentang", works: "karya" },
    headline: { line1: "Custom system", line2: "rapi dari", italic: "request nyata." },
    shortBio: profile.shortBio,
    bio: profile.bio,
    scroll: "Gulir turun",
    meta: { name: "nama" },
    facts: [
      ["berbasis di", "Surabaya, ID"],
      ["pengalaman", "1 tahun"],
      ["fokus", "System by request"],
      ["edukasi", "Self-directed software engineering"],
      ["bahasa", "Bahasa / English"],
      ["terbuka untuk", "Remote, Hybrid"]
    ],
    worksLabel: "Project Pilihan",
    nowLabel: "Sedang Berjalan",
    now: [
      "Merapikan office automation: dashboard, alur WhatsApp, dan export Excel",
      "Memperdalam deployment, SEO, dan cara menata repository publik yang lebih jelas",
      "Menjaga internal tools berbasis request untuk laporan, monitoring, dan workflow harian kantor",
      "Meningkatkan pipeline scraper dan automation agar log lebih bersih dan export lebih aman"
    ],
    contactLabel: "Hubungi",
    contactHeadline: { before: "Mari", accent: "bangun", after: "system yang berguna." }
  };
}

function SectionLabel({ id, num, label, right }: { id: string; num: string; label: string; right?: string }) {
  return (
    <div className="section-label" id={id}>
      <span>/{num}</span>
      <strong>{label}</strong>
      <i />
      {right && <em>{right}</em>}
    </div>
  );
}

function useLocalTime(timeZone: string) {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString("en-GB", { hour12: false, timeZone }));
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}
