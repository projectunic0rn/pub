---
title: 'Contributing Part I: Getting Started'
author: rmjordas
date: '2019-05-29'
image: ./hero.jpg
tags:
  - Project Unicorn
  - contributing
  - Git
  - GitHub
---

In this article, we're going to introduce Git and GitHub, and learn some basic
commands that are useful when contributing to the Project Unicorn web site
repository. If you're new to Git and GitHub, please read on. This will help you
when you join and contribute to other Project Unicorn projects. Feel free to
skip to the next part if you're already familiar with Git.

At the end of this guide, we'll have a local copy of the Project Unicorn web
site repo which is updated to include a new author entry.

> This is part 1 of the **Project Unicorn Contributing Guide series** that talks
> about Git and GitHub and some of the common commands for interacting with a
> repo such as the Project Unicorn web site repo.
>
> The next part, [**Contributing Part II: Publishing Blog
> Posts**](/blog/contributing-part-ii-publishing-blog-posts), will talk about
> how to write and save a new blog post.

## Requirements

Before we start you need to ensure that you have the following installed on your
machine:

- [Node.js](https://nodejs.org/en/)
- `npm`
- [Git](https://git-scm.com/)

Installing Node.js will also install `npm`. When you install Git on Windows, you
are also provided with _Git Bash_. It is recommended to use this software when
interacting with Git.

This guide will assume that you are using Git Bash if you are using Windows. If
you have Linux or macOS, the default terminal will do.

To verify your installations, enter the following in your terminal:

```bash
node -v;npm -v;git --version
```

The output should look similar to the output below. It's alright if the versions
don't match exactly but make sure the number before the first dot for each
version is the same.

```bash
v10.15.3
6.9.0
git version 2.21.0.windows.1
```

## Introducing Git and GitHub

Git, according to its website, is "a free and open source distributed version
control system". In simpler terms, we can use this software to allow us to have
a history of the changes made our code. There are more benefits of using Git and
they are well documented all over the web. Here's one article but feel free to
search around:

> [Why Git](https://www.atlassian.com/git/tutorials/why-git)

[GitHub][], on the other hand, is a service that offers hosting for anyone's
code that is monitored by Git. When Git is introduced to the code, we call it a
_repository_ (also called a "repo").

In addition to hosting code, it also has a bunch of collaboration tools for
developers such as an issue tracker, project task board and more. We use GitHub
to access a friendlier interface for when we are inspecting a Git repo.

[github]: https://github.com

Since we have the Project Unicorn web site repo hosted on GitHub you have to
make sure you have an account on GitHub. Please refer to the following
documentation:

> [Signing up for a new GitHub account][signup]

[signup]: https://help.github.com/articles/signing-up-for-a-new-github-account/

## Git and the command line

If you are avoiding the command line, you can choose to use _only_ the GitHub
website to interact with your repos. It's possible to update your code with just
the browser and GitHub's editor but it will be very difficult to produce concise
entries to your history.

A better tool to use is a GUI client that offers more features for organizing
your changes. The Git website provides a
[list of third-party GUI clients][git_gui].

[git_gui]: https://git-scm.com/downloads/guis

An even better tool is the command line. It can be scary to use especially if
you have little experience with it, but it's what I recommend you to start with
when learning Git. The command line is also what we're gonna use for this guide.

So why not use a GUI client? There's nothing wrong with GUI clients, they are
useful, too. But they may not support specific Git functions or it might be
awkward to perform certain tasks.

In addition to those issues, when you use one GUI client, you have to
familiarize yourself with that client's layout and what it can and can't do.
If you move on to another client, you'd have to learn again, and this time
probably it has more features than your previous client. Of course, certain
buttons and layouts may be similar across clients, but most of the time, they
won't be.

If you learn Git through the command line, you'll be able to just open a
terminal application, and fire up the command. No need to open another GUI
client's manual or documentation website to find out what it can and can't do.

Hopefully, I've convinced you that using the command line to interact with Git
is _bueno_.

## Authenticate your Git

To be able to interact with a remote repository, such as the Project Unicorn web
site's repository on GitHub, you have to setup authentication. Follow these
guides from GitHub:

> [Set up git](https://help.github.com/articles/set-up-git/)
>
> [Why is Git always asking for my password?](https://help.github.com/articles/why-is-git-always-asking-for-my-password/)

## Tasklist

For this guide, your tasks are to:

- Copy the code for the Project Unicorn web site repository
- Update the list of author to include your information
- Upload your changes to the repository hosted on GitHub

## Cloning a repository

The first task is to get the Project Unicorn web site repository to your
machine. We call this process _cloning_ a repo. Type these command in your
terminal:

```bash
git clone git@github.com:projectunic0rn/pub.git
cd pub
pwd # Outputs the path to our $PROJECT_ROOT
```

The first command will _clone_ the repo to your machine. Git makes a directory
inside the directory where you executed the `git clone` command and copies the
repository there. The name of the directory will be the same as the remote
repository's name by default.

> **TIP**: You can provide the name of the directory you want the copy to be in
> by adding it to the last part of the `clone` command. For example:
>
> ```bash
> git clone git@github.com:projectunic0rn/pub.git more-awesome-pub
> ```
>
> Copies the repo to a newly created directory called `more-awesome-pub`.

The next commands aren't exactly related to Git itself. The `cd pub` command
will allow you to move inside the directory that Git created when it cloned the
repo to your machine, i.e. `pub` which is the same as the remote repository's
name.

> [The `cd` command](http://www.linfo.org/cd.html)

The last command (`pwd`) will output the path to the current working directory.
In this guide, we refer to the root of the Pub repository as `$PROJECT_ROOT`.

> [The `pwd` command](http://www.linfo.org/pwd.html)

When this is done, you now have a copy of the Project Unicorn web site source
code. This copy should include a directory called `.git` which is used by Git to
keep track of the repo's change history and other information.

You should know that whatever changes you introduce in this copy on your machine
will not auto-save to the repo hosted on GitHub. We'll learn more on how to
update the remote repo using your cloned repo later.

In most Git tutorials, the command you're commonly taught first is `git init`.
You use this command if you want Git to track a project you did earlier or if
you are starting fresh and you want to introduce Git from the start:

```bash
git init
```

It doesn't matter if the directory has files already or if it's empty, the
outcome is the same: it turns that directory into a repository. And don't worry
if you accidentally `init`ed an existing repo because it won't overwrite anything.

## Checking the status

When you want to know what changes Git can see right now, you'd use the
`git status` command:

```bash
$ git status
```

If you entered this while inside the Project Unicorn web site repository, you'd
probably see this output:

```
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
```

This tells us that it does not see any changes. Try adding a dummy file called
`foo.txt` and run git status again:

```bash
touch foo.txt
git status
```

The output would be:

```
On branch master
Your branch is up to date with 'origin/master'.

Untracked files:
(use "git add <file>..." to include in what will be committed)

        foo.txt

nothing added to commit but untracked files present (use "git add" to track)
```

> **TIP**: The `touch` command creates new but empty file(s) with the name(s)
> you provide it with, e.g. `foo.txt`. It can also be used to update an
> existing directory or file's last modified property.
>
> [The `touch` command](http://www.linfo.org/touch.html)

Git knows you introduced a new file but the file is _untracked_. It also
provides instructions on what you can do with this new file. Don't worry for now
on what some of these terms mean, we'll learn more about them later.

Remove this file and the output of `git status` will be the same as before:

```bash
$  rm ./foo.txt
$  git status
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
```

> **TIP**: We can remove a file or directory using the `rm` command.
>
> [The `rm` Command](http://www.linfo.org/rm.html)

## Branches in Git

Look at the last output of `git status`:

```
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
```

It tells us that we are on a _branch_ called `master`. When we use Git for our
projects, we would normally interact with at least one of these branches. The
output also tells us that our branch is up to date with something called
`origin/master`. This `origin` is what we call the remote repo hosted on GitHub.

When you create a new repo, Git will create a branch for you called `master`.
When you run `git status` after cloning the `pub` repo, it tells you that you
are "On branch master". The `master` branch is not a special branch. It's just
the name that Git authors decided to use when creating a new repository.
Same with `origin` as the default name for the remote repository when you clone
repo.

Adding changes to Git, in some ways, is like _saving_ it to a branch. For every
_save_ you do, Git tracks the changes, who made those changes, when they were
made, along with some other information.

You're probably thinking: _wow, so it's just like saving in a text editor like
Notepad, then?_ Not exactly. When you are working in Notepad, it doesn't care
what lines of code you removed or what parts you added but only that you
changed the file. Whereas Git knows what specific line of code you changed, how
it differs from the previous save, some metadata about changes, etc. and
this is available for every save you do.

If you'd ever use [Google Docs][gdocs], you'd find that it has a feature called
"Version History" to view the changes you made to a document. This is very
similar to viewing a single branch in Git. Open one of your Google Docs files
and you can inspect the specific additions and deletions performed for every
version (assuming it has any). You can even _check out_ an old version and
_branch off_ that version by making a copy of the document.

[gdocs]: https://docs.google.com

> [See what's changed in a file](https://support.google.com/docs/answer/190843)

### Default branch

When you clone a repository, you're always in that repository's default branch.
For the Project Unicorn web site repo, it's called `master`. On other repos, you
might find the default branch to be called `dev` or something else. To determine
the default branch you can refer to the GitHub web site for that repository.

> [Viewing branches in your repository](https://help.github.com/en/articles/viewing-branches-in-your-repository)

Since we're focusing on learning Git through the command line, I'll provide
you with some of the commands you can use to know what branch you're currently
using. You already know the first command, i.e. `git status`. Run this
immediately after cloning the repo.

Another command you can use is `git branch`:

```bash
$  git branch
* master
```

The one with the asterisk before it is the branch currently checked out.

### Updating the default branch

If you've just cloned the repository and have been following along until now,
this next part might seem unnecessary. But assume you cloned the repo and then
took a long break just before this section and while you're taking a break,
someone introduced changes to `pub`'s default branch. How do we get those
updates in our local repo?

To get the newly published changes in the remote repository's default branch,
you can do a `pull`, which will download and merge the changes to your local
repository's `dev` branch:

```bash
git pull
```

If your command is successful, you'd be presented with something similar to this
output:

```bash
Updating bc1c558..4c7224b
Fast-forward
 package-lock.json | 161 ++++++++++++++++++++++++++++++------------------------
 package.json      |  12 ++--
 2 files changed, 96 insertions(+), 77 deletions(-)
```

You can see that it provided a summary of the changes that were added to your
local repo. In this example. two files called `package.json` and
`package-lock.json` were modified while you were taking a break. You'd most
likely see a different list of files. And it's also possible that there aren't
any changes introduced, to which you'll see:

```bash
$  git pull
Already up to date.
```

If you see any errors when you ran this command, you probably modified the same
lines of the same file that is also modified on the remote repo. The following
shows what you'd see if you changed something in `package.json` that conflicts
with the remote repo's `package.json`:

```bash
error: Your local changes to the following files would be overwritten by merge:
        package.json
Please commit your changes or stash them before you merge.
Aborting
Updating bc1c558..4c7224b
```

The output tells us that Git aborted the operation and nothing was updated. It
also provided us with a tip on how we can fix this error. We haven't discussed
"committing" and "stashing" yet because those commands have their sections
later in the guide.

### Create your topic branch

Every team in Project Unicorn has different requirements. Your team lead is
responsible for making sure the whole team will agree on whatever is needed for
your project to fulfill these requirements, including the task of deciding the
workflow for contributing to your respective repos.

This section will provide a brief discussion of one type of workflow that is
similar to the _GitHub flow_ and some of the common Git commands associated with
it.

> [Understanding the GitHub flow](https://guides.github.com/introduction/flow/)

Let's say you're part of the Project Unicorn web site team, and I'm the lead. I
assigned you the task of creating a blog post. From what we know already, all we
need to do is write the blog post and save it to the `master` branch somehow.
There's nothing wrong with this approach, especially if you're working on your
own. But you're working with other developers so we'll have to find a way to
make it so that the contributions won't be confusing.

You start by _branching off_ the up-to-date default branch. Since the purpose of
the changes you'll save to this branch is to create a new blog post, we can call
this branch a _topic branch_.

> **TIP**: According to the Git web site, a _topic branch_ is "a short-lived
> branch that you create and use for a single particular feature or related
> work."
>
> [Git Branching Workflows](https://git-scm.com/book/en/v1/Git-Branching-Branching-Workflows#Topic-Branches)

Make a new topic branch off the latest `master` branch by entering these
commands in your terminal:

```bash
git checkout master
git pull
git checkout -b add-blog-post-project-foo-intro
```

The first command switches to `pub`'s default branch which is called `master`.
You only do this if, for some reason, you are in another branch.

Next, is to update the default branch, which was discussed in the previous
section. Getting the latest changes to the default branch is important because
it can help minimize conflicts when requesting a merge of your topic branch to
the `master` branch later. It's especially true if your team is consistently
merging new features and fixes to the default branch.

Finally, the last command creates a new branch called
`add-blog-post-project-foo-intro` on your local Git repository, and immediately
switches to that branch. This command is a combination of two commands:

```bash
git branch add-blog-post-project-foo-intro # creates the branch from master
git checkout add-blog-post-project-foo-intro # switches to this newly-created branch
```

> **TIP**: You can switch back to the `master` branch by typing:
>
> ```bash
> git checkout master
> ```

Your team could decide on a naming strategy for topic branches. If your's
didn't decide on this, you should still try to give your topic branches
descriptive names. For example, I used the branch name
`add-blog-post-project-foo-intro` which tells me, at a glance, that this branch
contains changes that add a new blog post for introducing the project called
"foo".

## Make a commit

To create a blog post in the Project Unicorn blog, you'll have to "register" as
an author. We're not gonna write the blog post itself for now because this topic
has its tutorial.

On the `$PROJECT_ROOT`, there's a directory called `content` and inside this
directory is a file called `author.yaml`. Open the file in a text editor and add
yourself as an author entry. You can use the following snippet as a reference.
The `id` can be the same as your GitHub username.

```yaml
- id: janedoe
  name: Jane Doe
  github: janedoe
```

Save this file and run `git status` on your terminal:

```bash
$  git status
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   content/author.yaml

no changes added to commit (use "git add" and/or "git commit -a")
```

The `status` command outputs a summary of the changes that were introduced.
In this case, `author.yaml` is not _staged_ and it also indicates that it was
_modified_. "Modified" files are changed files that the repo knows about but are
not yet marked to be included in the next commit.

> **NOTE**: Remember our earlier outputs when we added the `foo.txt` file? Git
> told us that `foo.txt` is "untracked". "Untracked" files are files that are
> new to the repo. Git sees them but it's not part of the repo just yet.

After knowing what file(s) are introduced and/or modified, we can now proceed to
_stage_ them. When we stage files, we're just preparing what goes into the next
commit. When you work on larger features, you'll probably end up creating or
modifying a lot of files. Some changes are highly related to each other and it
is encouraged to group them for the next commit. Doing this improves the repo's
presentation of its history.

Since your author entry is all the change that is introduced in this step, we
can use the `git add` command to stage _all_ the changes:

```bash
git add .
```

> **NOTE**: Don't forget to include the _dot_ (`.`) after `git add`!

You can also choose to include only a subset of changed files in your commit by
providing the paths to these files instead of the dot (`.`). The snippet below
contains files for example repository (`foo`):

```bash
$  git status
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   a.txt
        modified:   d.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        dir/b.txt
        c.sh

no changes added to commit (use "git add" and/or "git commit -a")
```

If we want to group the changes in the files, `a.txt` and `dir/b.txt`:

```bash
git add a.txt dir/b.txt
```

Going back to our `pub` repo, we don't have another file so our command looks
like this:

```bash
git add content/author.yaml
```

You can also pick specific lines, to include by appending a `--patch` flag to
the command. You'll then be provided an interactive interface.

I won't discuss each option of the interactive interface but you can, of course,
read them if you like.

```bash
$  git add --patch
diff --git a/content/author.yaml b/content/author.yaml
index a8f54cd..46fb4cc 100644
--- a/content/author.yaml
+++ b/content/author.yaml
@@ -8,3 +8,7 @@
   bio: Core Team Member at Project Unicorn
   github: roymoran
   avatar: ./assets/rmoran.jpeg
+- id: janedoe
+  name: Jane Doe
+  github: janedoe
+
Stage this hunk [y,n,q,a,d,e,?]?
```

When you're done staging changes, check the status again and verify that the
`content/author.yaml` is staged:

```bash
$  git status
On branch master
Your branch is up to date with 'origin/master'.

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   content/author.yaml
```

Finally, run `git commit -m "Your message"` to save the change your local repo.
You can also add a message body by appending another `-m "Description"`.

Similar to how we name our branches, we'd want our commit messages to be
readable at a glance. The soft limit for commit message titles is 50 characters.
The excess characters will become part of the commit message body.

Quick tip on how to write commit titles: It forms a complete sentence when
inserted in this phrase:

> **If applied, this commit will** your message title here

The contents of the commit message body supplements the title. Most devs advise
that it should contain _why_ the changes were introduced instead of _what_
changes were introduced. Don't think too much about this for now, you'll develop
your commit message style with enough practice.

Your command should be similar to the snippet below. You can leave out the
commit message body.

```bash
git commit -m "Add a new author entry: Jane Doe" -m "This change adds Jane Doe as a new author"
```

## Publishing your branch

We're now going to publish our topic branch to the remote repo even if the blog
post we're working on is not yet completed. Publishing the branch is simply
uploading it to the remote repository. We do this so other members can inspect
your changes. We don't expect them to review it just yet, but it's nice to let
them know of your progress. And if you're having issues, you can ask someone to
take a look at your branch so they can study your changes.

To publish your topic branch, run this command:

```bash
git push -u origin add-blog-post-project-foo-intro
```

This will create a remote version of your topic branch on `origin`. And because
of the `-u` flag, it also sets up your local topic branch to track this new
remote branch. This means, when someone else pushes a commit to your branch, Git
will tell you about those changes when you run `git status` so you can pull them
to your local repo.

You only need to add the `-u` flag on your first push. For succeeding pushes,
you can just `git push` (without passing the other arguments).

We're not gonna introduce any more changes to the topic branch for this article.

## Keeping your topic branch up-to-date

There will be times when you are working on your topic branch, and some new
changes are merged into the `master` branch. It's recommended to pull these
changes to your topic branch as soon as you can, to minimize conflicts once you
are ready to request a merge of your topic branch to `master`.

This will not be a problem with our task right now, assuming you're the only one
who's working on your blog post. But consider a dev who's tasked with
implementing a page component. They might be working on their features and then
a bug on the app was discovered and immediately patched on the `master` branch.
Let's say the patch changes the signature of some method or the values of some
constants. If they continue committing to their branches without incorporating
the fix, their implementation might not work on the `master` branch.

Try to update the topic branch by entering these commands (it won't do anything
if no one pushed commits to that remote `master` branch):

```bash
git checkout master
git pull
git checkout add-blog-post-project-foo-intro
git merge master
```

This updates the default branch, and then switch to your topic branch to merge
the updates.

Alternatively:

> **WARNING**: Do not use the commands below if your branch is public!

```bash
git checkout add-blog-post-project-foo-intro
git pull --rebase origin master
```

Check out your topic branch first, and then run the next command. This will add
new commits from the `master` branch to your local topic branch.

Rebasing is somewhat a controversial topic. Some would argue that you should
never rebase because it alters the history of your repo. Other think it's
alright because you end up with a prettier version of the history. You can read
more about it online and make a decision yourself. If you're new to Git you'll
get by with just `merge`. Once you're comfortable with Git, definitely try to
use `rebase` in your projects.

> [Don't Be Scared of git rebase](https://nathanleclaire.com/blog/2014/09/14/dont-be-scared-of-git-rebase/)

## Resolving merge conflicts

You may encounter conflicts when merging changes from the default branch to your
topic branch. These conflicts happen when a specific part of the code is
changed in both branches. Consider the following example:

In our blogpost task, we modified the `author.yaml` file and committed it to our
topic branch. But then another author entry was pushed to the `author.yaml` on
the `origin/master` branch. You update your local default branch and try to
merge it to your topic branch but you're presented with the following:

```bash
$  git merge master
Auto-merging author.yaml
CONFLICT (content): Merge conflict in author.yaml
Automatic merge failed; fix conflicts and then commit the result.
```

The merge failed and Git tells you to fix it. When you open `author.yaml` in
your editor, you now see some weird symbols that were added by Git:

```yaml
<<<<<<< HEAD
- id: janedoe
  name: Jane Doe
  github: janedoe
=======
- id: johndoe
  name: John Doe
  github: johndoe
>>>>>>> master
```

The first section starts after the `<<<<<<< HEAD` separator up to the `=======`
separator and the code inside are the changes made in the `HEAD` of the current
branch (`add-blog-post-project-foo-intro`). The other section (from `=======` to
`>>>>>>> master`) are the changes in the `master` branch (the one you want to
merge into your topic branch).

To resolve this conflict, you have to choose which modification you want to
retain. You have to remove the separators and include code that you want. You
can chose one or both sections to include, or something different. In our case,
we'll accept both changes.

```yaml
# ...
- id: janedoe
  name: Jane Doe
  github: janedoe
- id: johndoe
  name: John Doe
  github: johndoe
```

After doing this, you can now commit the changes.

```bash
git commit -m "Fix merge conflicts"
```

To view the history as a graph you can run `git log`. The `git log` command can
be passed some arguments to customize the appearance of its output.

```
$  git log --pretty=format:\"%h %ad | %s%d [%an]\" --graph --date=short
*   5a8ee67 | Fix merge conflicts (HEAD -> master)
|\
| * 8709301 | Add a new author entry: Jane Doe (add-blog-post-project-foo-intro)
* | 0918286 | Add a new author entry: John Doe
|/
* d483bbf | Fix #123 (we started here)
```

> [git-log](https://git-scm.com/docs/git-log)

Rebasing `master` to `add-blog-post-project-foo-intro` with conflicts would have
a similar process for resolution, but the resulting history graph will be
different.

## What's next?

The next part, [**Contributing Part II: Publishing Blog
Posts**](/blog/contributing-part-ii-publishing-blog-posts), will talk about
how to write and save a new blog post on the Project Unicorn blog.
