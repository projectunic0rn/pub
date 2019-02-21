# Contributing Guide

Welcome unicorn!

Thank you for you interest in this project. To get started publishing blog
posts, fixing issues or add features, please read first the the instructions
below.

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

### Update blog post frontmatter

Inside `index.md.example` you will find a section at the top that starts and
ends with three dashes:

```md
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

- **`title`** - Title of you blog post, this will be the text shown inside the
  hero image and it is included in the `<title>` of the HTML document for this
  blog post.
- **`author`** - A unique id for the author of the blog post. There is an
  additional setup that needs to be done in order for the author details to be
  properly queried (refer to [Creating an new author](#creating-a-new-author))
  section for instructions).
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

```md
## How to add images to your blog post

This is the syntax:

![This is the alternative text](./my-image.jpg)

Some text here.
```

> **NOTE**: Some image formats may not be recognized by the image transformer
> plugin, so it is best to stick to the common formats like: `jpg` (or `jpeg`),
> `png`, `gif`, `svg`, etc.

You can also add a hero image to your blog post. Similar to the other images,
you put this file inside the same directory but you add a reference to it on the
frontmatter of your `index.md` file. If you have not provided a value for this
field, a default image will be used instead.

```md
---
title: The Unicorn
author: rmjordas
date: '2012-12-12T21:12:12.12Z'
image: ./unicorn-banner.jpg
---

## Do androids dream of electric sheep?

Text goes here
```

### Add an author

You must be listed as an author before you post blog posts. In the
[`content`](content/) directory, there is a file called
[`author.yaml`](content/author.yaml). Here you add an entry with these options:

- **`id`** (Required) - A unique string value for this author entry. These are
  the rules this value:
  - May only contain alphanumeric characters or hyphens.
  - Cannot have multiple consecutive hyphens.
  - Cannot begin or end with a hyphen.
  - Maximum is 39 characters.
- **`name`** (Required) - The author's display name for blog posts.
- **`bio`** - Short description of the author
- **`github`** - The author's GitHub username
- **`twitter`** - The author's Twitter username
- **`avatar`** - The path for the image the the author would like to use as
  their avatar image. Please make sure to add the image file in the
  [`content/assets`][content/assets] directory with the same file name
  as the`id` above. For example if the author id is `rmjordas`, then the value
  should be `assets/rmjordas.png`. If you don't provide a value for this option,
  a default avatar image will be used.

### Add a page

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

## Instructions

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
the file called [`package.json`](package.json).

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
npm start
```

Finally, open your browser to http://localhost:8000.

### Other commands

The project also specifies other `npm` scripts you can run when working with
specific portions of the application:

| Script    | Description                                                    |
| --------- | -------------------------------------------------------------- |
| `develop` | Starts a development server that reloads when changes are made |
| `build`   | Main command for creating static build for deployment          |
| `format`  | Formats the source code according to Prettier rules            |
| `test`    | Runs tests                                                     |

### Contributing quick start

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
