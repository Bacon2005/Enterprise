"use client";

import { useState } from "react";
import { Project } from "@/lib/projects";
import { ProjectList } from "./project-list";

type Props = { projects: Project[] };

export function ProjectSearch({ projects }: Props) {
  const [query, setQuery] = useState("");
  const shown = projects.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Projects"
        className="mt-8 w-80 border px-4 py-2"
      />
      <ProjectList projects={shown} />
    </>
  );
}
