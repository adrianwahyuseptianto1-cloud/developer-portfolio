import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DemoShell from "./DemoShell";
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

  return <DemoShell work={work} />;
}
