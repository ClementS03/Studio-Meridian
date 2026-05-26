import { defineField, defineType } from "sanity";

export const journalPost = defineType({
  name: "journalPost",
  title: "Journal Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "kind", title: "Kind", type: "string",
      options: {
        list: [
          { title: "Essay", value: "essay" },
          { title: "Lecture", value: "lecture" },
          { title: "Field Notes", value: "field-notes" },
          { title: "Project Notes", value: "project-notes" },
          { title: "Interview", value: "interview" },
          { title: "Research", value: "research" },
          { title: "Press", value: "press" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "author", title: "Author", type: "string" }),
    defineField({ name: "readTime", title: "Read time (minutes)", type: "number" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "coverImage", title: "Cover image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] }),
    defineField({
      name: "content", title: "Content", type: "array",
      of: [
        { type: "block", styles: [{ title: "Normal", value: "normal" }, { title: "H2", value: "h2" }, { title: "H3", value: "h3" }, { title: "Quote", value: "blockquote" }], marks: { decorators: [{ title: "Italic", value: "em" }, { title: "Strong", value: "strong" }] } },
        { type: "image", options: { hotspot: true } },
      ],
    }),
  ],
  orderings: [{ title: "Date, newest", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "kind", media: "coverImage" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media };
    },
  },
});
