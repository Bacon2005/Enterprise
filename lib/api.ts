import "server-only";
//Import this file from a client component and the build fails, by name, at that import.
import type { Project, Stats } from "@/lib/projects";

const BASE = process.env.API_BASE_URL;
//timeout: A promise that does nothing but fail, after the time you give it.

//if (!BASE) throw: Forgot .env ? You get that sentence, not a request to undefined/api/projects .
if (!BASE) throw new Error("Set API_BASE_URL in .env");

function timeout(ms: number): Promise<never> {
  return new Promise((_, fail) =>
    setTimeout(() => fail(new Error("timeout")), ms),
  );
}
async function get(path: string) {
  let res: Response;
  try {
    res = await Promise.race([fetch(BASE + path), timeout(8000)]);
  } catch (e) {
    throw new Error(
      //"timeout" or "offline" : Two names you chose. Step 4 reads them instead of guessing at an error class.
      e instanceof Error && e.message === "timeout" ? "timeout" : "offline",
    );
  }
  // (!res.ok) : A 404 and a 500 arrive as ordinary answers. fetch does not throw on them.
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

export const fetchProjects = (): Promise<Project[]> => get("/api/projects");
export const fetchProject = (slug: string): Promise<Project> =>
  get("/api/projects/" + slug);
export const fetchStats = (): Promise<Stats> => get("/api/stats");
