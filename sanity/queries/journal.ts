import { groq } from "next-sanity";
import { client } from "@/sanity/client";
import type { JournalPost } from "@/lib/types";

const postFields = groq`
  _id, title, slug, kind, date, author, readTime, excerpt,
  coverImage { asset, alt }
`;

export async function getAllPosts(): Promise<JournalPost[]> {
  return client.fetch(groq`*[_type == "journalPost"] | order(date desc) { ${postFields} }`);
}

export async function getFeaturedPosts(): Promise<JournalPost[]> {
  return client.fetch(groq`*[_type == "journalPost" && featured == true] | order(date desc)[0...3] { ${postFields} }`);
}

export async function getPostBySlug(slug: string): Promise<JournalPost | null> {
  return client.fetch(
    groq`*[_type == "journalPost" && slug.current == $slug][0] { ${postFields}, content }`,
    { slug }
  );
}

export async function getPostSlugs(): Promise<{ slug: { current: string } }[]> {
  return client.fetch(groq`*[_type == "journalPost"] { slug }`);
}
