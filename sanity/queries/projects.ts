import { groq } from "next-sanity";
import { client } from "@/sanity/client";
import type { Project } from "@/lib/types";

const projectFields = groq`
  _id, title, slug, category, year, location, area, status,
  recognition, photography, tagline, description, featured, featuredVariant,
  coverImage { asset, alt },
  gallery[] { asset, alt }
`;

const projectDetailFields = groq`
  ${projectFields},
  content,
  "prevProject": *[_type == "project" && year < ^.year] | order(year desc)[0] { title, slug },
  "nextProject": *[_type == "project" && year > ^.year] | order(year asc)[0] { title, slug }
`;

export async function getAllProjects(): Promise<Project[]> {
  return client.fetch(groq`*[_type == "project"] | order(year desc) { ${projectFields} }`);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return client.fetch(groq`*[_type == "project" && featured == true] | order(sortOrder asc) { ${projectFields} }`);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0] { ${projectDetailFields} }`,
    { slug }
  );
}

export async function getProjectSlugs(): Promise<{ slug: { current: string } }[]> {
  return client.fetch(groq`*[_type == "project"] { slug }`);
}
