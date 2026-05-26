import { defineField, defineType } from "sanity";

export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 3 }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number" }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media };
    },
  },
});
