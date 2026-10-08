import { siteConfig } from "./seo.config";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/", // Admin koruması middleware + noindex ile sağlanır
        ],
      },
    ],
    sitemap: `${siteConfig.domain}/sitemap.xml`,
  };
}