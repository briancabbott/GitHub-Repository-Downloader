const {parseFragment} = require('parse5');

function pageToAlgoliaRecord({node}, baseUrl) {
  const {htmlAst, mdxAST, content, ...rest} = node;
  let currentRec = {text: ''};
  const recsToSave = [];
  const headTags = ['h1', 'h2', 'h3', 'h4'];

  function cleanupAndAppendTextVal(value, currentTxt = '') {
    let newText = currentTxt;
    if (value && value !== '\n') {
      const val = value.replace(/(\r\n|\n|\r)/gm, '') || '';
      const currentTxtLen = currentTxt.length;
      if (val.length > 0) {
        if (currentTxtLen > 0) {
          if (currentTxt[currentTxtLen - 1] !== ' ' && val[0] !== ' ') {
            newText += ' ';
          }
        }
        newText += val;
      }
    }
    return newText;
  }

  function buildLink(value, theNode) {
    const slugHead = value.replace(/\./g, '').replace(/ /g, '-').toLowerCase();
    return `${baseUrl}${
      theNode?.fields?.slug || theNode?.slug || ''
    }#${slugHead}`;
  }

  function splitForHeader(parent, value, theRec) {
    // TODO fix nested elements in headers (like inlineCode)

    //removing headers that are "smaller" than the current one, eg if parent === h2 remove h3, h4 etc...
    const headz = {...theRec.headings} || {};

    for (let i = headTags.indexOf(parent); i < headTags.length; i++) {
      delete headz[headTags[i]];
    }

    const recToPush = {...theRec};

    headz[parent] = value;
    if (!recToPush.headings) {
      recToPush.headings = {};
    }

    return [
      recToPush,
      {text: '', headings: headz, link: buildLink(value, node)}
    ];
  }

  function isHeader(parent) {
    return headTags.includes(parent) || parent.type === 'heading';
  }

  // TODO: extract code blocks into codeSnippet key
  function parseElem(parent, elem, pageType) {
    const {type, tagName, value, children, nodeName, childNodes} = elem;

    if (nodeName === '#text' || type === 'inlineCode' || type === 'text') {
      if (isHeader(parent) === false) {
        // just text, we append new chunk of text
        currentRec.text = cleanupAndAppendTextVal(value, currentRec.text);
      } else {
        // TODO: test here if header has multiple children

        // this is a header so we split
        const [recToPush, freshRec] =
          pageType === 'MDX'
            ? splitForHeader(`h${parent.depth}`, value, currentRec)
            : splitForHeader(parent, value, currentRec);

        // and we add rec to array for saving
        recsToSave.push({...recToPush});

        // reset with current headings state
        currentRec = {...freshRec};
      }
    } else if (children || childNodes) {
      // drill further down
      return children
        ? type === 'element'
          ? traverseChildren(tagName, children)
          : traverseChildren(elem, children, 'MDX')
        : traverseChildren(tagName, childNodes, 'HTMLfrag');
    }
  }

  function traverseChildren(parent, children, nodeType) {
    return {
      parent,
      children: children
        .map(child => {
          return parseElem(parent, child, nodeType);
        })
        .filter(elem => elem !== undefined)
    };
  }

  function getRecsAndReset(node, recs) {
    const {id, frontmatter, fields, slug, categories, ...rest} = node;

    const categs =
      categories?.nodes?.map(node => node.name) || categories || [];

    const docset =
      baseUrl.includes('https://www.apollographql.com/docs/') &&
      baseUrl.substring(baseUrl.lastIndexOf('/') + 1);
    if (docset) {
      categs.push('documentation', docset);
      if (['react', 'ios', 'android'].includes(docset)) {
        categs.push('client');
      }
      if (fields?.sidebarTitle) {
        categs.push(fields.sidebarTitle.toLowerCase());
      }
    }
    const type = docset
      ? 'docs'
      : baseUrl.includes('odyssey')
      ? 'odyssey'
      : baseUrl.includes('blog')
      ? 'blog'
      : '';

    let url = baseUrl;
    if (type === 'blog') {
      url = `${baseUrl}${node?.link || ''}`;
    } else {
      url = `${baseUrl}${fields?.slug || slug || ''}`;
    }
    const allRecs = recs.map((rec, index) => {
      return {
        objectID: `${id}_${index}`,
        index,
        docset,
        type,
        categories: categs,
        url,
        ...frontmatter,
        ...fields,
        ...rest,
        ...rec
      };
    });
    return allRecs;
  }

  // start parsing
  if (htmlAst) {
    traverseChildren('root', htmlAst?.children);
  } else if (mdxAST) {
    traverseChildren(mdxAST, mdxAST?.children, 'MDX');
  } else if (content) {
    const htmlWPAst = parseFragment(content);
    traverseChildren(htmlWPAst, htmlWPAst?.childNodes || [], 'HTMLfrag');
  }

  // pushing the last record before starting the new page, if not empty
  if (currentRec.text.length) {
    recsToSave.push({...currentRec});
  }

  return getRecsAndReset(rest, recsToSave);
}

function parsePages(pages, baseUrl) {
  return (
    pages?.edges?.flatMap(page => pageToAlgoliaRecord(page, baseUrl)) || []
  );
}

exports.parse = function ({
  data: {pagesMD = [], pagesMDX = [], pagesWP = []},
  baseUrl = ''
}) {
  try {
    const allPages = [pagesMD, pagesMDX, pagesWP].flatMap(pages =>
      parsePages(pages, baseUrl)
    );
    console.log(`Saving ${allPages.length} records to Algolia`);

    return allPages;
  } catch (err) {
    console.error(err);
  }
};

exports.queries = require('./queries');
exports.algoliaSettings = require('./settings');
