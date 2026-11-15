import { notFound } from "next/navigation";
import { AreaPage } from "@/components/AreaPage";
import { AREAS, getArea } from "@/lib/areas";
import { Header } from "@/components/Header";
import { Dock } from "@/components/Header";
import { WA } from "@/lib/site";
import type { Metadata } from "next";

export function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return {
    title: `${area.name} | HSB Associates & Builders`,
    description: area.intro,
    openGraph: { title: `${area.name} | HSB Associates & Builders`, description: area.tagline },
  };
}

export default async function AreaRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  return (
    <>
      <Header />
      <main>
        <AreaPage area={area} />
      </main>
      <Dock whatsapp={WA} />
    </>
  );
}
