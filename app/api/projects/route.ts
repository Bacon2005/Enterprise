import { NextResponse } from "next/server";
import { readProjects } from "@/lib/projects";
//export async function GET: The name is the HTTP verb. Week 4 adds POST beside it.
export async function GET() {
  return NextResponse.json(await readProjects());
}
