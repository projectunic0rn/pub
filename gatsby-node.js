const path = require('path');

const { slugify } = require('./scripts/slugify');

/** Paths to available templates. */
const template = {
  blog: path.resolve('./src/templates/blog.tsx'),
  tag: path.resolve('./src/templates/tag.tsx'),
  post: path.resolve('./src/templates/post.tsx'),
  author: path.resolve('./src/templates/author.tsx'),
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
  const { createPage } = actions;

  /**
   * Creates the main blog index page, the paginated list of blog posts and the
   * individual pages for each blog post.
   */
  const loadBlogPosts = new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
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
       * @typedef {object} BlogPostEdge
       * @property {string} id Gatsby generated ID for the blog post
       * @property {object} node
       * @property {object} node.fields
       * @property {string} node.fields.slug Slugged title of the post based on provided `frontmatter.title`
       * @property {object} node.frontmatter
       * @property {string} node.frontmatter.title Title of the blog post
       */
      /** @type {BlogPostEdge[]} */
      const posts = data.allMarkdownRemark.edges;
      const postsPerFirstPage = 7;
      const postsPerPage = 6;
      const numPages = Math.ceil(
        posts.slice(postsPerFirstPage).length / postsPerPage,
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

      posts.forEach(({ node }, i) => {
        const previous = i === 0 ? null : posts[i - 1].node;
        const next = i === posts.length - 1 ? null : posts[i + 1].node;

        createPage({
          path: `/blog/${node.fields.slug}/`,
          component: template.post,
          context: {
            slug: node.fields.slug,
            previous,
            next,
          },
        });
      });

      resolve();
    });
  });

  /** Creates the paginated list of posts for every tag. */
  const loadBlogTags = new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
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
       * @typedef {object} BlogTagEdge
       * @property {object} node
       * @property {object} node.fields
       * @property {string} node.fields.slug Slugged title of the post based on provided `frontmatter.title`
       * @property {object} node.frontmatter
       * @property {string[]} node.frontmatter.tags A list of tags provided in `frontmatter.tags`
       */

      /** @type {BlogTagEdge[]} */
      const posts = data.allMarkdownRemark.edges;
      /**
       * @typedef {object} Tag
       * @property {string} tag
       * @property {string[]} posts
       */
      /**
       *  Re-mapped tags.
       *
       *  @type {{ [index: string]: Tag }}
       */
      const tags = {};

      posts.forEach(({ node }) => {
        const { tags: postTags } = node.frontmatter;

        if (!postTags) {
          return;
        }

        postTags.forEach((tag) => {
          const sluggedTag = slugify(tag);
          const tagObj = tags[sluggedTag];

          if (tagObj) {
            tagObj.posts.push(node.fields.slug);
          } else {
            tags[sluggedTag] = {
              tag,
              posts: [node.fields.slug],
            };
          }
        });
      });

      const postsPerPage = 6;

      Object.entries(tags).forEach(([slug, { tag, posts }]) => {
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

  /** Creates the paginated list of author posts for every author. */
  const loadBlogAuthors = new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
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
      }
    `).then(({ errors, data }) => {
      if (errors) {
        reject(errors);
      }

      /**
       * @typedef {object} BlogAuthorEdge
       * @property {object} id Gatsby generated ID for the blog post
       * @property {object} node
       * @property {object} node.fields
       * @property {string} node.fields.slug Slugged title of the post based on provided `frontmatter.title`
       * @property {object} node.frontmatter
       * @property {object} node.frontmatter.author Mapped author object
       * @property {string} node.frontmatter.author.id Author ID
       * @property {string} node.frontmatter.author.name Author display name
       */
      /** @type {BlogAuthorEdge[]} */
      const posts = data.allMarkdownRemark.edges;
      /**
       * @typedef {object} Author
       * @property {string} id Author ID
       * @property {string} name Author display name
       * @property {string[]} posts List of slugged post titles
       */
      /**
       * Re-mapped authors.
       *
       *  @type {{ [index: string]: Author }}
       */
      const authors = {};

      posts.forEach(({ node }) => {
        const { author } = node.frontmatter;

        if (!author) {
          return;
        }

        const sluggedAuthor = slugify(author.id);
        const authorObj = authors[sluggedAuthor];

        if (authorObj) {
          authorObj.posts.push(node.fields.slug);
        } else {
          authors[sluggedAuthor] = {
            name: author.name,
            id: author.id,
            posts: [node.fields.slug],
          };
        }
      });

      const postsPerPage = 6;

      Object.entries(authors).forEach(
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
