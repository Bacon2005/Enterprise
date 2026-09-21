import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";

type Props = { params: Promise<{ slug: string }> };

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
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
