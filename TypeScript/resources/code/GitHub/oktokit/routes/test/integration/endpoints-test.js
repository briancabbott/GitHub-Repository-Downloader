const { test } = require("tap");

const UTIL = require("../util");
const Cache = require("../../lib/cache");

const gheVersion = UTIL.getGheVersion();
const baseUrl = UTIL.getBaseUrl();
const cacheDir = UTIL.getCacheDir();
const routesRoot = UTIL.getRoutesRoot();
const routesDir = UTIL.getRoutesDir();

testEndpoints(UTIL.getAllDocumentationUrls());

async function testEndpoints(urls) {
  const state = {
    cached: true,
    cache: new Cache(cacheDir),
    baseUrl: baseUrl,
    folderName: routesDir,
    gheVersion: gheVersion,
    memoryCache: {},
  };
  const routeMap = await UTIL.getRouteMap(urls, state);
  urls.forEach((url) => {
    const jsonFile = `./${routesRoot}/${routesDir}/index.json`;
    test(`${url} to JSON from ${jsonFile}`, async (t) => {
      const expected = UTIL.getRoutesForUrl(url).sort(sortByPathThenMethod);
      const actual = routeMap.get(url).sort(sortByPathThenMethod);
      t.deepEquals(actual, expected);
      t.end();
    });
  });
}

function sortByPathThenMethod(a, b) {
  switch (true) {
    case a.path < b.path:
      return -1;
    case a.path > b.path:
      return 1;
    case a.method < b.method:
      return -1;
    case a.method > b.method:
      return 1;
  }
  return 0;
}
