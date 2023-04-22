module.exports = {
  odyssey: `{
    pagesMDX: allMdx {
      edges {
        node {
          excerpt(pruneLength: 100)
          id
          mdxAST
          frontmatter {
            title
            description
            categories
          }
          slug
        }
      }
    }
  }`,
  blog: `{
    pagesWP: allWpPost {
      edges {
        node {
          title
          content
          slug
          categories {
            nodes {
              name
            }
          }
          id
          link
          excerpt
          date
          modified
          featuredImage {
            node {
              sourceUrl
            }
          }        
          author {
            node {
              name
            }
          }
        }
      }
    }
  }`,
  docs: `{
    pagesMD: allMarkdownRemark {
      edges {
        node {
          excerpt(pruneLength: 100)
          htmlAst
          id
          frontmatter {
            title
            description
          }
          fields {
            slug
            apiReference
            sidebarTitle
          }
        }
      }
    }
    pagesMDX: allMdx {
      edges {
        node {
          excerpt(pruneLength: 100)
          mdxAST
          id
          frontmatter {
            title
            description
          }
          fields {
            slug         
            apiReference
            sidebarTitle   
          }
        }
      }
    }
  }`
};
