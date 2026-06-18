import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CountryGuideView from "@/components/views/CountryGuideView";
import { COUNTRIES } from "@/lib/content/countries";

export function generateStaticParams() {
  return Object.keys(COUNTRIES).map((country) => ({ country }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  const c = COUNTRIES[country];
  if (!c) return { title: "Global Workforce" };
  return { title: `Hire in ${c.name}`, description: c.lead };
}

export default async function Page({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  const c = COUNTRIES[country];
  if (!c) notFound();
  return <CountryGuideView country={c} />;
}
