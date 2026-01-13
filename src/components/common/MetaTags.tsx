import { memo } from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

/**
 * Reusable SEO MetaTags component
 * Optimized with memo to prevent unnecessary re-renders
 */
const MetaTags = memo(function MetaTags({
  title,
  description,
  keywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogType = 'website',
  twitterCard = 'summary',
  twitterTitle,
  twitterDescription,
}: MetaTagsProps) {
  const canonical = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && <meta property="og:description" content={ogDescription} />}
      {ogType && <meta property="og:type" content={ogType} />}
      {twitterCard && <meta name="twitter:card" content={twitterCard} />}
      {twitterTitle && <meta name="twitter:title" content={twitterTitle} />}
      {twitterDescription && <meta name="twitter:description" content={twitterDescription} />}
    </Helmet>
  );
});

export default MetaTags;
