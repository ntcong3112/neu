// src/components/container/PageContainer.tsx
import { Helmet } from 'react-helmet-async';

type Props = {
  title?: string;
  description?: string;
  canonical?: string;
  jsonLd?: Record<string, unknown>;
  children?: React.ReactNode;
  additional?: React.ReactNode;
};

const PageContainer = ({ title, description, canonical, jsonLd, children, additional }: Props) => (
  <div>
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description?.slice(0, 155)} />
      {canonical && <link rel="canonical" href={canonical} />}
      {/* Structured-data nếu có */}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
      {additional}
    </Helmet>
    {children}
  </div>
);

export default PageContainer;
