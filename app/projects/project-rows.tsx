//component not a page: Only what is inside a component can be streamed. A page that awaits blocks everything.
//async function , no "use client" : It runs on the server, so it may call fetchProjects .
import { fetchProjects } from "@/lib/api";
import { ProjectSearch } from "./project-search";
import { Problem } from "./problem";
import { problemFor } from "@/lib/problem";
export async function ProjectRows() {
  let projects;
  //try around the await only : A failure here is about this section, not the whole page.
  try {
    projects = await fetchProjects();
  } catch (e) {
    //It returns, not throws : The breadcrumbs and the title survive. Only this section says what went wrong.
    return <Problem message={problemFor(e)} />;
  }

  if (projects.length === 0) {
    return <Problem message="No projects yet. Add the first one." />;
  }
  return <ProjectSearch projects={projects} />;
}
