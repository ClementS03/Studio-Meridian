import { NextRequest, NextResponse } from "next/server";
import { getAllProjects } from "@/sanity/queries/projects";
import { urlFor } from "@/sanity/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  try {
    const projects = await getAllProjects();
    const filtered = category && category !== "all"
      ? projects.filter((p) => p.category === category)
      : projects;

    const withImages = filtered.map((p) => ({
      ...p,
      imgUrl: p.coverImage?.asset?._ref
        ? urlFor(p.coverImage).width(1800).auto("format").url()
        : null,
    }));

    return NextResponse.json(withImages);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
