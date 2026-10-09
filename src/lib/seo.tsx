import { Helmet } from "react-helmet-async";

const SITE_NAME = "Markets Yemen";
const DEFAULT_SITE_URL = "https://markets-ye.vercel.app";

interface SeoProps {
  canonicalPath?: string;
  description: string;
  image?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  noindex?: boolean; 
  title: string;
  type?: "website" | "article"|"WebPage" | "CollectionPage";
}

export function getSiteUrl() {
  return import.meta.env.VITE_SITE_URL?.replace(/\/+$/, "") || DEFAULT_SITE_URL;
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  // console.log(path,normalizedPath)
  return `${getSiteUrl()}${normalizedPath}`;
}

export function Seo({
  canonicalPath,
  description,  
  image = "/favicons/web-app-manifest-512x512.png",
  jsonLd,
  noindex = false,
  title,
  type = "WebPage",
}: SeoProps) {
  // const fullTitle = `${title} `;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} - ${SITE_NAME}`;
  const canonical = absoluteUrl(canonicalPath ?? window.location.pathname);
  const imageUrl = absoluteUrl(image);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
