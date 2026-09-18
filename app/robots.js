export default function robots() {
  const baseUrl = 'https://turcoaz.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // İleride gizlemek istediğin bir admin veya API paneli olursa buraya yazabilirsin
      // disallow: ['/admin/', '/api/'], 
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}