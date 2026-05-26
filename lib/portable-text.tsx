import { PortableText as PT } from "@portabletext/react";
import type { PortableTextBlock } from "@/lib/types";
import { sanityImageUrl } from "@/lib/image";
import type { SanityImage } from "@/lib/types";

const components = {
  types: {
    image: ({ value }: { value: SanityImage & { alt?: string } }) => (
      <figure style={{ margin: "2em 0" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={sanityImageUrl(value, 1200)}
          alt={value.alt || ""}
          style={{ width: "100%", height: "auto" }}
        />
      </figure>
    ),
  },
  block: {
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-display text-[clamp(28px,2.4vw,40px)] font-normal tracking-[-0.01em] mt-[1.6em] mb-[0.6em]">
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="font-display text-[clamp(24px,2vw,32px)] leading-[1.3] italic my-[1.6em] pl-6 border-l border-accent">
        {children}
      </blockquote>
    ),
  },
};

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return <PT value={value} components={components} />;
}
