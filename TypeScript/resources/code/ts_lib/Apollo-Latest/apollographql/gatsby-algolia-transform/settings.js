const baseSettings = {
  searchableAttributes: [
    'unordered(title)',
    'unordered(slug)',
    'unordered(categories)',
    'unordered(headings.h2)',
    'unordered(headings.h3)',
    'unordered(headings.h4)',
    'unordered(text)',
    'unordered(description)'
  ],
  distinct: true,
  customRanking: ['desc(pageviews)', 'asc(index)']
};

module.exports = {
  default: {
    ...baseSettings,
    attributesForFaceting: ['categories', 'docset', 'type'],
    attributeForDistinct: 'slug'
  },
  blog: {
    ...baseSettings,
    attributesForFaceting: ['categories', 'type'],
    attributeForDistinct: 'url'
  },
  odyssey: {
    ...baseSettings,
    attributesForFaceting: ['categories', 'type'],
    attributeForDistinct: 'slug'
  }
};
