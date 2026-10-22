const SITE_URL = "https://turcoaz.com";

export function buildMetadata(page) {
  const url = new URL(page.path || "/", SITE_URL).toString();

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: url,
      languages: {
        "ro-RO": url,
        "x-default": url,
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: "Turcoaz Aluminiu",
      locale: "ro_RO",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}
