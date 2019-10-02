---
title: 'Contributing Part III: Project Unicorn Web Site'
author: rmjordas
date: '2019-08-30'
image: ./hero.jpg
tags:
  - Project Unicorn
  - contributing
---

In this post, we'll inspect the code that allows us to do the things we did in
the previous post. All this is possible thanks to [Gatsby][]. I won't be
examining every aspect of Gatsby in this article, just the ones use by this
project.

Please refer to Gatsby's excellent documentation for stuff that is not in here.

[gatsby]: https://www.gatsbyjs.org/

> This is part 3 of the Project Unicorn Contributing Guide series for
> documenting how to contribute to the Project Unicorn web site repository.
>
> This is the last part of the series.

A friendly warning, this part covers advanced topics. This article serves as an
overview of the source for the Project Unicorn web site.

## Basics

In this section, we'll learn how to preview your blog post in the browser. This
allows you to see your post as if it's already published in the Project Unicorn
web site.

Even if you wrote the blog posts with correct Markdown syntax, sometimes you may
need to preview the article itself to get a sense of how it may look when you
publish it.

### Preview blog posts

> **NOTE**: I'm assuming you already have a copy of the repository in your
> machine. Please read the first Part 1 if you forgot how to do that.
>
> [Contributing Part I: Getting Started](/blog/contributing-part-i-getting-started/)

The first thing we'll do is to get to know the `npm` command-line interface (or
CLI). `npm` is the package manager included with Node.js. It used to mean "Node
Package Manager" because it's responsible for fetching node _modules_ but now,
it's just `npm`.

> **NOTE**: They also insist to call it `npm` instead of `Npm` or `NPM`.

To interact with `npm`, we have to open a terminal (or Git Bash on Windows) to
provide it with commands. It similar to how we interact with Git. So here's your
first command to try:

```bash
npm help
```

This command will output how to use the `npm` CLI. We're almost ready to inspect
our blog post, but for one more thing.

### Running `npm` scripts

Before you can inspect the app in your browser, you have to first download some
packages that this project requires. You can see a list of dependencies inside
the file called [`package.json`][packagejson] in `$PROJECT_ROOT`.

There's a lot of dependencies listed but you don't need to know what every
package does for now. You should notice though that there are two types of
dependencies: `dependencies` and `devDependencies`. Packages that the app will
directly use are inside the `dependencies` object and the ones that are for
development, testing, formatting, etc. are in `devDependencies`.

We need a way to get all those dependencies in our machine. The `npm` executable
provides a command to download all the project's dependencies:

```bash
pwd # You must be in the $PROJECT_ROOT
npm install
```

This will grab all the packages and put them inside
`$PROJECT_ROOT/node_modules`.

After that, you can now run the app by executing this command in your terminal:

```bash
pwd # $PROJECT_ROOT
npm start
```

**This command will fail** and `npm` would tell you that "&lt;something> is not
provided". For now, copy the file called
[`$PROJECT_ROOT/.env.example`][envexample] to a new file called
`$PROJECT_ROOT/.env`:

```bash
cp .env.example .env
```

What this file is for will be discussed later.

Now when you re-run the script, it will print some output about the status of
the build and after that, it will give you instruction on how to preview it. By
default the location is http://localhost:8000.

Keep this local server running and you'll be able to view the updates
immediately when you change your blog post.

### Other commands

The project also specifies other `npm` scripts you can run when working with
specific portions of the application:

| Script             | Description                                                                   |
| ------------------ | ----------------------------------------------------------------------------- |
| `build`            | Outputs the static assets for deployment                                      |
| `clean`            | Wipes out the contents of the .cache and public directories                   |
| `dev`              | Spawns a Gatsby development server                                            |
| `dev:m`            | Similar to `dev` but can preview changes on other devices in the same network |
| `format`           | Runs the Prettier for Markdown and JSON files                                 |
| `format:precommit` | Similar to `format` but with less arguments                                   |
| `lint`             | Runs ESLint to report lint errors                                             |
| `lint:fix`         | Runs ESLint to check and fix errors (if possible)                             |
| `start`            | Serves the production build of the app                                        |
| `test`             | Runs Jest to report results from unit tests                                   |
| `typecheck`        | Runs the TypeScript compiler to report type errors                            |

The ones you're most likely to use is `dev`, `test` and `clean`. The other
scripts are mostly used to prepare the app for deployment or for some automated
tasks like reporting errors before committing changes.

### Environment variables

You may choose to provide the application some configuration via environment
variables when you are running scripts.

> [Environment Variables](https://www.gatsbyjs.org/docs/environment-variables/)

Environment variables can be added in an `.env` file as key-value pairs
following this syntax: `EXAMPLE_KEY="a value"` (See
[`.env.example`][envexample]). When you change something here, be sure to
restart the development server.

[envexample]: https://github.com/projectunic0rn/pub/blob/master/.env.example

> **WARNING**: You should **not** put sensitive values in `.env`. These
> values are bundled together with the application and anyone can inspect them.

### Add new directory aliases

Most of the application source code lives in the [`src`][src] directory. This
directory is aliased as `@`. So, for example, you want to import a method in the
file called `my-util.ts` inside the `src` directory, you can simply declare it
like:

```ts
import { someMethod } from '@/my-util';
```

To view the list of aliases available for commonly accessed directories please
refer to the TypeScript configuration file at
[`$PROJECT_ROOT/tsconfig.json`][tsconfig].

[tsconfig]: https://github.com/projectunic0rn/pub/blob/master/tsconfig.json

To add a directory, add an entry to the "`compilerOptions.paths`" object. The
key for this entry will be the alias and the value is an array of paths relative
to "`compilerOptions.baseUrl`".

So if you want an alias for a directory called `$PROJECT_ROOT/src/stuff/`:

```json
// inside tsconfig.json
{
  "compilerOptions": {
    // ...
    "paths": {
      // ...
      "@stuff/*": ["./src/stuff/*"]
    }
  }
}
```

You should also add this directory to the Gatsby configuration file. It should
be place inside the options for the `gatsby-plugin-alias-imports`:

```javascript
module.exports = {
  // ...
  plugins: [
    // ...
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          // ...
          '@stuff': 'src/stuff',
        },
      },
    },
  ],
};
```

> **NOTE**: Don't forget to restart your development server and your editor/IDE.

Now you can import any file inside `./src/stuff` by doing:

```ts
import { someMethod } from '@stuff/file';
```

> [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

## Add a page

Now we're done with the basics, we can talk about the "internals" of the Pub
project.

We've been focusing a lot on writing blog posts but we are not limited to that
task. Gatsby might have gained a reputation for being a static generator, but it
can also be used for building simple (not statically generated) React projects.
You could also create a mix of the two to create a "hybrid app".

> [Hybrid app pages](https://www.gatsbyjs.org/docs/building-apps-with-gatsby/#hybrid-app-pages)

At the time of writing this article, the Pub project is considered to use only
the static site generation features of Gatsby. But that might change in the
future.

Going back to page creation, if you like to have a landing page of sorts for
your Project Unicorn project or a simple information page about something, you
can do it with Gatsby. So if you want to, you can have pages for these paths:
`/help`, `/grocerhub`, `/slack-invite`, `/whatever`, etc..

A page can be very simple and can be crammed into one file. For example,
[`@pages/404.tsx`][404page] and [`@pages/about.tsx`][aboutpage] are just React
components with content inlined. I consider these as "simple" pages and we'll
talk more about them in a later section.

[404page]: https://github.com/projectunic0rn/pub/blob/master/src/pages/404.tsx
[aboutpage]: https://github.com/projectunic0rn/pub/blob/master/src/pages/about.tsx

For now, the process of adding pages is not as streamlined as there are a lot of
considerations like: How can a user reach that page, or are we going to change
the layout of pages to add a component that links to that page, i.e. navigation
components, etc. It can potentially change the design of the website.

### Prerequisites

This article assumes you have some experience in the following technologies:

- JavaScript
- TypeScript
- React.js
- GraphQL

But you don't need to be an expert at any of these to continue.

### Simple pages

If you want to add a simple page, just add a React component in the
[@pages][pages] directory. The `@pages` directory is significant for Gatsby. If
you put a React component in this directory Gatsby will try to make a page that
is available at `/<filename>`. So if you want a `/help` page, you should name
this file `help.tsx`. If you want a page on `/grocerhub/devs`, first create a
new directory in `@pages` called "grocerhub" and inside that directory add
`devs.tsx`.

[pages]: https://github.com/projectunic0rn/pub/tree/master/src/pages

Consider this file created at `pages/` called `my-page.tsx`:

```tsx
import * as React from 'react';

interface OwnProps {
  name?: string;
}

type MyPageProps = OwnProps;

const MyPage: React.FC<MyPageProps> = ({ name = 'Project Unicorn' }) => (
  <h1>Welcome to {name}</h1>
);

export default MyPage;
```

Once you build your app, you can view this page on `/my-page`. This page
displays a very basic page where there's only a heading element as its content.

Most likely you would need to also show the top navigation and footer. These can
be added by importing the `Layout` component. Wrap your content inside this
component.

To update the values of elements in the `<head />` element, you should use the
`Seo` component. You can put this anywhere in the component hierarchy.

```tsx
import * as React from 'react';

import { Layout, Seo } from '@components/shared';

// ...

const MyPage: React.FC<MyPageProps> = ({ name = 'Project Unicorn' }) => (
  <React.Fragment>
    <Seo title="My page" />

    <Layout>
      <h1>Welcome to {name}</h1>
    </Layout>
  </React.Fragment>
);

export default MyPage;
```

You would notice that we're using the default export syntax in components.
Although we can use the named export syntax on some components, i.e.:

```tsx
export const MyPage = () => ();
```

Gatsby requires templates to use default export. Rather than
use a mix of named and default exports, this project strictly enforces the rule
that all components must use the default export syntax to avoid confusion.

### Advanced pages

Once your component requires data from some source, you must define the query
that this component will perform on build. The most basic query you can add to
your page is "static query". These queries can be used to get an image path or
data about the website, e.g. name, description, etc..

```graphql
query {
  file(relativePath: { eq: "default-post-image.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1800) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
```

The query above will get an image called `default-post.image.jpg`. If you'd
notice there's no such file on the `$PROJECT_ROOT`. It's located in
[`@images`][imagespath]. Thanks to the `gatsby-source-filesystem` plugin, we
allow the app to source from our local file system in the directories we
specify.

[imagespath]: https://github.com/projectunic0rn/pub/tree/master/src/images

Since this is defined to be _fluid_ image Gatsby will optimize this image by
creating various versions. To use this you need to import a special element from
`gatsby-image` called `Img` and pass the value of
`data.file.childImageSharp.fluid` to the `fluid` attribute.

```tsx
import { graphql } from 'gatsby';
import { Img, FluidObject } from 'gatsby-image';
import * as React from 'react';

interface SomeComponentProps {
  data: {
    file: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  };
}

export const defaultPostImageQuery = graphql`
  query {
    file(relativePath: { eq: "default-post-image.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

/* A component for rending a fluid image. */
const SomeComponent: React.FC<SomeComponentProps> = ({ data }) => (
  <Img fluid={data.file.childImageSharp.fluid} />
);

export default SomeComponent;
```

Some queries are quite common that these were extracted as a custom React hook.
The above query is equivalent to using the `useDefaultPostImage` React hook:

```tsx
import { Img } from 'gatsby-image';
import * as React from 'react';

import { useDefaultAvatarImage } from '@hooks';

const SomeComponent: React.FC = () => {
  const defaultAvatarImage = useDefaultAvatarImage();

  return <Img fluid={defaultAvatarImage.childImageSharp.fluid} />;
};

export default SomeComponent;
```

You're probably confused on why we'd ever need to do this instead of just
importing the image directly.

One of Gatsby's well-know feature is called progressive image loading. If you
happen upon reading something on Medium, you'd notice that sometimes images
appear blurry at first, then it gets clearer until it displays the clearest
version of the image. This is similar to what Gatsby does with some of our
images in the Pub
web site.

> **NOTE**: If have a great internet connection you might not see the blurring.

Not only does it create blurry versions, it also makes versions of different
sizes. This provides a better experience for folks who browser our app that are
on slower speed and are typically on a mobile browser. Instead of loading an
image larger than the display dimensions of the browser, Gatsby will use the
most suitable size for that dimension.

Don't go crazy with this and use it on every one of the images inside the
project. Sometimes it's fine just to use the OG `<img />` element.

### Even more advance pages

When you need to display a list of something, say, a list of recent blog posts,
the process is more involved. First, you would define a _page template_ in the
[`@templates`][templatespath] directory. This component is similar to other
pages you will make except for the format of the query it exports (we'll go into
detail later).

[templatespath]: https://github.com/projectunic0rn/pub/tree/master/src/templates

Consider this very basic template called `blog-post-list.tsx`:

```tsx
import * as React from 'react';

interface BlogPostListProps {
  data: {
    allMarkdownRemark: {
      nodes: {
        frontmatter: {
          title: string;
        }[];
      };
    };
  };
  pageContext: {
    skip?: number;
    limit?: number;
    currentPage?: number;
  };
}

export const blogPostListQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        frontmatter {
          title
        }
      }
    }
  }
`;

/*
 * Displays a list of the title of the most recent blog posts and a page number
 * at the bottom.
 */
const BlogPostList: React.FC<BlogPostListProps> = ({ data, pageContext }) => (
  <div>
    <h1>Blog posts</h1>

    {data.allMarkdownRemark.nodes.map(({ frontmatter }) => (
      <li>{frontmatter.title}</li>
    ))}

    <p>This is page number {data.pageContext.currentPage}</p>
  </div>
);

export default BlogPostList;
```

What this displays is a page that lists the titles of the blog posts in our
project and a page number at the bottom. The list is sorted with the most recent
blog post at the top. It's also paginated thanks to the page context we will
provide later when we are modifying the Gatsby Node API configuration file.

Remember when you made your blog post in `$PROJECT_ROOT/content`? This is a known
source directory because it is specified in the Gatsby configuration file. This
is where we get our data for the blog posts. In other projects, you might see
that they get their blog posts (and other sources) on a remote database or
service.

The `<BlogPostList />` component does not care about where to get the data. It
only cares that it is structured correctly.

After creating the component, the next step is to tell Gatsby that you want to
create this page. Gatsby does not know about components outside the `@pages`
directory by default. You can either configure Gatsby to _watch_ a directory or
explicitly call a method to create this page.

The Gatsby's Node API configuration file is located at
[`$PROJECT_ROOT/gatsby-node.js`][gatsbynode] and this is where we'll tell Gatsby
to create the pages. The snippet below will create a single page that can be
accessed at `/blogpostlist`.

```js
const path = require('path');

exports.createPages = ({ actions }) => {
  // ...

  actions.createPage({
    path: '/blogpostlist',
    component: path.resolve('./src/templates/blog-post-list.tsx'),
    context: {
      limit: 6,
      skip: 0,
    },
  });
};
```

The exported `createPages` anonymous function is passed an object when Gatsby
builds the app. The method we need is inside the `actions` field inside this
object.

> [The `createPage` Action](https://www.gatsbyjs.org/docs/actions/#createPage)

Inside the exported `createPages` anonymous function, we can also call the
`graphql` method from the destructured parameters, and pass it a template
literal containing the query. This query could contain:

```js
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  // This will query ALL the blog posts, create a page for the blog post index,
  // the individual blog posts, and the paginated blog post lists.
  const loadBlogPosts = new Promise((resolve, reject) => {
    // this method accepts a query string
    graphql(`
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          nodes {
            frontmatter {
              title
            }
          }
        }
      }
    `).then(({ errors, data }) => {
      if (errors) {
        // if there are errors, the build fails
        reject(errors);
      }

      const nodes = data.allMarkdownRemark.nodes;
      const numPages = Math.ceil(
        nodes.slice(postsPerFirstPage).length / postsPerPage,
      );

      // the first page doesn't need the page number in its path if you want
      createPage({
        path: '/blogpostlist',
        component: path.resolve('./src/templates/blog-post-list.tsx'),
        context: {
          limit: 6,
          skip: 0,
          currentPage: 1,
        },
      });

      // the next pages, i.e. /blogpostlist/2, /blogpostlist/3, ...
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: `/blogpostlist/${i + 2}/`,
          component: path.resolve('./src/templates/blog-post-list.tsx'),
          context: {
            limit: 6,
            skip: (i + 1) * 6,
            currentPage: i + 2,
          },
        })
      })

      // finally, create each individual blog posts
      nodes.forEach((_, i, a)) => {
        createPage({
          // normally we would use a "slug" but we didn't create a field for that
          path: `/blog/${i + 2}`,
          // we need to create a new template for individual posts in the @templates directory
          // we didn't do that in this guide but you need a template that makes
          //  sense for each individual blog post
          component: './src/templates/blog-post.tsx',
          context: {
            // it's up to the individual post template to specify what it needs
          }
        })
      }

      resolve();
    });
  });

  return Promise.all([loadBlogPosts]);
};
```

That's it for Gatsby.

To be honest I didn't want to go deeper with the discussion because Gatsby
already has excellent documentation.

> [Gatsby.js Documentation](https://www.gatsbyjs.org/docs/)

## Why I wrote "Pub" like this

This section explains why I decided to implement the [Pub][] project like it
currently is. Please keep in mind that I'm a beginner and some of my reasoning
may be flawed. If you found something you want to correct please open an issue
on Pub's GitHub repository and feel free to tag me with my GitHub username
([@rmjordas][]).

### TypeScript vs JavaScript

Why not just use JavaScript to make everything simpler? Why add confusing types
to this simple project?

And my answer is the same to most questions in life: _Why not?_

But seriously, the reason I used TypeScript for this project is because I was
part of an earlier team in Project Unicorn that used it too. So, I figured, "eh,
why not?"

That's it.

### `npm` vs Yarn

For personal projects, the default package manager I use is Yarn. But here I
used just plain old `npm`. I do this for projects that I think may have future
collaborators as it makes the instructions simpler. `npm` is already available
when you install Node.js, whereas Yarn would need to be download and installed
separately.

Ultimately, It doesn't matter what package manager we use.

### Gatsby vs Next vs pure Webpack

> - Gatsby is hot right now
> - Next.js is hot too but I learned Gatsby first
> - SSR with Webpack is a nightmare I don't want to experience again

### Constants in the site config file

Values that don't change often are located in a file called
[`$PROJECT_ROOT/site.config.js`][siteconfig]. It contains the usernames for
social accounts, some URLs, the web manifest values, etc.

Adding a new constant or renaming an existing constant can mean changing it in a
lot of places. For example, adding a new social account username would need
changes in the following files:

- [`$PROJECT_ROOT/site.config.js`][siteconfig]
- type definitions in [`@hooks/use-site-metadata.ts`][usesitemetadata]
- GraphQL query string in [`@hooks/use-site-metadata.ts`][usesitemetadata]
- type definitions in component(s)
- usage themselves in components(s)

You may have noticed duplicated lines like those in the site config file and
the type definition of `useSiteMetadata` custom React hook. Unfortunately, it's
just the way it is when using TypeScript with GraphQL. We need to define the
type of the returned object from the GraphQL query. This duplication could be
avoided probably by adding another dependency but it's still manageable for now.

But you might be thinking, could we put some constants in
[`$PROJECT_ROOT/site.config.js`][siteconfig] and other constants in the
[`src`][src] itself (e.g. in `@components/constants.js` where it is _nearer_ to
its usage). This avoids touching the custom React hook if that constant doesn't
need to be queried by GraphQL and changing variable names only need to be
updated in:

- `@components/constants.js` (for example)
- usage themselves in components(s)

So why not drop [`$PROJECT_ROOT/site.config.js`][siteconfig] and move the
constants inside [`src`][src]? We can do that, but we can't take all constants
because some are used by Gatsby and Gatsby plugins. We need to move some
constants inside the Gatsby configuration file at
[`$PROJECT_ROOT/gatsby-config.js`][gatsbyconfig] and inside the Gatsby Node API
configuration file at [`$PROJECT_ROOT/gatsby-node.js`][gatsbynode].

Now we have three places where constants are declared and this introduces
confusion. We have to define what goes to where. I think it's simpler to just
dump them in one file. So, my advice is to put it all in
[`$PROJECT_ROOT/site.config.js`][siteconfig] except maybe when you're working on
a very large feature, I guess.

[src]: https://github.com/projectunic0rn/pub/tree/master/src
[siteconfig]: https://github.com/projectunic0rn/pub/blob/master/site.config.js
[usesitemetadata]: https://github.com/projectunic0rn/pub/blob/master/src/hooks/use-site-metadata.ts
[gatsbyconfig]: https://github.com/projectunic0rn/pub/blob/master/gatsby-config.js
[gatsbynode]: https://github.com/projectunic0rn/pub/blob/master/gatsby-node.js

Anyway, you'll know it when you need to break it up. Don't try to force it
inside that one file.

### Function components vs class components

React [introduced hooks][hooksintro] in version 16.8 and this description
perfectly summarizes what it's all about:

[hooksintro]: https://reactjs.org/docs/hooks-intro.html

> [Hooks] let you use state and other React features without writing a class.

I encourage you to read about their motivations for why they added this feature
to React. If you've worked with a lot of bigger React projects, you'll
appreciate what hooks offers.

This project avoids introducing any class component. There are times when class
components are necessary but they should be transformed to function components,
as soon as it's possible to do so.

React may decide to deprecate class component declarations in the future so I
decided that for this project, all components should be declared as function
components, that is, until Dan Abramov and the React developers introduce yet
another way to declare components.

### Styled Components vs pure CSS

I hate writing CSS. It's what makes me temporarily lose interest in whatever
feature I am working. Sadly, CSS won't go away anytime soon. It's inevitable as
much as I wish it otherwise.

But hold up. This project has no `*.css` files anywhere. _What's up with that?_

Well, we don't write any styles in `.css` files but rather we let JavaScript
write the CSS for us. Of course, we still need to express how we want to style
our pages, for that we need the Styled Components library.

_Why on earth do we need JavaScript to write CSS for us?_

One reason is that browsers do not implement all features of the latest version
of CSS. Google Chrome could support a feature whereas Microsoft Edge partially
supports it through a _prefix_ for a CSS rule. It's not fun to hunt down these
prefixed CSS rules and add it to our stylesheets. Using Styled Components, we
can write rules directly from the current specification and let it handle all
the tedious prefix inclusion for browsers that need it.

Another reason is to avoid thinking about the "cascade". The cascade is one of
the best/worst thing about CSS. I don't like it because it can be the reason for
bloated CSS files. It tends to produce unused styles in my projects—those rules
that I might forget to remove when I "patch" the styles far down the cascade.

With Styled Components, we can minimize this. We only add the styles directly to
the component that uses them. There's no need to worry about the cascade because
components are given uniquely generated class names to ensure they don't clash
whatsoever. This fits well with React and how it addresses _separation of
concerns_.

There are a lot more to Styled Components and I encourage you to explore their
[web site][styledcomponents].

[styledcomponents]: https://styled-components.com

> **NOTE**: An alternative to using Styled Components is to use a pre-processor
> like, [Sass][]. There's also a Gatsby plugin that allows us to use Sass files
> in our components. We can also utilize S/CSS modules to solve the specificity
> issues.

[sass]: https://sass-lang.com/

### Pinning dependencies vs version ranges

[`$PROJECT_ROOT/package.json`][packagejson], contains the list of `npm` packages
that this project depends on. You'd notice that I didn't add those tilde (`~`)
or caret (`^`) characters.

[packagejson]: https://github.com/projectunic0rn/pub/blob/master/package.json

If you don't know, `npm` allows you to declare package versions as ranges and
that's what those characters are for. Packages are encouraged to follow
[Semantic Versioning][semver] (sometimes called "SemVer") when releasing new
versions.

[semver]: https://semver.org/

There are three parts to the version number in a typical `npm` package: `MAJOR`,
`MINOR` and `PATCH`:

> `MAJOR.MINOR.PATCH`

From SemVer's website, these values are incremented if you:

- `MAJOR` - make incompatible API changes
- `MINOR` - add functionality in a backwards compatible manner
- `PATCH` - make backwards compatible bug fixes

A package version with a tilde, e.g. `~0.24.3` is considered to be
"approximately equivalent to `0.24.3`" and any version with a `PATCH` value
greater than or equal to `3` and with the same `MAJOR` and `MINOR` values is
valid.

Whereas a package version with a caret, e.g. `^0.24.3` is considered
"compatible with `0.24.3`" and any `MINOR` value greater than or equal to `24`
and with the same `MAJOR` value is valid (`PATCH` value can be anything).

Some claim that pinning dependencies is a _must_ because developers may publish
a "bad" release and it might break your project (even if it's considered
to be a `PATCH` release). Others say don't bother because it's too tedious to
maintain and it makes the Git history noisier.

I've seen projects that use either version ranges or version pinning but it's
more common to see those that use version ranges, probably because it's the
default behavior when installing packages from the `npm` registry.

I've never been comfortable with dependency versions that aren't explicitly
declared. I'd rather update each package manually and potentially introduce
noise to the Git history than let Node.js and `npm` decide what versions ranges
it can use. But that's just me.

## Troubleshooting and other concerns

### Running the `dev` script doesn't work! It say "&lt;something> is not provided!"

Please read the "[Running `npm` scripts](#Running-npm-scripts)" section.

### How do I disable Gatsby telemetry

Gatsby added [telemetry][gatsby_telemetry] when they release version 2.3.0. You
can disable this by running:

[gatsby_telemetry]: https://www.gatsbyjs.org/docs/telemetry/

```bash
gatsby telemetry --disable
```

Alternatively, you can add a new entry on your system's environment variables.

### Committing changes to Git fails and deletes my changes from my file system

Not sure what is the exact cause of this but this could happen if you are
running a local Gatsby development server, and you trigger the pre-commit hook
(by running `git commit`). The pre-commit hook will process your changes and run
type checks and some formatting. These actions probably overwhelm the Node.js
process for some reason and deletes the changes along with other files.

When this happens, you can still recover the deleted files that are committed to
Git, but **all** new changes will be lost (unless you have some program that
tracks changes to files, e.g. Dropbox history, etc.).

For _very large diffs_, it is advisable to shut down the Gatsby local
development server first before committing to Git.

### Everything runs slow when I'm editing with Visual Studio Code

There is a TypeScript release that caused type checking to run 20x slower on
projects that use Styled Components type definitions. To fix this, please make
sure that your editor is using the same TypeScript version as the project. Refer
to the bottom right portion of the status bar when you have an open TypeScript
file. To change this value, click the version value and pick "Use Workspace
Version" on the dropdown.

## Maintenance

### Code style guide

I strongly believe that every project needs to have documentation on how to
write code consistently. This section contains a possible style guide that Pub
maintainers can adapt and improve on.

To help clean up some common code style violations, we need a code formatter
like [Prettier][]. It will format the code when you trigger an action like
saving a file or committing changes to a Git repo. See this
[link][prettiereditor] to check if your editor has support for Prettier.

[prettier]: https://prettier.io
[prettiereditor]: https://prettier.io/docs/en/editors.html

> **TIP**: If you're using Visual Studio Code (VSCode), you'll probably see
> Prettier as a recommended extension for this project.

Also check if [EditorConfig](https://editorconfig.org/#download) is available in
your editor. This manages some of the auto-formatting the Prettier doesn't
cover.

What follows is my suggestion for a basic code style guide for the Pub project.

- **Print width**: My laptop screen is quite small so I prefer to have 80
  characters at most in one line. If this is too narrow for you, we can make it
  120 characters. Of course there are some cases where the line will exceed
  these limits, e.g. long URLs, then that’s fine.
- **Tab width**: Two (2) spaces per indentation-level is common in JavaScript
  and TypeScript projects.
- **Tabs**: No. Use spaces.
- **Semicolons**: You should always put semicolons at the end of your
  statements. This has the benefit of not having to memorize the rules for
  automatic semicolon insertion (ASI). Code that relies on ASI is _technically_
  erroneous code. Also, ECMA people are considering making semicolons mandatory
  in future ES versions.
- **Quotes**: Use single quotes for JavaScript and CSS; Use double quotes for
  JSX and HTML.
- **Trailing commas**: Always add trailing commas on multi-line statements, e.g.
  declaring an array of 20 items would most definitely be formatted to be a
  multi-line declaration. The last item should have a comma at the end. On
  single-line array and object declarations, the trailing comma is omitted. This
  makes diffing commits more accurately show the change introduced. Another
  benefit: Reordering items is easier since you don’t need to add a comma on the
  last item when you move it up.
- **Bracket spacing**: Add spaces at the start and the end of one-line object
  literals. For example, `const foo: SomeType = { a: true };`
- **JSX brackets**: Put the closing angle bracket on the next line. See
  Prettier's example for `jsxBracketSameLine: false`.
- **Arrow Function Parentheses**: Always add parenthesis on arrow functions even
  when it has only one parameter.
- **Filename**: Files should have `npm` style (kebab-case) names, if possible.
  This also applies to JSX files. Although there is a convention in React, to
  have PascalCasing on JSX file names, we will let the extension `.tsx`
  determine if the file exports a component. If the file is not a component then
  we will use a `.ts` extension.
- **End of line**: LF
- **Insert final newline**: Please insert a single newline character at the end
  of each file.

[Prettier configuration docs](https://prettier.io/docs/en/options.html)

It not much, but I believe it's a good starting point. I tried to include some
rules from popular JavaScript style guides like Airbnb and Google but I feel I'm
just copy-pasting portions of their rules to this style guide.

Besides, it's probably too early to finalize a code style guide seeing that (at
the time of writing) there's only one major feature present in the project, that
is, the blog. With more features added, I'm sure these rules will be refined.

### Dependencies

Packages are pinned to a specific version, thus you might need to run an update
now and then. Run `npm outdated` to check which packages are not in their
latest versions. You may choose to update all packages or just some: maybe those
that release `MAJOR` or `MINOR` but not `PATCH` versions.

If you do update, make sure to do checks to see if it broke something in the
app. Run all the test suites to see if something fails, then generate a
production build using `npm run build` and see if there are any build errors.
You can delete Gatsby artifacts in `.cache` and `public` by running
`npm run clean` and run the checks again if you're still having trouble.

> **IMPORTANT**: Don't forget to also commit changes in `package-lock.json`!

When you upgrade the Node.js version, be sure to check if the Travis
configuration matches the `MAJOR` version, i.e. `7`, `10`, `11`. You don't need
to specify the `MINOR` and `PATCH` versions.

```yaml
# Update the value in this part of `travis.yml`
node_js:
  - '10'
```

## The end

Thanks for reading!

If you find any errors please let me know by opening an issue on [Pub's GitHub
repository][pub] and tag me there with my GitHub username ([@rmjordas][]).

[pub]: https://github.com/projectunic0rn/pub
[@rmjordas]: https://github.com/rmjordas
