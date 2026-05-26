import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { schema } from "@/sanity/schema";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "studio-vitrine",
  title: "Studio Vitrine",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl: {
        // En dev : localhost:3000, en prod : remplace par ton vrai domaine
        origin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        draftMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
  ],
  schema,
});
