import { siteConfig } from "@/seo.config.js";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${siteConfig.domain}/sitemap.xml`,
    host: siteConfig.domain,
  };
}