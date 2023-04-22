# Gatbsy pages parser for Algolia

This script relies on `gatsby-plugin-algolia`, it provides the transformer to chunk pages into smaller records. 
This works for our docs, blog and odyssey content for now.

example usage in gatsby-config:
```
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: [
          {
            query: algoliaParse.queries.docs,
            transformer: ({ data }) => {
              return algoliaParse.parse({
                data,
                baseUrl: 'https://www.apollographql.com/docs/federation'
              });
            },
            indexName: process.env.ALGOLIA_INDEX_NAME,
            settings: algoliaParse.algoliaSettings.default
          }
        ]
      }
    }
```