import { readProject } from "@/lib/projects";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  //await params: params is a promise. Read it without await and slug is undefined.
  const { slug } = await params;
  const project = await readProject(slug);
  //status 404: An unknown slug is missing, not empty. The page has to tell them apart.
  if (!project) return new NextResponse("", { status: 404 });
  return NextResponse.json(project);
}
