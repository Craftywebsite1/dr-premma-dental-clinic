import { CLINIC_INFO } from "../constants";

export const SEO = ({ title, description }: { title?: string; description?: string }) => {
  const finalTitle = title ? `${title} | ${CLINIC_INFO.name}` : `${CLINIC_INFO.name} | Best Dentist in Virar West`;
  const finalDesc = description || "Affordable and advanced dental care in Virar West by Dr. Premma Kshirsagar. Specialized in painless treatments, root canals, and cosmetic dentistry.";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": CLINIC_INFO.name,
    "image": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
    "url": typeof window !== 'undefined' ? window.location.href : "https://drpremmadental.com",
    "telephone": CLINIC_INFO.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1st Floor, Apollo Apartment, CS Road, opposite S.K. Dairy, Virar West",
      "addressLocality": "Vasai-Virar",
      "addressRegion": "Maharashtra",
      "postalCode": "401303",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.4623101,
      "longitude": 72.8016423
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "17:00",
      "closes": "21:00"
    }
  };

  return (
    <>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <meta name="keywords" content="dentist in virar west, dental clinic virar, dr premma kshirsagar, root canal virar, teeth whitening virar, dental implants vasai-virar, best dental clinic near me" />
      <meta name="author" content="Naitik Bothara - CraftyWeb Developer" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:site_name" content={CLINIC_INFO.name} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="robots" content="index, follow" />
      {typeof window !== 'undefined' && <link rel="canonical" href={window.location.origin + window.location.pathname} />}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </>
  );
};
