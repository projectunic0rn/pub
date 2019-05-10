---
title: 'Contributing Part III: Project Unicorn Web Site'
author: rmjordas
date: '2019-05-12'
tags:
  - Project Unicorn
  - contributing
---

You made it to the last part! Good job.

In this post, we'll inspect the code that allows us to do the things we did on
the previous post. All this is possible thanks to Gatsby. I won't be examining
every aspect of Gatsby in this article, just the ones use by this project.
Please refer to Gatsby's excellent documentation for stuff that are not in here.

> This is part 3 of the Project Unicorn Contributing Guide series for
> documenting how to contribute to the Project Unicorn web site repository.
>
> This is the last part of the series.

A friendly warning, this part covers advanced topics. This article serves as an
overview of the source for the Project Unicorn web site.

### Environment Variables

Environment variables can be added in an `.env` as key-value pairs following
this syntax: `EXAMPLE_KEY="a value"` (See [`.env.example`][envexample]).

> **WARNING**: You should **not** put sensitive values in `.env`. These
> values are bundled together with the application and anyone can inspect them.

#### Gatsby Telemetry

Gatsby added [telemetry][gatsby_telemetry] when they release version 2.3.0. You
can disable this by running:

[gatsby_telemetry]: https://www.gatsbyjs.org/docs/telemetry/

```bash
gatsby telemetry --disable
```

Alternatively, you may set `GATSBY_TELEMETRY_DISABLED` to `1` on the project
`.env` file:

```
GATSBY_TELEMETRY_DISABLED=1
```

> **NOTE**: You might also need to restart the development server when you
> change the `.env`.

## Add a page

You are not limited to just adding blog posts. If you like to have a landing
page of sorts for your project or something, you can. So we can have pages for
these paths: `/help`, `/grocerhub`, `/slack-invite`, etc.

A page can be very simple and can be crammed into one file, e.g. `404.tsx`,
`index.tsx` (this file creates Pub's landing page), `tags.tsx`, etc..

For now, the process of adding pages is not as streamlined as there are a lot of
considerations like: How can a user reach that page, or are we going to change
the layout of pages to add a component that links to that page, i.e. navigation
components, etc. It can potentially change the design of the website. Also,
adding pages require that you know React, TypeScript and GraphQL.

### Simple pages

If you want to add a simple page, just add a React component in the
[pages](/src/pages) directory. If you want a `/help` page, you should name this
file `help.tsx`. If you want a page on `/grocerhub/devs`, first create a new
directory in `/src/pages` called "grocerhub" and inside that directory add
`devs.tsx`.

Consider this file created at `pages/` called `my-page.tsx`:

```tsx
import * as React from 'react';

interface OwnProps {
  name?: string;
}

type MyPageProps = OwnProps;

const MyPage: React.FC<MyPageProps> = ({ name = 'Uny' }) => (
  <h1>Welcome to {name}</h1>
);

export default MyPage;
```

Once you build your app, you can view this page on `/my-page`. This page
displays a very basic page where there's only a heading element as its content.

Most likely you would need to also show the top navigation and footer. These can
be added by importing the `Layout` component. Wrap your content inside this
component.

To update the values of elements in the `<head />`, you should use the `Seo`
component. You can put this anywhere the component heirarchy.

```tsx
import * as React from 'react';

import { Layout, Seo } from '@components/shared';

// ...

const MyPage: React.FC<MyPageProps> = ({ name = 'Uny' }) => (
  <React.Fragment>
    <Seo title="My page" />

    <Layout>
      <h1>Welcome to {name}</h1>
    </Layout>
  </React.Fragment>
);

export default MyPage;
```

You would notice that we're using the default export in components. Although we
can do named export, i.e. `export const MyPage = () => ();` on some components,
Gatsby requires templates to use default export. Rather than use a mix of named
and default exports, the project strictly enforces the rule that all components
must use the default export syntax to avoid confusion.

### Advanced pages

Once your component requires data from some source, e.g. the project's URL,
the author of the blog post, etc., you must define the query that this component
will perform on build.

The most basic query you can add to your page is "static query". These could be
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

The query above will get an image called `default-post.image.jpg`. Since this is
defined to be _fluid_ image Gatsby will optimize this image by creating various
versions. To use this you need to import a special element from `gatsby-image`
called `Img` and pass the value of `data.file.childImageSharp.fluid` to the
`fluid` attribute.

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

const SomeComponent: React.FC<SomeComponentProps> = ({ data }) => (
  <Img fluid={data.file.childImageSharp.fluid} />
);

export default SomeComponent;
```

Some queries are quite common that these were extracted to their own custom
React hook. The above query is equivalent to using the `useDefaultPostImage`
React hook:

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

### Even more advance pages

When you need to display a list of something, say, a list of recent blog posts,
the process is more involved. First you would define a _page template_ in the
`templates/` directory. This component is similar to other pages you will make
except for the format of the query it exports (we'll go into detail later).

Next step is to tell Gatsby that you want to create this page. Gatsby does not
care about components outside the `pages/` directory by default. You can either
configure Gatsby to _watch_ a directory (e.g. `pages/`) or explicitly call a
method to create this page.

The Gatsby's Node API configuration file is located at
`<rootDir>/gatsby-node.js` and this is where we'll tell Gatsby to create the
pages. The snippet below will create a single page that can be accessed at
`/blogpostlist`.

```js
const path = require('path');

exports.createPages = ({ actions }) => {
  actions.createPage({
    path: '/blogpostlist',
    component: path.resolve('./src/templates/blog.tsx'),
    context: {
      limit: 6,
      skip: 0,
    },
  });
};
```

The exported `createPages` anonymous function is passed an object when Gatsby
builds the app. The method we need is inside the the `actions` field inside this
object.

> [The `createPage` Action](https://www.gatsbyjs.org/docs/actions/#createPage)

Inside the exported `createPages` anonymous function, we call `graphql`
from the destructured parameters, and pass it a template literal containing the
a query. This query could contain

```js
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const loadBlogPosts = new Promise((resolve, reject) => {
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
        reject(errors);
      }
    });

    createPage({
      path: '/blog',
      component: template.blog,
      context: { limit: 6, skip: 0 },
    });

    resolve();
  });

  return Promise.all([loadBlogPosts]);
};
```

## Troubleshooting

### Commiting changes to Git fails and deletes my changes from my file system

Not sure what is the exact cause of this but this could happen if you are
running a local Gatsby development server, and you trigger the pre-commit hook
(by running `git commit`). The pre-commit hook will process your changes and run
type checks and some formatting. These actions probably overwhelms the Node.js
process for some reason and deletes the changes along with other files.

When this happens, you can still recover the deleted files that commited to Git,
but **all** new changes will be lost (unless you have some program that tracks
changes to files, e.g. Dropbox history, etc.).

For _very large diffs_, it is advisable to shut down the Gatsby local
development server first before commiting to Git.

### Everything runs slow when I'm editing with Visual Studio Code

There is a TypeScript release that caused type checking to run 20x slower on
projects that use Styled Components type definitions. To fix this, please make
sure you that your editor is using the same TypeScript version as the project.
Refer to the bottom right portion of the status bar when you have an open
TypeScript file. To change this value, click the version value and pick "Use
Workspace Version" on the dropdown.

## Maintenance

### Dependencies

Packages are pinned to a specific version, thus you might need to run an update
every now and then. Run `npm oudated` to check which packages are not in their
latest versions. You may choose to update all packages or just some: maybe those
that release `MAJOR` or `MINOR` but not `PATCH` versions.

If you do update, make sure to do checks to see if it broke something in the
app. Run all the test suites to see if something fails, then generate a
production build using `npm run build` and see if there are any build errors.
You can delete Gatsby artifacts in `.cache` and `public` by running
`npm run clean` and run the checks again if you're still having trouble.

> **NOTE**: Don't forget to also commit changes in `package-lock.json`!

When you updgrade the Node.js version, be sure to check if the Travis
configuration matches the `MAJOR` version, i.e. `7`, `10`, `11`. You don't need
to specify the `MINOR` and `PATCH` versions.

```yaml
# Update the value in this part of `travis.yml`
node_js:
  - '10'
```
