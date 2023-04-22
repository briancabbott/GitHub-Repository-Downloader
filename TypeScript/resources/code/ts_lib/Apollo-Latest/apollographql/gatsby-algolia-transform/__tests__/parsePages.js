const pagesMD = require('./mock_md');
const pagesMDX = require('./mock_mdx');
const pagesWP = require('./mock_wp');
const {parse} = require('../lib/index');
const baseUrl = 'https://www.apollographql.com/docs/federation';

const mdRecs = parse({
  data: {
    pagesMD: pagesMD.data.pagesMD
  },
  baseUrl
});

test('parse MD', () => {
  expect(mdRecs.length).toBeGreaterThan(0);

  expect(mdRecs[0].url.includes(baseUrl)).toBe(true);

  expect(mdRecs[0]).toEqual(
    expect.objectContaining({
      objectID: expect.any(String),
      index: expect.any(Number),
      url: expect.any(String),
      slug: expect.any(String),
      sidebarTitle: expect.any(String),
      apiReference: expect.any(Boolean),
      excerpt: expect.any(String),
      text: expect.any(String),
      link: expect.any(String)
    })
  );
});

const mdxRecs = parse({
  data: {
    pagesMDX: pagesMDX.data.pagesMDX
  },
  baseUrl
});

test('parse MDX', () => {
  expect(mdxRecs.length).toBeGreaterThan(0);

  expect(mdxRecs[0].url.includes(baseUrl)).toBe(true);

  expect(mdxRecs[0]).toEqual(
    expect.objectContaining({
      objectID: expect.any(String),
      index: expect.any(Number),
      url: expect.any(String),
      slug: expect.any(String),
      sidebarTitle: expect.any(String),
      apiReference: expect.any(Boolean),
      excerpt: expect.any(String),
      text: expect.any(String),
      link: expect.any(String)
    })
  );
});

const wpRecs = parse({
  data: {
    pagesWP: pagesWP.data.pagesWP
  },
  baseUrl
});

test('parse WP', () => {
  expect(wpRecs.length).toBeGreaterThan(0);

  expect(wpRecs[0].url.includes(baseUrl)).toBe(true);

  expect(wpRecs[0]).toEqual(
    expect.objectContaining({
      objectID: expect.any(String),
      index: expect.any(Number),
      url: expect.any(String),
      categories: expect.any(Array),
      date: expect.any(String),
      title: expect.any(String),
      excerpt: expect.any(String),
      text: expect.any(String),
      link: expect.any(String)
    })
  );
});
