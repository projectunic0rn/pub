const path = require('path');

const { slugify } = require('./scripts/slugify');

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

      const posts = data.allMarkdownRemark.edges;
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

      const posts = data.allMarkdownRemark.edges;
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
        ([slug, { id: authorId, name: authorName }]) => {
          const totalPosts = posts.length;
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
