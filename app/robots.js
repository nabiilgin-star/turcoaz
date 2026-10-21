
import type { MetadataRoute } from "next";
import { siteConfig } from "./seo.config";

const blockedPaths = ["/api/", "/admin/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: blockedPaths,
      },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-User",
          "Claude-SearchBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: blockedPaths,
      },
    ],
    sitemap: `${siteConfig.domain}/sitemap.xml`,
  };
}
