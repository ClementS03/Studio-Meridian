import { urlFor } from "@/sanity/client";
import type { SanityImage } from "@/lib/types";

export function sanityImageUrl(image: SanityImage, width = 1600, quality = 80): string {
  return urlFor(image).width(width).quality(quality).auto("format").url();
}

export function sanityImageUrlSq(image: SanityImage, size = 800): string {
  return urlFor(image).width(size).height(size).fit("crop").quality(80).auto("format").url();
}
