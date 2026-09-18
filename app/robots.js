export default function robots() {
  const baseUrl = 'https://turcoaz.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/'], // Admin panelini arama motorlarından gizlemek SEO için önemlidir
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}