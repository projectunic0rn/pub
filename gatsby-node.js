const path = require('path');

const { slugify } = require('./scripts/slugify');
const { postsPerFirstPage, postsPerPage } = require('./site.config');

/** Paths to available templates. */
const template = {
  blog: path.resolve('./src/templates/blog/blog.tsx'),
  tag: path.resolve('./src/templates/tag.tsx'),
  post: path.resolve('./src/templates/post.tsx'),
  author: path.resolve('./src/templates/author.tsx'),
};

exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type AuthorYaml implements Node {
      id: String!
      name: String!
      bio: String!
      github: String!
      twitter: String
    }
  `;

  createTypes(typeDefs);
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    createNodeField({
      name: 'slug',
      node,
      value: slugify(node.frontmatter.title),
    });

    createNodeField({
      name: 'author',
      node,
      value: node.frontmatter.author,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  const redirects = [
    { fromPath: '/app/projects', toPath: '/projects' },
    { fromPath: '/app/projects/create', toPath: '/projects/create' },
  ];

  for (const { fromPath, toPath } of redirects) {
    createRedirect({
      fromPath,
      redirectInBrowser: true,
      isPermanent: true,
      toPath,
    });
  }

  /**
   * **Creates the blog index page, blog post pages and paginated list of blog posts.**
   *
   * The first part is is a call to the `graphql` function passed with the
   * query string for this build step. This string only fetches what is need to
   * build all the index page, individual blog post pages and the paginated list
   * of blog posts.
   *
   * We let this query run asynchronously. If the query fails, the promise is
   * rejected and the build fails.
   *
   * From the query results, the first task is to create the blog index page.
   * This page is different because its path does not have a page number, i.e.
   * `/blog`. The other pages would have a page number in their paths, i.e.
   * `/blog/23`.
   *
   * The last task is to create the individual blog posts. This step uses a
   * different template than the paginated list of blog posts. And the _slugged_
   * title of the blog post is appended to the path, i.e. `/blog/the-title`.
   */
  const loadBlogPosts = new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    `).then(({ errors, data }) => {
      if (errors) {
        reject(errors);
      }

      /**
       * @typedef {object} BlogPostNode
       * @property {object} fields
       * @property {string} fields.slug Slugged title of the post based on provided `frontmatter.title`
       * @property {object} frontmatter
       * @property {string} frontmatter.title Title of the blog post
       */
      /** @type {BlogPostNode[]} */
      const nodes = data.allMarkdownRemark.nodes;
      const numPages = Math.ceil(
        nodes.slice(postsPerFirstPage).length / postsPerPage,
      );

      createPage({
        path: '/blog',
        component: template.blog,
        context: {
          limit: postsPerFirstPage,
          skip: 0,
          numPages: numPages + 1,
          currentPage: 1,
        },
      });

      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: `/blog/${i + 2}/`,
          component: template.blog,
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage + postsPerFirstPage,
            numPages: numPages + 1,
            currentPage: i + 2,
          },
        });
      });

      nodes.forEach(({ fields }, i, a) => {
        const previous = i === 0 ? null : a[i - 1];
        const next = i === a.length - 1 ? null : a[i + 1];

        createPage({
          path: `/blog/${fields.slug}/`,
          component: template.post,
          context: {
            slug: fields.slug,
            previous,
            next,
          },
        });
      });

      resolve();
    });
  });

  /**
   * **Creates the paginated list of posts for every tag.**
   *
   * The first part is is a call to the `graphql` function passed with the
   * query string for this build step. This string only fetches what is need to
   * build all the tag pages.
   *
   * We let this query run asynchronously. If the query fails, the promise is
   * rejected and the build fails.
   *
   * If the query is successful, we get a list of tag objects. For each item in
   * the tag list, a page will be created.
   */
  const loadBlogTags = new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
    `).then(({ errors, data }) => {
      if (errors) {
        reject(errors);
      }

      /**
       * @typedef {object} BlogTagNode
       * @property {object} fields
       * @property {string} fields.slug Slugged title of the post based on provided `frontmatter.title`
       * @property {BlogTag[]} fields.plainTags Tags on provided `frontmatter.tags`
       * @property {object} frontmatter
       * @property {string[]} frontmatter.tags A list of tags provided in `frontmatter.tags`
       */
      /** @type {BlogTagNode[]} */
      const nodes = data.allMarkdownRemark.nodes;

      /**
       * @typedef {object} TagMapItem
       * @property {string} tag
       * @property {string[]} posts
       */
      /** @type {{ [index: string]: TagMapItem }} */
      const tagMap = {};

      nodes.forEach(({ frontmatter, fields }) => {
        const { slug } = fields;
        const { tags } = frontmatter;

        tags.forEach((tag) => {
          const sluggedTag = slugify(tag);
          const tagObj = tagMap[sluggedTag];

          if (tagObj) {
            tagObj.posts.push(slug);
          } else {
            tagMap[sluggedTag] = {
              tag,
              posts: [slug],
            };
          }
        });
      });

      Object.entries(tagMap).forEach(([slug, { tag, posts }]) => {
        const totalPosts = posts.length;
        const numPages = Math.ceil(totalPosts / postsPerPage);

        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: `/blog/tag/${slug}/${i === 0 ? '' : i + 1}`,
            component: template.tag,
            context: {
              tag,
              slug,
              totalPosts,
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages: numPages,
              currentPage: i + 1,
            },
          });
        });
      });

      resolve();
    });
  });

  /**
   * **Creates the paginated list of author posts for every author.**
   *
   * The first part is is a call to the `graphql` function passed with the
   * query string for this build step. This string only fetches what is need to
   * build all the paginated list of author posts.
   *
   * We let this query run asynchronously. If the query fails, the promise is
   * rejected and the build fails.
   *
   * If the query is successful, we get a list of author objects. For each item
   * in the author list, a page will be created. The definition of an author
   * entry is provided in `<rootDir>/content/author.yml`.
   */
  const loadBlogAuthors = new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              author {
                id
                name
              }
            }
          }
        }
      }
    `).then(({ errors, data }) => {
      if (errors) {
        reject(errors);
      }

      /**
       * @typedef {object} BlogAuthorNode
       * @property {object} fields
       * @property {string} fields.slug Slugged title of the post based on provided `frontmatter.title`
       * @property {object} frontmatter
       * @property {object} frontmatter.author Mapped author object
       * @property {string} frontmatter.author.id Author ID
       * @property {string} frontmatter.author.name Author display name
       */
      /** @type {BlogAuthorNode[]} */
      const nodes = data.allMarkdownRemark.nodes;
      /**
       * @typedef {object} Author
       * @property {string} id Author ID
       * @property {string} name Author display name
       * @property {string[]} posts List of slugged post titles
       */
      /** @type {{ [index: string]: Author }}*/
      const authorMap = {};

      nodes.forEach(({ frontmatter, fields }) => {
        const { author } = frontmatter;
        const sluggedAuthor = slugify(author.id);
        const authorObj = authorMap[sluggedAuthor];

        if (authorObj) {
          authorObj.posts.push(fields.slug);
        } else {
          authorMap[sluggedAuthor] = {
            name: author.name,
            id: author.id,
            posts: [fields.slug],
          };
        }
      });

      Object.entries(authorMap).forEach(
        ([slug, { id: authorId, name: authorName, posts: authorPosts }]) => {
          const totalPosts = authorPosts.length;
          const numPages = Math.ceil(totalPosts / postsPerPage);

          Array.from({ length: numPages }).forEach((_, i) => {
            createPage({
              path: `/blog/author/${slug}/${i === 0 ? '' : i + 1}`,
              component: template.author,
              context: {
                authorId,
                authorName,
                totalPosts,
                slug,
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages: numPages,
                currentPage: i + 1,
              },
            });
          });
        },
      );

      resolve();
    });
  });

  return Promise.all([loadBlogPosts, loadBlogTags, loadBlogAuthors]);
};
