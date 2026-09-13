export default async function sitemap() {
  const baseUrl = 'https://turcoaz.com';

  // Sitenizdeki kritik sayfaları buraya ekliyoruz
  const routes = [
    '',
    '/categorii',
    '/categorii/acp-aluminiu-compozit-panel-bond',
    '/categorii/sisteme-aluminiu-akpa/glafuri-din-aluminiu',
    '/categorii/sisteme-balustrada/balustrada-de-sticla',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}