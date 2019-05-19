---
title: 'Contributing Part I: Getting Started'
author: rmjordas
date: '2019-05-10'
image: ./hero.jpg
tags:
  - Project Unicorn
  - contributing
---

In this article we're going set up Git, a version control system; `npm`, the
package manager most commonly used in JavaScript/TypeScript projects; and Visual
Studio Code, an excellent code editor. Feel free to skip to the next part if
you're already familiar with Git, `npm` or if you have your own editor
configuration.

If you're new to this stuff, please read on. This will help you when you join
and contribute to other Project Unicorn projects.

> This is part 1 of the **Project Unicorn Contributing Guide series** that talks
> about setting up your development environment for contributing to the Project
> Unicorn web site.
>
> The next part, [**Contributing Part II: Publishing Blog
> Posts**](/blog/contributing-part-ii-publishing-blog-posts), will talk about
> how to write and save a new blog post.

## Requirements

Before we start you need to ensure that you have the following installed in your
machine:

- [Node.js](https://nodejs.org/en/)
- `npm`
- [Git](https://git-scm.com/)

Installing Node.js will also install `npm`. When you install Git on Windows, you
are also provided with _Git Bash_. It is recommended to use this software when
interacting with Git.

This guide will assume that you are using Git Bash if you are using Windows. For
Linux and MacOS, the default terminal will do.

To verify your installations, enter the following in your terminal:

```bash
node -v;npm -v;git --version
```

The output should look similar to the output below. It's alright if the versions
don't match exactly but make sure the number before the first dot is the same.

```bash
v10.15.3
6.9.0
git version 2.21.0.windows.1
```

## Introducing Git and GitHub

Git, according to it's website, is "a free and open source distributed version
control system". In simpler terms, this awesome piece of technology allows us to
have a history of the changes made our code. This is useful because if we
introduce changes that made our app buggy, we can easily revert back to an
earlier _snapshot_ and study how and why these changes caused those bugs.

On the other hand, [GitHub][] is a service that offers hosting for anyone's
code that is monitored by Git. It also has a bunch of collaboration tools for
developers like an issue tracker, project task board and more. We use GitHub to
access a friendlier interface for when we are inspecting a Git _repository_
(also called a "repo").

[github]: https://github.com

Since we have the Project Unicorn repo hosted on GitHub you have to make sure
you have an account in GitHub. Please refer to the following documentation:

> [Signing up for a new GitHub account][signup]

[signup]: https://help.github.com/articles/signing-up-for-a-new-github-account/

### Local setup

If you are avoiding the command line, you can choose to use _only_ the GitHub
website to interact with your repos. It's possible but it will be very difficult
to produce concise entries to your history. A better tool to use is a GUI client
that offers more features for organizing your changes. The Git website provides
a [list of third-party GUI clients][git_gui].

[git_gui]: https://git-scm.com/downloads/guis

An even better tool is the command line. It can be scary to use especially if
you have little experience with it, but it's what I recommend you to start of
with when learning Git. The command line is also what we're gonna use for this
guide.

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

### Authenticate Your Git

To be able to interact with a remote repository, such as the Project Unicorn web
site's repository on GitHub, you have to setup authentication. Follow these
guides from GitHub:

> [Set up git](https://help.github.com/articles/set-up-git/)
>
> [Why is Git always asking for my password?](https://help.github.com/articles/why-is-git-always-asking-for-my-password/)

Once that's done, we're ready to get started! We'll begin by working directly
with the Project Unicorn repository. At the end of this tutorial series, you'd
be able to add your contributions to the Project Unicorn repository.

### Cloning a repository

The first task is to get the Projecty Unicorn repository to your machine. We
call this process _cloning_ a repo. Type these command in your terminal:

```bash
git clone git@github.com:projectunic0rn/pub.git
cd pub
pwd # Outputs the path to our $PROJECT_ROOT
```

The first command will _clone_ the project to your machine. This tells Git to
make a directory inside the directory where you executed the `clone` command and
copy the repository there. The name of the directory will be the same as the
remote repository's name, by default.

When this is done, you now have a copy of the Project Unicorn web site source
code. This copy should include a directory called `.git` which is used by Git to
keep track of the repo's changes.

You should know that whatever changes you introduce in this copy on your machine
will not auto-save to the repo hosted on GitHub. We'll learn more on how to
update the remote repo using your cloned repo later.

The next command (`cd pub`) will allow you to move inside the directory that Git
created when it cloned the repo to your machine, i.e. `pub` (same as the remote
repository's name).

> **TIP**: You can provide the name of the directory you want the copy to be in
> by adding it to the last part of the `clone` command. For example:
>
> ```bash
> git clone git@github.com:projectunic0rn/pub.git more-awesome-pub
> ```
>
> Copies the repo to a newly created directory called `more-awesome-pub`.

The last command (`pwd`) will output the path to the current working directory.
In this guide, we refer to the root of the Pub repository as `$PROJECT_ROOT`.

In most Git tutorials, the command you're commonly taught first is `git init`.
If you want Git to track a project you did earlier or if you are starting fresh
and you want to introduce Git from the start, you can type this command to your
terminal:

```bash
git init
```

If it has files already or if it's empty doesn't matter. And don't worry if you
accidentally `init`ed an existing repo bacause it won't overwrite anything.

### Checking the status

When you want to know what changes Git can see right now, you'd use the
`git status` command:

```bash
$ git status
```

If you entered this while inside the Project Unicorn web site repository, you'd
probably see this message:

```bash
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

> **TIP**: The touch command basically creates new but empty file(s) with the
> name(s) you provide it, e.g. `foo.txt`. It can also be used to update an
> exisiting directory or file's last modified property.
>
> [The `touch` command](http://www.linfo.org/touch.html)

The output would be:

```bash
On branch master
Your branch is up to date with 'origin/master'.

Untracked files:
(use "git add <file>..." to include in what will be committed)

        foo.txt

nothing added to commit but untracked files present (use "git add" to track)
```

Git knows you introduced a new file but the file is "untracked". It also
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

### Branches in Git

Look at the last output of `git status`:

```
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
```

It tells us that our _branch_ is up to date with something called
`origin/master`. When we use Git for developing our application, we would
normally interact with at least one of these branches.

When you create a new repo, Git will create a branch for you called `master`.
When you run `git status` after cloning the `pub` repo, it tells you that you
are "On branch master". The `master` branch is not a special branch. It's just
the name the that Git authors decided to use when creating a new repository.

When you want to save changes to Git, you are, in some ways, saving it to a
branch. For every _save_ you do, Git can tracks the changes, who made those
changes, when they were made, and some other information.

You're probably thinking: _wow, so it's just like saving in a text editor (like
Notepad) then?_ Not exactly. When you are working in Notepad, it doesn't care
what lines of code you removed or what parts you added but only that you
changed the file. Whereas Git knows what specific line of code you changed
for every save you do.

If you'd ever use [Google Docs][gdocs], you'd find that it has a feature called
"Version History" to view the changes you made to a document. This is very
similar to viewing a single branch in Git. Open one of your Google Docs files
and you can inspect the specific additions and deletions performed for every
version. You can even _checkout_ an old version and _branch off_ that version
by making a copy of the document.

[gdocs]: https://docs.google.com

> [See what's changed in a file](https://support.google.com/docs/answer/190843)

### Updating the default branch

When you clone a repository, you are always in that repository's default branch.
For the Project Unicorn web site repo, it's called `master`. On other repos, you
might find the default branch to be called `dev` or something else. If you're
not sure what branch you're currently using, you can run `git status`.

Another way to check is to run `git branch`:

```bash
$  git branch
* master
```

The one with the asterisk before it is the branch currently checked out.

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

If your command is successful you'd be presented with something similar to this
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
`package-lock.json` were modfied while you were taking a break. You'd most likey
see a different list of files. And it's also possible that there aren't any
changes introduced, to which you'll see:

```bash
$  git pull
Already up to date.
```

If you see any errors when you ran this command, you probably modified the same
lines of the same file that is also modifed on the remote repo. The following
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
"committing" and "stashing" yet because those commands have their own sections
later in the guide.

### Create your feature branch

Once an issue is assigned to you, make a new feature branch off the latest `dev`
branch. You can do this by entering these commands in your terminal:

```bash
git checkout dev
git pull
git checkout -b my-feature-branch
```

The first command switches to the repository's default branch which is called
`dev` (if, for some reason, you are in another branch). Next, it downloads and
merges the latest commits from the `dev` branch of the remote `pub`
repository hosted on GitHub. This is important because it can help minimize
conflicts when requesting a merge of your feature branch to the `dev` branch
later.

The last command creates a new branch called `my-feature-branch` on you local
Git repository, and immediately switches to that branch.

> **NOTE**: You can switch back to the `dev` branch by typing:
>
> ```bash
> git checkout dev
> ```

### Make a commit

When you are in your feature branch you can add your changes by issuing a
_commit_:

```bash
# First, make some changes to the repo, then:
git status
git add .
git commit -m "My commit message"
```

The `status` command outputs a summary of the changes that were introduced:

- "Untracked" files are files that are new to the repo
- "Modified" files (or files under the "Changes not staged for commit" section)
  are changed files that the repo knows about but are not yet marked to be
  included in the next commit.
- "Staged" files (or files under the "Changes to be committed" section) are
  files that are marked to be included in the next commit.

To stage all your changes, you run the second command, `git add .`. You can
choose include only a subset of changed files in your commit by providing the
paths to these files instead of the `.`, i.e. `git add a.txt dir/b.txt`.

You can also pick specific lines, to include by appending a `--patch` flag to
the command. You'll then be provided an interactive interface. Press `?` to view
a list of commands and their descriptions:

```console
$  git add file.txt --patch
diff --git a/file.txt b/file.txt
index b5ad4f2..fe30b73 100644
--- a/file.text
+++ b/file.text
@@ -43,7 +43,7 @@ This is an example file called "file.txt".

 The next line is just one of the change you may have in a file:
-thequickbrownfox
+the quick brown fox
 jumps over the lazy dog.
Stage this hunk [y,n,q,a,d,j,J,g,/,e,?]?
```

When you're done staging changes, run `git commit -m "Your message"`. You can
also add a description by appending another `-m "Description"`:

```bash
git commit -m "Commit message title" -m "Commit message description"
```

If you run `git commit` only (without other arguments), then you can use an
editor available in your system to provide the commit message. The default
editor will probably be `vim` or `nano`. To change the editor, run this command:

```bash
# For example, you want to use Visual Studio Code
git config --global core.editor "code --wait"
```

> [VS Code as Git editor](https://code.visualstudio.com/docs/editor/versioncontrol#_vs-code-as-git-editor)

### Git workflow diagram

Refer to the diagram below for a walkthrough of a common Git workflow:

```
 Working           Staging            Local      :     Remote
Directory           Area              Repo       :      Repo
----|-----------------|-----------------|--------:--------|----
    |                 |                 |        :        |
    |====[git add]===>|                 |        :        |
    |                 |                 |        :        |
    |                 |==[git commit]==>|        :        |
    |                 |                 |        :        |
    |                 |                 |===[git push]===>|
    |                 |                 |        :        |
    |                 |                 |<===[git fetch]==|
    |                 |                 |        :        |
    |<=========[git checkout]===========|        :        |
    |                 |                 |        :        |
    |<==========[git merge]=============|        :        |
    |                 |                 |        :        |
    |<=====================[git pull]=====================|
```

### Update files using GitHub's web interface

Alternatively, you can use GitHub's web interface, to edit files. Please refer
to GitHub's documentation:

> [Editing files in your repository](https://help.github.com/articles/editing-files-in-your-repository/)

### Publishing your branch

Even if the feature you're working on is not yet completed, you can publish your
changes to the remote repository, so other members can view your changes.

You can do this by running:

```bash
git push -u origin <your-feature-branch>
```

This will create a remote version of your feature branch on the remote
repository with all your current changes in it. And because of the `-u` flag, it
also sets up your local feature branch to track this new remote branch.

You only need to add the `-u` flag once and then you can use `git push` without
passing the other arguments.

### Opening a pull request

When you publish a branch to a remote repository, you can open a pull request
based on it. See this help article from GitHub:

> [About Pull Requests](https://help.github.com/articles/about-pull-requests/)

### Keeping your feature branch up-to-date

There will be times when you are working on your feature branch, and some new
changes are merged into the `dev` branch. It's recommended to pull these
changes to your feature branch as soon as you are able to, to minimize conflicts
once you are ready to request a merge of your feature branch to `dev`.

```bash
git checkout dev
git pull
git checkout <my-feature-branch>
git merge dev
```

Pull changes from the remote development branch first and then switch to your
feature branch, run the merge command and fix merge conflicts (if any).

Alternatively:

> **WARNING**: Do not use the commands below if your branch is public!

```bash
git checkout <my-feature-branch>
git pull --rebase origin dev
```

Checkout your feature branch first, and then run the second command. This will
add new commits from the `dev` branch to your local feature branch.

> **NOTE**: In the above command we use --rebase when pulling. Take care not to
> use --rebase when your branch is public or when your branch has an active pull
> request. In the below case, rebasing re-writes your commits on top of dev
> which gives each commit a new commit hash essentially making them brand new
> commits.
>
> If done on a public branch or worse on an active PR folks on your team will
> have a defunct branch on their local machines. Our advice here is to learn
> when rebasing is appropriate and when it is not.
>
> [Don't Be Scared of git rebase](https://nathanleclaire.com/blog/2014/09/14/dont-be-scared-of-git-rebase/)

### Resolving merge conflicts

You may encounter conflicts when merging changes from the default branch to your
feature branch. These conflicts happens when a specific part of the code is
changed in both branches.

Consider the following example: Suppose, you made a text document with a simple
`Hello, World` string in it and committed it to `master`. Create a new branch
called `other-branch`.

Modify "Hello, World" while you are at the `master` branch to `Saluton, Modo`
and commit this change. Now, switch to `other-branch`, add a commit that changes
`Hello, World` to `Bonjour le monde` and then merge this branch to `master`.
You'll be presented with the following:

```console
# The current branch is `other-branch`...
$  git merge master
Auto-merging hello_world.txt
CONFLICT (content): Merge conflict in hello_world.txt
Automatic merge failed; fix conflicts and then commit the result.
```

Opening `hello_world.txt` will show:

```txt
<<<<<<< HEAD
Bonjour le monde
=======
Saluton, Mondo
>>>>>>> master
```

The first section starts after the `<<<<<<< HEAD` separator up to the `=======`
separator. The code in this section are the changes made in the `HEAD` of the
current branch. The other section (from `=======` to `>>>>>>> master`) are the
changes made in the `master` branch.

To resolve this conflict, you have to choose which modification you want to
retain. You have to remove these separators and include code that you want. You
can chose one or both sections to include, or something totally different. After
doing this, you can now commit the changes.

```
*   5a8ee67 | Goodbye, Solar System (fix merge conflicts) (HEAD -> master)
|\
| * 8709301 | Hello, World -> Bonjour le monde (other-branch)
* | 0918286 | Hello, World -> Saluton, Modo
|/
* d483bbf | Hello, World (start here)
```

Rebasing `master` to `other-branch` with conflicts would have a similar process
for resolution, but the resulting history graph will be different.

## What's next?

The next part, [**Contributing Part II: Publishing Blog
Posts**](/blog/contributing-part-ii-publishing-blog-posts), will talk about
how to write and save a new blog post on the Project Unicorn blog.
