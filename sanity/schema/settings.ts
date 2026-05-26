import { defineField, defineType } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "studioName", title: "Studio name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Short description", type: "text", rows: 2 }),
    defineField({ name: "founded", title: "Founded year", type: "number" }),
    defineField({ name: "heroTitle", title: "Hero headline (use ** for italic)", type: "text", rows: 2 }),
    defineField({ name: "heroSubtitle", title: "Hero subtitle", type: "text", rows: 2 }),
    defineField({
      name: "stats", title: "Hero stats", type: "array",
      of: [{ type: "object", fields: [defineField({ name: "value", type: "string", title: "Value" }), defineField({ name: "label", type: "string", title: "Label" })] }],
    }),
    defineField({
      name: "marqueeItems", title: "Marquee items (clients/partners)", type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "offices", title: "Offices", type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "city", type: "string", title: "City" }),
          defineField({ name: "role", type: "string", title: "Role (e.g. main studio)" }),
          defineField({ name: "address", type: "text", title: "Address", rows: 3 }),
          defineField({ name: "email", type: "string", title: "Email" }),
          defineField({ name: "phone", type: "string", title: "Phone" }),
          defineField({ name: "hours", type: "string", title: "Hours" }),
        ],
        preview: { select: { title: "city", subtitle: "role" } },
      }],
    }),
    defineField({
      name: "socialLinks", title: "Social links", type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "platform", type: "string", title: "Platform" }),
          defineField({ name: "url", type: "url", title: "URL" }),
        ],
      }],
    }),
    defineField({
      name: "awards", title: "Awards", type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "year", type: "number", title: "Year" }),
          defineField({ name: "name", type: "string", title: "Award name" }),
          defineField({ name: "project", type: "string", title: "Project" }),
        ],
        preview: { select: { title: "name", subtitle: "year" } },
      }],
    }),
    defineField({ name: "footerTagline", title: "Footer tagline", type: "string" }),
    defineField({ name: "copyrightEntity", title: "Copyright entity", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
