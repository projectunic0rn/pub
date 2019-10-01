---
title: 'Contributing Part II: Publishing Blog Posts'
author: rmjordas
date: '2019-06-02'
image: ./hero.jpg
tags:
  - Project Unicorn
  - contributing
  - blog
  - Markdown
---

After setting up your development environment and learning some Git commands,
you're more than ready to create your first blog post.

In this article, I will guide you on how to publish a blog post on the Project
Unicorn web site. We won't use any fancy interface yet because it's still being
worked on. So for now, you'll be working on your code editor of choice.

> This is part 2 of the Project Unicorn Contributing Guide series that talks
> about creating blog posts for the Project Unicorn blog.
>
> Up next: [**Contributing Part 3: Project Unicorn Web Site**](/blog/contributing-part-iii-project-unicorn-web-site).

## What to write about?

If you don't have a topic to write about you can always refer to `pub`'s issue
tracker and look for issues that are tagged with `blog request`. These issues
are usually asking for articles to help members that are working on projects in
Project Unicorn.

> [`pub` issue tracker](https://github.com/projectunic0rn/pub/issues?q=is%3Aissue+is%3Aopen+label%3A%22blog+request%22)

You can also write about updates regarding the project you are currently working
on. Write about what you've accomplished this week, or some of the challenges
you had and how you solved them.

Maybe share something new that you've just learned and how that affected your
development process. Write guides on how to build something---a CLI tool, a web
app, etc.

If the above topics might take a lot of time of your time to think and write
about, and you only want to continue with the tutorial series, just introduce
yourself, I guess.

> **NOTE**: You own copyright for the articles you create. If you're to
> published it in the Project Unicorn blog, you must license it under the
> [Creative Commons Attribution-ShareAlike 4.0 International license][ccbysa4].

[ccbysa4]: https://creativecommons.org/licenses/by-sa/4.0/legalcode

## Clone to your machine

Let's practice some of the Git stuff you learned in the previous article. Open
your terminal and clone the Project Unicorn web site repository using the
`git clone` command. Then use the `cd` command to go inside the `pub` directory
on your machine.

If you've skipped the first part of this series, you are required to register a
new author and commit that change to a topic branch. Refer to the previous
article for the step-by-step guide:

> [Make A Commit][make_a_commit]

## Add more author information

You can choose to provide your author entry with more information. Only the `id`
and the `name` are required.

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
- **`avatar`** - The path for the image the author would like to use as their
  avatar image. Please make sure to add the image file in the
  [`content/assets`][pub_content_assets_dir] directory with the same file name
  as the `id` above. For example, if the author id is `rmjordas`, then the value
  should be `assets/rmjordas.png`. If you don't provide a value for this option,
  a default avatar image will be used.

[pub_content_assets_dir]: https://github.com/projectunic0rn/pub/tree/master/content/assets

> **NOTE**: Remember, these options are for author entries in
> [`author.yaml`](https://github.com/projectunic0rn/pub/blob/master/content/author.yaml).

## Tasklist

For this guide, your tasks are to:

- Setup the directory to contain your blog post
- Learn about commonly used Markdown syntax
- Commit and push your blog post to the remote `pub` repository

## Add a blog post directory

We need a place to save the blog post entry along with the assets that it uses.
Add a directory to [`content`][pub_content_dir] that follows this name template:

[pub_content_dir]: https://github.com/projectunic0rn/pub/tree/master/content

```
YYYY-MM-DD-the-title-of-the-blog-post
```

The name consist of the year (`YYYY`), the month (`MM`), the day (`DD`) and the
title of the blog post where every character is lowercased and spaces and other
characters are changed into dashes. For example:

```
2012-12-21-the-end-of-the-world
```

This means the blog post is published on December 21, 2012 and its title is
"The End of the World".

> **IMPORTANT**: Please ensure that every word is separated only by a single
> dash (`-`)

Inside this directory, create a new file called `index.md`. You can copy the
example file ([`index.md.example`][index_md_example]) to the directory you
created and use it as a base for your blog post. Remember to rename it to
`index.md`.

[index_md_example]: https://github.com/projectunic0rn/pub/blob/master/content/index.md.example

```bash
pwd # Make sure you're in $PROJECT_ROOT
cp content/index.md.example content/blog/2012-12-21-your-directory/index.md
```

> **TIP**: We use `cp` to copy files and directories.
>
> [The `cp` Command](http://www.linfo.org/cp.html)

### Update blog post front matter

Inside `index.md` you will find a section at the top that starts and ends with
three dashes:

```markdown
---
title: The End of the World
author: rmjordas
date: '2012-12-21'
image: ./hero.jpg
tags:
  - cute
  - scary
---
```

This section is called the _front matter_ and it contains the most essential
information needed when creating the static page for a single blog post.

- **`title`** - Title of your blog post, this will be the text shown inside the
  blog post banner image and it is included in the `<title>` of the HTML
  document for this blog post.
- **`author`** - A unique ID for the author of the blog post. If you've been
  following along, you should have already done this. If not, please refer to
  "[Make A Commit][make_a_commit]" section on the blog post Contributing Part I:
  Getting Started for instructions on how to create an author entry.
- **`date`** - The date when the blog post was published. This follows a special
  format: `YYYY-MM-DDTHH:mm:sss+/-TT:TT` where hours (`HH`), minutes (`mm`),
  seconds (`sss`), and time zone offset (`+/-TT:TT`) are optional.
- **`image`** - Hero image for the blog post that contains the title of the blog
  post positioned at the top of the page below the navigation. Similar to the
  other images, you put this file inside the same directory as the `index.md`.
  If you have not provided a value for this field, a default image will be used
  instead.
- **`tags`** - A list of words and/or phrases of the main topics your blog post.

[make_a_commit]: /blog/contributing-part-i-getting-started/#Make-a-commit

## Writing with Markdown

Markdown is the markup language that we'll use to create blog posts. Markdown
allows us to write the formatted blog posts with just plain text.

> [Markdown: Syntax](https://daringfireball.net/projects/markdown/syntax)

> [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)

The following shows example usage for the most commonly used Markdown syntax.

### Headers

We use headers to structure the hierarchy of information.

> **NOTE**: Please **do not** put level 1 headers because it's already provided
> inside the blog post banner via the `title` field in the front matter.

```md
# Level 1 Header

## Level 2 Header

### Level 3 Header

### Level 4 Header
```

### Emphasis

You can make words or phrases stand out by emphasizing them.

```md
Some **strong** text

This is _emphasized_

_A **combination** of the two_
```

#### Result

Some **strong** text

This is _emphasized_

_A **combination** of the two_

### List

List can either be ordered or unordered. For ordered lists, the number you
provide to list items does not need to be accurate to the order of that current
item.

```md
**Unordered list 1**

- Item 1
- Item 2
  - Item 3
  - Item 4

**Ordered list with ordered and unordered sub-lists**

1. Item 1
1. Item 2
   - Item 2a
   - Item 2b
1. Item 3
   1. Item 3a
   1. Item 3b
```

#### Result

**Unordered list 1**

- Item 1
- Item 2
  - Item 3
  - Item 4

**Ordered list with ordered and unordered sub-lists**

1. Item 1
1. Item 2
   - Item 2a
   - Item 2b
1. Item 3
   1. Item 3a
   1. Item 3b

### Images

To include images to your blog post, simply place them in the directory you
created and refer to them using Markdown syntax. The alternative text will be
displayed if the image failed to render. You can provide the URL of the image or
a relative path to it.

```markdown
![This is the alternative text](./my-image.jpg)
```

> **NOTE**: Some image formats may not be recognized by the image transformer
> plugin, so it is best to stick to the common formats like `jpg` (or `jpeg`),
> `png`, `gif`, `svg`, etc.

```markdown
![Project Unicorn Logo](https://avatars3.githubusercontent.com/u/41756078)
```

#### Result

![Project Unicorn Logo](https://avatars3.githubusercontent.com/u/41756078)

### Links

Links allow us to navigate to pages that are internal or external to the
Project Unicorn web site. There are a few ways to write links in your blog
posts.

#### Raw URL

You can write the URL directly and it will be automatically transformed into an
anchor element.

```md
https://github.com/projectunic0rn/pub
```

##### Result

https://github.com/projectunic0rn/pub

#### With Link text and title

You can also provide the text to display and an optional title.

```md
[Text to show](https://github.com/projectunic0rn/pub 'An optional title')
```

##### Result

[Text to show](https://github.com/projectunic0rn/pub 'An optional title')

#### Relative paths

To link to other parts of the Project Unicorn web site use relative paths.

```md
[Publishing Blog Posts: Links section](/blog/contributing-part-ii-publishing-blog-posts/#Links)
```

##### Result

[Publishing Blog Posts: Links section](/blog/contributing-part-ii-publishing-blog-posts/#Links)

#### Reference

Lastly, you can avoid breaking the flow of reading in your Markdown files by
using a label instead of the full URL. This example provides the label called
"references" which has the URL to the Project Unicorn web site repository and
an optional title.

```md
Avoid breaking the flow by using a [reference][] instead of the full URL.

[reference]: https://github.com/projectunic0rn/pub 'An optional title'
```

##### Result

Avoid breaking the flow by using a [reference][] instead of the full URL.

[reference]: https://github.com/projectunic0rn/pub 'An optional title'

#### Reference with custom label

If you want a to use another label, let's say, a shorter one, provide it inside
the square brackets:

```md
Avoid breaking the flow by using [a reference][ref] instead of the full URL.

[ref]: https://github.com/projectunic0rn/pub 'An optional title'
```

##### Result

Avoid breaking the flow by using [a reference][ref] instead of the full URL.

[ref]: https://github.com/projectunic0rn/pub 'An optional title'

### Blockquotes

Use blockquote to include longer text that is quoted from some reference. You
can also use it to insert tips, warning or other notices that may be useful for
the readers.

```md
**Single line**

> **TIP**: It do be like that sometimes.

**Multi-line**

> Borrow box contents<br>
> ownership is not taken<br>
> can borrow again.
>
> Rust haiku by anonymous
```

#### Result

**Single line**

> **TIP**: It do be like that sometimes.

**Multi-line**

> Borrow box contents<br>
> ownership is not taken<br>
> can borrow again.
>
> Rust haiku by anonymous

### Inline code

We use a backtick character (```) to enclose the word or phrase we'd like to
format as inline code.

```md
Use the `npm install` command to install the project dependencies.
```

#### Result

Use the `npm install` command to install the project dependencies.

### Syntax highlighting

If, for example, you're writing a code-along tutorial, you may need to provide
code snippets to aid your discussions. We put these code snippets inside a
_code block_.

We use three backticks characters (` ``` `) for the opening and closing of a
code block. If you provide the language name after the opening backticks, the
result should have syntax-aware styling.

````

```typescript
class Greeter {
  greeting: string;
  constructor(message: string) {
      this.greeting = message;
  }
  greet() {
      return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");

let button = document.createElement('button');
button.textContent = "Say Hello";
button.onclick = function() {
    alert(greeter.greet());
}

document.body.appendChild(button);
```

````

#### Result

```typescript
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return 'Hello, ' + this.greeting;
  }
}

let greeter = new Greeter('world');

let button = document.createElement('button');
button.textContent = 'Say Hello';
button.onclick = function() {
  alert(greeter.greet());
};

document.body.appendChild(button);
```

You can view the [list of supported languages][prism_langs] in Prism's website.

[prism_langs]: https://prismjs.com/#languages-list

### Tables

Formatting data as tables is also possible.

```md
| id  | username | display_name     |
| --- | -------- | ---------------- |
| 1   | vader    | Darth Vader      |
| 2   | prevader | Anakin Skywalker |
```

#### Result

| id  | username | display_name     |
| --- | -------- | ---------------- |
| 1   | vader    | Darth Vader      |
| 2   | prevader | Anakin Skywalker |

### Strikethrough

Add a strikethrough to void a word or phrase by enclosing it between double
_tilde_ characters (`~~`).

```md
Project ~~TBD~~ Unicorn
```

#### Result

Project ~~TBD~~ Unicorn

## Commit and Push

When you're done with your article, add and commit your changes to the topic
branch using the `git add` and `git commit` commands, respectively. Use
`git push` to upload it to the remote repository.

> **NOTE**: We use the [Prettier formatter][prettier] to make sure that every
> file is consistent with regards to the Markdown syntaxes used. When you commit
> your changes, a pre-commit hook **may** alter your markdown file to use the
> preferred syntax.

[prettier]: https://prettier.io/

Keep adding changes your pull request by committing to your topic branch and
pushing them to the remote repository. When you're done with your article, ask a
`pub` maintainer to review your pull request.

## What's next?

In the next part, [**Contributing Part III: Project Unicorn Web Site**][c3],
we'll discuss how you can view your blog post draft on the browser as if it's
already published and see live-updates as you edit.

[c3]: /blog/contributing-part-iii-project-unicorn-web-site/

We'll also talk about the internals of the Project Unicorn web site, especially,
how to configure the [Gatsby][] framework.

[gatsby]: https://gatsbyjs.org
