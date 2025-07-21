import React from 'react';
import { Helmet } from "react-helmet";

const SEO = ({
  title = 'Shopping App',
  description = 'Default description for My App.',
  keywords = 'react, helmet, seo',
}) => {
  return (
    <Helmet>
      <title>{`Shopping App | ${title}`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default SEO;
