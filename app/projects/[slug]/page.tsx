import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { fetchProject } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  let project;
  try {
    project = await fetchProject(slug);
  } catch (e) {
    //notFound() : Stops rendering this segment and renders the nearest not-found.tsx .
    //Only on "404" : A timeout is not a missing project. Rethrowing sends it to error.tsx .
    if (e instanceof Error && e.message === "404") notFound();
    //throw e : Swallowing it would show "no such project" when the server was simply down.
    throw e;
  }
  return (
    <main className="px-16 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
      />
      <h1 className="text-4xl font-bold">{project.title}</h1>
      <p className="mt-2 text-neutral-500">{project.year}</p>
      <p className="mt-6 text-xl">{project.summary}</p>
    </main>
  );
}
