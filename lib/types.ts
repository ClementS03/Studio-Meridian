export type Category =
  | "residential"
  | "civic"
  | "reuse"
  | "hospitality"
  | "pavilion"
  | "other";

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  category: Category;
  year: number;
  location: string;
  area?: string;
  status?: string;
  recognition?: string;
  photography?: string;
  tagline: string;
  description?: string;
  featured?: boolean;
  featuredVariant?: "regular" | "feature" | "wide";
  sortOrder?: number;
  coverImage: SanityImage;
  gallery?: SanityImage[];
  content?: PortableTextBlock[];
  prevProject?: { title: string; slug: { current: string } };
  nextProject?: { title: string; slug: { current: string } };
}

export interface JournalPost {
  _id: string;
  title: string;
  slug: { current: string };
  kind: "essay" | "lecture" | "field-notes" | "project-notes" | "interview" | "research" | "press";
  date: string;
  author?: string;
  readTime?: number;
  excerpt: string;
  content?: PortableTextBlock[];
  coverImage?: SanityImage;
}

export interface Person {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  email?: string;
  photo?: SanityImage;
}

export interface Award {
  year: number;
  name: string;
  project: string;
}

export interface Settings {
  studioName: string;
  tagline: string;
  description: string;
  founded: number;
  locations: string[];
  stats: { label: string; value: string }[];
  heroTitle: string;
  heroSubtitle: string;
  socialLinks: { platform: string; url: string }[];
  offices: Office[];
  awards?: Award[];
}

export interface Office {
  city: string;
  role?: string;
  address: string;
  email: string;
  phone?: string;
  hours?: string;
}

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
}

export type PortableTextBlock = {
  _type: string;
  [key: string]: unknown;
};
