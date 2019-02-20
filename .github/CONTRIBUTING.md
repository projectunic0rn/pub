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
"The End of the World". **Please ensure that every word is separated by a
single dash**.

Inside this directory, create a new file called `index.md`. You can use the
example file ([`index.md.example`](/content/index.md.example)) as a base for
your blog post.

### Update blog post frontmatter

Isnide `index.md.example` you will find a section at the top that starts and
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

list available frontmatter keys...

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

_TODO_

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

_TODO_
