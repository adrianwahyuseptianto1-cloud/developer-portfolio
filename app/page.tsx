"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { marquee, profile, stack, works } from "./portfolio-data";

export default function Home() {
  const [activeWork, setActiveWork] = useState(0);
  const time = useLocalTime(profile.timezone);
  const totalStack = Object.values(stack).reduce((sum, items) => sum + items.length, 0);

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
        <a href="#top" className="logo">
          {profile.initials}
          <span>.</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about"><span>01</span> about</a>
          <a href="#stack"><span>02</span> stack</a>
          <a href="#works"><span>03</span> works</a>
          <a href="#contact"><span>04</span> contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-left">
          <div>
            <p className="eyebrow">portfolio - 2026</p>
            <h1>
              {profile.headline.line1}
              <br />
              {profile.headline.line2}
              <br />
              <em>{profile.headline.italic}</em>
            </h1>
            <p className="hero-sub">{profile.shortBio}</p>
          </div>

          <dl className="hero-meta">
            <div>
              <dt>// name</dt>
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

      <SectionLabel id="about" num="01" label="About" right="Scroll down" />
      <section className="about">
        <div className="about-bio" dangerouslySetInnerHTML={{ __html: profile.bio }} />
        <div className="about-facts">
          {profile.facts.map(([key, value]) => (
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

      <SectionLabel id="works" num="03" label="Selected Works" right={`${works.length} demos`} />
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

      <SectionLabel id="now" num="04" label="Currently" />
      <section className="now">
        <div className="now-mark">now<span>.</span></div>
        <ul>
          {profile.now.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <SectionLabel id="contact" num="05" label="Get in touch" />
      <section className="contact">
        <h2>
          Let&apos;s <em>build</em>
          <br />
          something good.
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
        <span>BUILD 2026.04.30 · handcrafted, no template</span>
      </footer>
    </main>
  );
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
