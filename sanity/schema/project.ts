import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "category", title: "Category", type: "string",
      options: {
        list: [
          { title: "Residential", value: "residential" },
          { title: "Civic", value: "civic" },
          { title: "Adaptive Reuse", value: "reuse" },
          { title: "Hospitality", value: "hospitality" },
          { title: "Pavilion / Small", value: "pavilion" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "year", title: "Year", type: "number", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "area", title: "Area (e.g. 980 m²)", type: "string" }),
    defineField({ name: "status", title: "Status", type: "string", initialValue: "Completed" }),
    defineField({ name: "recognition", title: "Recognition / Award", type: "string" }),
    defineField({ name: "photography", title: "Photography credit", type: "string" }),
    defineField({ name: "tagline", title: "Tagline (short)", type: "string" }),
    defineField({ name: "description", title: "Description (works index)", type: "text", rows: 3 }),
    defineField({ name: "featured", title: "Featured on home", type: "boolean", initialValue: false }),
    defineField({ name: "featuredVariant", title: "Home grid variant", type: "string", options: { list: ["regular", "feature", "wide"] }, hidden: ({ document }) => !document?.featured }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number" }),
    defineField({ name: "coverImage", title: "Cover image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] }),
    defineField({
      name: "gallery", title: "Gallery images", type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] }],
    }),
    defineField({
      name: "content", title: "Project story", type: "array",
      of: [
        { type: "block", styles: [{ title: "Normal", value: "normal" }, { title: "H3", value: "h3" }], marks: { decorators: [{ title: "Italic", value: "em" }, { title: "Strong", value: "strong" }] } },
        { type: "image", options: { hotspot: true } },
      ],
    }),
  ],
  orderings: [{ title: "Year, newest", name: "yearDesc", by: [{ field: "year", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "location", media: "coverImage" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media };
    },
  },
});
