import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DemoExperience from "./DemoExperience";
import { works } from "../../portfolio-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((item) => item.slug === slug);
  if (!work) return {};

  return {
    title: `${work.title} Demo - Adrian Wahyu Septianto`,
    description: `Interactive dummy-data demo for ${work.title}, a project by Adrian Wahyu Septianto.`
  };
}

export default async function DemoPage({ params }: Props) {
  const { slug } = await params;
  const work = works.find((item) => item.slug === slug);
  if (!work) notFound();

  return (
    <main className="demo-page">
      <header className="demo-site-header">
        <Link href="/#works" className="logo">
          AW<span>.</span>
        </Link>
        <nav aria-label="Demo navigation">
          <Link href="/#works"><span>01</span> portfolio</Link>
          <Link href={`/demos/${work.slug}`}><span>02</span> demo</Link>
        </nav>
      </header>

      <section className="demo-hero">
        <div>
          <p className="eyebrow">project demo - dummy data</p>
          <h1>{work.title}</h1>
          <p>{work.description}</p>
        </div>
        <aside className="demo-info terminal">
          <p><strong>~/demo</strong> $ open {work.slug}</p>
          <p>-&gt; mode: {work.demo.mode}</p>
          <p>-&gt; source: {work.source}</p>
          <p>-&gt; data: safe dump only</p>
          <br />
          <p><strong>~/demo</strong> $ status</p>
          <p>-&gt; interactive preview ready <i /></p>
        </aside>
      </section>

      <div className="section-label">
        <span>/01</span>
        <strong>Try the project</strong>
        <i />
        <em>{work.tags.join(" / ")}</em>
      </div>

      <DemoExperience work={work} />
    </main>
  );
}
