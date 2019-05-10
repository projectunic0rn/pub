---
title: 'Contributing Part II: Publishing blog posts'
author: rmjordas
date: '2019-05-11'
image: ./hero.jpg
tags:
  - Project Unicorn
  - contributing
---

After setting up your development environment and learning some Git commands,
you're more than ready to create your first blog post.

In this article, I will guide you on how to publish a blog post on the Project
Unicorn web site. We won't use any fancy interface because _the interface is
still being worked on_. So for now, you'll be working on your text editor of
choice and it'll be fun, I hope!

So, let's get started!

> This is part 2 of the Project Unicorn Contributing Guide series that talks
> about creating blog posts for the Project Unicorn web site.
>
> Up next: [**Contributing Part 3: Project Unicorn Web Site**](/blog/contributing-part-iii-project-unicorn-web-site).

## Clone to your machine

Let's practice some of the Git stuff you learn on the first part. Open your
terminal and clone the repository by typing:

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

## Setup blog post directory

Add a directory to [`content`][pub_content_dir] that follows this name template:

[pub_content_dir]: https://github.com/projectunic0rn/pub/tree/master/content

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
example file ([`index.md.example`][index_md_example]) as a base for
your blog post.

[index_md_example]: https://github.com/projectunic0rn/pub/blob/master/content/index.md.example

### Add an author

You must be listed as an author before you can post. In the
[`content`][pub_content_dir] directory, there is a file called
[`author.yaml`][author_yaml]. Here you add an entry with these options:

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
  [`content/assets`][pub_content_assets_dir] directory with the same file name
  as the `id` above. For example if the author id is `rmjordas`, then the value
  should be `assets/rmjordas.png`. If you don't provide a value for this option,
  a default avatar image will be used.

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
title: The End of the World
author: rmjordas
date: '2012-12-12'
image: ./hero.jpg
tags:
  - cute
  - scary
---
```

This section is called the _frontmatter_ and it contains the most essential
information needed when creating the static page for a single blog post.

- **`title`** - Title of your blog post, this will be the text shown inside the
  hero image and it is included in the `<title>` of the HTML document for this
  blog post.
- **`author`** - A unique ID for the author of the blog post. Please refer to
  [Add an author](#Add-an-author) section for instructions on how to create an
  author entry.
- **`date`** - The date when the blog post was published. This follows a special
  format: `YYYY-MM-DDTHH:mm:sss+/-TT:TT` where hours (`HH`), minutes (`mm`),
  seconds (`sss`), and timezone offset (`+/-TT:TT`) are optional.
- **`image`** - Hero image for the blog post that contains the title of the blog
  post positioned at the top of the page below the navigation.
- **`tags`** - A list of words and/or phrases that can summarize the main topics
  of the blog post.

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
title: The End of the World
author: rmjordas
date: '2012-12-12'
image: ./hero.jpg
---

## The Year 2k12

Text goes here
```

### Syntax highlighting

To use syntax aware highlighting to your code blocks, insert the language name
after the opening code block syntax (` ``` `):

````

```graphql
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

````

You can view the [list of supported languages][prism_langs] in Prism's website.

[prism_langs]: https://prismjs.com/#languages-list
[author_yaml]: https://github.com/projectunic0rn/pub/blob/master/content/author.yaml
[pub_content_assets_dir]: https://github.com/projectunic0rn/pub/tree/master/content/assets
