import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Meteor } from 'meteor/meteor';

const seoURL = path => Meteor.absoluteUrl(path);

const getTitle = ({ title, roastImg }) => {
  if(roastImg) {
    return title;
  } else {
    return (title ? title + ' | ' : '') + 'Roast Me - The first official platform';
  }
}

const getMetaTags = ({title, description, contentType, url, published, updated, category, tags, twitter, roastImg}) => {
  const defaultDescription = 'On Roast Me roasters creatively insult other people based on their looks. Check out the best roasts!';
  const metaTags = [
    { itemprop: 'name', content: title },
    { itemprop: 'description', content: description || defaultDescription },
    { itemprop: 'image', content: roastImg || 'RoastMe_Logo_Original.svg' },
    { name: 'description', content: description || defaultDescription },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:description', content: description || defaultDescription },
    { name: 'twitter:title', content: title },
    { name: 'twitter:image', content: roastImg || 'https://itsroast.me/favicon.png' },
    // { name: 'og:type', content: contentType },
    // { name: 'og:title', content: (title ? title + ' | ' : '') + 'Roast Me - The first official platform' },
    // { name: 'og:url', content: url },
    // { name: 'og:image', content: roastImg || 'RoastMe_Logo_Original.svg' },
    // { name: 'og:description', content: description || 'On Roast Me roasters creatively insult other people based on their looks. Check out the best roasts!' },
    // { name: 'og:site_name', content: 'It\'s Roast Me' },
    // { name: 'fb:app_id', content: '287306675033864' },
  ];

  if(published) metaTags.push({ name: 'article:published_time', content: published });
  if(updated) metaTags.push({ name: 'article:article:modified_time', content: updated });
  if(category) metaTags.push({ name: 'article:section', content: category });
  if(tags) metaTags.push({ name: 'article:tag', content: tags });

  return metaTags;
}

const SEO = ({ schema, title, description, path, contentType, published, updated, category, tags, twitter, roastImg }) => (
  <Helmet
    htmlAttributes={{
      lang: 'en',
      itemscope: undefined,
      itemtype: 'http://schema.org/' + schema,
    }}
    title={ getTitle({ title, roastImg }) }
    link={[
      { rel: 'canonical', href: seoURL(path) },
    ]}
    meta={getMetaTags({
      title: getTitle({ title, roastImg }),
      description,
      contentType,
      url: seoURL(path),
      published,
      updated,
      category,
      tags,
      twitter,
      roastImg
    })}
  />
);

SEO.propTypes = {
  schema: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
  contentType: PropTypes.string,
  published: PropTypes.string,
  updated: PropTypes.string,
  category: PropTypes.string,
  tags: PropTypes.array,
  twitter: PropTypes.string,
}

export default SEO;
