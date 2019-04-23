# Contributing Guide

Welcome unicorn!

Thank you for your interest in this project. To get started publishing blog
posts, fixing issues or adding new features, please read first the the
instructions below.

## Creating blog contents

### Setup blog post directory

Add a directory to [`content`](content/) that follows this name template:

```
YYYY-MM-DD-the-title-of-the-blog-post
```

The name consist of the year (`YYYY`), the month (`MM`), the day (`DD`) and the
title of the blog post where every character is lowercased and spaces and other
characters are changed into dashes. For example:

```
2012-12-12-the-end-of-the-world
```

This means the blog post is published on December 12, 2012 and its title is
"The End of the World". **Please ensure that every word is separated only by a
single dash (`-`)**.

Inside this directory, create a new file called `index.md`. You can use the
example file ([`index.md.example`](/content/index.md.example)) as a base for
your blog post.

### Writing with Markdown

Markdown is the markup language that we'll use to create blog posts. If you're
not familiar with the syntax you can see the following links:

- [Markdown: Syntax](https://daringfireball.net/projects/markdown/syntax)
- [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)

### Update blog post frontmatter

Inside `index.md.example` you will find a section at the top that starts and
ends with three dashes:

```markdown
---
title: The Unicorn
author: rmjordas
date: '2012-12-12'
image: ./unicorn-banner.jpg
tags:
  - cute
  - fluffy
---
```

This section is called the _frontmatter_ and it contains the most essential
information needed when creating the static page for a single blog post.

- **`title`** - Title of your blog post, this will be the text shown inside the
  hero image and it is included in the `<title>` of the HTML document for this
  blog post.
- **`author`** - A unique ID for the author of the blog post. Please refer to
  [Creating a new author](#creating-a-new-author) section for instructions on
  how to create an author entry.
- **`date`** - The date when the blog post was published. This follows a special
  format: `YYYY-MM-DDTHH:mm:sss+/-TT:TT` where hours (`HH`), minutes (`mm`),
  seconds (`sss`), and timezone offset (`+/-TT:TT`) are optional.
- **`image`** - Hero image for the blog post that contains the title of the blog
  post positioned at the top of the page below the navigation.
- **`tags`** - A list of words and/or phrases that can summarize the main topics
  of the blog post.

#### More frontmatter options

_TODO_

### Add images and other assets

To include images to your blog post, simply place them in the directory you
created and refer to them using Markdown syntax.

```markdown
## How to add images to your blog post

This is the syntax:

![This is the alternative text](./my-image.jpg)

Some text here.
```

#### Example

```markdown
![pu](https://avatars3.githubusercontent.com/u/41756078)
```

![pu](https://avatars3.githubusercontent.com/u/41756078)

> **NOTE**: Some image formats may not be recognized by the image transformer
> plugin, so it is best to stick to the common formats like: `jpg` (or `jpeg`),
> `png`, `gif`, `svg`, etc.

You can also add a hero image to your blog post. Similar to the other images,
you put this file inside the same directory but you add a reference to it on the
frontmatter of your `index.md` file. In the example below, the banner image is
reference in the `image` field. If you have not provided a value for this field,
a default image will be used instead.

```markdown
---
title: The Unicorn
author: rmjordas
date: '2012-12-12'
image: ./unicorn-banner.jpg
---

## Do androids dream of electric sheep?

Text goes here
```

### Syntax highlighting

To use syntax aware highlighting to your code blocks, insert the language name
after the opening code block syntax (<code>```</code>):

<pre lang="markdown"><code>```graphql
  query SiteMetadataQuery {
    site {
      siteMetadata {
        title
        description
        url
        twitter
      }
    }
  }
```
</code></pre>

You can view the [list of supported languages][prism_langs] in Prism's website.

[prism_langs]: https://prismjs.com/#languages-list

### Add an author

You must be listed as an author before you can post. In the
[`content`](/content/) directory, there is a file called
[`author.yaml`](/content/author.yaml). Here you add an entry with these options:

- **`id`** (Required) - A unique string value for this author entry. These are
  the rules for this value:
  - May only contain alphanumeric characters or hyphens
  - Cannot have multiple consecutive hyphens
  - Cannot begin or end with a hyphen
  - Maximum is 39 characters
- **`name`** (Required) - The author's display name
- **`bio`** - Short description of the author
- **`github`** - The author's GitHub username
- **`twitter`** - The author's Twitter username
- **`avatar`** - The path for the image the the author would like to use as
  their avatar image. Please make sure to add the image file in the
  [`content/assets`](/content/assets) directory with the same file name
  as the `id` above. For example if the author id is `rmjordas`, then the value
  should be `assets/rmjordas.png`. If you don't provide a value for this option,
  a default avatar image will be used.

### Add a page

You are not limited to just adding blog posts. If you like to have a landing
page of sorts for your project or something, you can! So we can have these:
`/help`, `/grocerhub`, `/slack-invite`, etc. A page can be very simple and can
be crammed into one file, e.g. `404.tsx`, `index.tsx` (this file creates Pub's
landing page!), `tags.tsx`, etc..

For now, the process of adding pages is not as streamlined as there are a lot of
considerations like: How can a user reach that page, or are we going to change
the layout of pages to add a component that links to that page, i.e. navigation
components, etc. It can potentially change the design of the website. Also,
adding pages require that you know React and JavaScript (or TypeScript).

But if you want to add a simple page, just add a React component in the
[pages](/src/pages) directory. If you want a `/help` page, you should name this
file `help.tsx`. If you want a page on `/grocerhub/devs`, first create a new
directory in `/src/pages` called "grocerhub" and inside that directory add
`devs.tsx`.

_TODO_

Complicated pages requires a few task that you'd have to do:

- Create a "PageTemplate"
- Update Gatsby's Node API configuration file to tell it to create these pages

_TODO_

## Development

### Requirements

Ensure you have the following installed in your system:

- Node.js
- npm
- git

When you install Git on Windows, you are also provided with Git Bash. It is
recommended to use this software when interacting with Git. This guide will
assume that you are using Git Bash if you are using Windows. On Linux and Mac,
the default terminal will do.

To verify your installations, enter the following in your terminal:

```console
$  node -v;npm -v;git --version
v8.12.0
6.4.1
git version 2.19.1.windows.1
```

You should see something similar to the output above.

### Clone to your machine

Open you terminal and clone the repository by typing:

```bash
git clone git@github.com:projectunic0rn/pub.git
cd pub
pwd # $PROJECT_ROOT
```

The first command will _clone_ the project to your machine. This means that you
tell Git to make a directory in the directory where you executed the `clone`
command and copy the repository there. If you have a dedicated directory for
cloned repository, make sure you are running your commands inside that
directory.

The next command will allow you to move inside the directory that Git created,
when it cloned the repo to your machine: `pub` (same as the repository's name).

> **NOTE**: You can provide the name of the directory by adding it to the last
> part of the `clone` command:
>
> ```bash
> git clone git@github.com:projectunic0rn/pub.git more-awesome-pub
> ```

The last command will output the path to the current working directory. In this
guide, we refer to the root of the Pub repository as `$PROJECT_ROOT`.

### Running `npm` scripts

Before you can inspect the app in your browser, you have to first download some
packages that this project requires. You can see a list of dependencies inside
the file called [`package.json`](/package.json).

The `npm` executable provides a command to download all the project's
dependencies:

```bash
pwd # You must be in the $PROJECT_ROOT
npm install
```

This will grab all the packages and put it inside a `node_modules` directory in
the `$PROJECT_ROOT`.

After that, you can now run the app by executing this command in you terminal

```bash
pwd # $PROJECT_ROOT
npm run dev
```

Finally, open your browser to http://localhost:8000.

### Other commands

The project also specifies other `npm` scripts you can run when working with
specific portions of the application:

| Script             | Description                                                     |
| ------------------ | --------------------------------------------------------------- |
| `build`            | Creates static build for deployment                             |
| `clean`            | Deletes the `.cache` and `public` directories                   |
| `dev`              | Starts a development server                                     |
| `format`           | Formats the JSON and markdown files according to Prettier rules |
| `format:precommit` | Formats the staged files according to Prettier rules            |
| `lint`             | Checks for lint errors                                          |
| `lint:fix`         | Checks for lint errors and automatically fix them               |
| `start`            | Serves the production build for testing                         |
| `test`             | Run tests                                                       |
| `typecheck`        | Runs TypeScript compiler to check source for type errors        |

### Quick start

These steps will guide you through contributing to this project:

- Fork the repo
- Clone your fork and install dependencies

```bash
git clone https://github.com/<your-github-username>/pub.git
npm install
```

Make and commit your changes. Make sure the commands `npm run build` and
`npm run test` are working.

Send a pull request and include a short summary of your changes.

> [About Pull Requests](https://help.github.com/articles/about-pull-requests/)

### Environment Variables

Environment variables can be added in [`.env-cmdrc`](/.env-cmdrc). You can add
key-value pairs to the exisiting groups or you may create a new group. For
example, you want to add environment variables when you are testing, you might
add a `testing` group of environment variables:

```json
{
  "development": { ... },
  "production": { ... },
  "testing": {
    "CI": true
  }
}
```

Then update your commands to call `env-cmd` and the group name:

```bash
env-cmd testing npm run test
```

> **WARNING**: You should **not** put sensitive values in `.env-cmdrc`. These
> values are bundled together with the application and anyone can inspect them.

> **NOTE**: You might also need to restart the development server when you
> change the `.env-cmdrc`.

#### Gatsby Telemetry

Gatsby added [telemetry][] when they release version 2.3.0. You can disable this
by running:

```bash
gatsby telemetry --disable
```

Alternatively, you may set `GATSBY_TELEMETRY_DISABLED` to `1` when you are
running gatsby commands.

[telemetry]: https://www.gatsbyjs.org/docs/telemetry/

### More instructions

_TODO_

### Troubleshooting

#### Commiting changes to Git fails and deletes my changes from my file system

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

### Maintenance

#### Dependencies

Packages are pinned to a specific version, thus you might need to run an update
every now and then. Run `npm oudated` to check which packages are not in their
latest versions. You may choose to update all packages or just some: maybe those
that release `MAJOR` or `MINOR` but not `PATCH` versions.

If you do update, make sure to do checks to see if it broke something in the
app. Run all the test suites to see if something fails, then generate a
production build using `npm run build` and see if there are any build errors.
Gatsby artifacts in `.cache` and `public` by running `npm run clean` and run the
checks again if you're still having trouble.

> **NOTE**: Don't forget to also commit changes in `package-lock.json`!

When you updgrade the Node.js version, be sure to check if the Travis
configuration matches the `MAJOR` version, i.e. `7`, `10`, `11`. You don't need
to specify the `MINOR` and `PATCH` versions.

```yaml
# Update the value in this part of `travis.yml`
node_js:
  - '10'
```
