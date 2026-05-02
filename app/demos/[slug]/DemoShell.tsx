"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Work } from "../../portfolio-data";
import DemoExperience from "./DemoExperience";

export default function DemoShell({ work }: { work: Work }) {
  const [language, setLanguage] = useState<"id" | "en">("id");
  const copy = language === "en" ? demoCopy.en : demoCopy.id;

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
    <main className="demo-page">
      <header className="demo-site-header">
        <div className="brand-tools">
          <Link href="/#works" className="logo">
            AW<span>.</span>
          </Link>
          <button className="language-switch" onClick={toggleLanguage} aria-label="Switch language">
            <span className={language === "id" ? "active" : ""}>ID</span>
            <i />
            <span className={language === "en" ? "active" : ""}>EN</span>
          </button>
        </div>
        <nav aria-label="Demo navigation">
          <Link href="/#works"><span>01</span> portfolio</Link>
          <Link href={`/demos/${work.slug}`}><span>02</span> demo</Link>
        </nav>
      </header>

      <section className="demo-hero">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{work.title}</h1>
          <p>{work.description}</p>
        </div>
        <aside className="demo-info terminal">
          <p><strong>~/demo</strong> $ open {work.slug}</p>
          <p>-&gt; {copy.mode}: {work.demo.mode}</p>
          <p>-&gt; {copy.source}: {work.source}</p>
          <p>-&gt; {copy.data}: {copy.safeData}</p>
          <br />
          <p><strong>~/demo</strong> $ status</p>
          <p>-&gt; {copy.status} <i /></p>
        </aside>
      </section>

      <div className="section-label">
        <span>/01</span>
        <strong>{copy.tryProject}</strong>
        <i />
        <em>{work.tags.join(" / ")}</em>
      </div>

      <DemoExperience work={work} />
    </main>
  );
}

const demoCopy = {
  id: {
    eyebrow: "project demo - data dummy",
    mode: "mode",
    source: "source",
    data: "data",
    safeData: "dump aman saja",
    status: "preview interaktif siap",
    tryProject: "Coba project"
  },
  en: {
    eyebrow: "project demo - dummy data",
    mode: "mode",
    source: "source",
    data: "data",
    safeData: "safe dump only",
    status: "interactive preview ready",
    tryProject: "Try the project"
  }
};
