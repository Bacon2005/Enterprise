import { readStats } from "@/lib/projects";
import { NextResponse } from "next/server";

export async function GET() {
  //readStats: Your slow query, standing in for a real one. Without it you cannot see streaming.
  return NextResponse.json(await readStats());
}
