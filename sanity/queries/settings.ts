import { groq } from "next-sanity";
import { client } from "@/sanity/client";
import type { Settings } from "@/lib/types";

export async function getSettings(): Promise<Settings | null> {
  return client.fetch(groq`*[_type == "settings"][0]`);
}

export async function getPeople() {
  return client.fetch(groq`*[_type == "person"] | order(sortOrder asc) { _id, name, role, bio, email, photo { asset, alt } }`);
}
