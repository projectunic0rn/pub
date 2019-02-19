---
title: Get Started
author: rmjordas
date: '2019-01-18T13:40:32.169Z'
image: ./grocery.jpg
tags:
  - mentorship
  - contributing
  - guide
---

Thank you for your interest in the project.

We definitely appreciate any contributions you can provide. To get started
publishing contributions, please read first the the instructions below.

## Requirements

Ensure you have the following installed in your system:

- Node.js
- `npm`
- Git

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
git clone git@github.com:projectunic0rn/mentorship-ui.git
cd mentorship-ui
pwd # $PROJECT_ROOT
```

The first command will _clone_ the project to your machine. This means that you
tell Git to make a directory in the directory where you executed the `clone`
command and copy the repository there. If you have a dedicated directory for
cloned repository, make sure you are running your commands inside that
directory.

The next command will allow you to move inside the directory that Git created,
when it cloned the repo to your machine: `mentorship-ui` (same as the
repository's name).

> **NOTE**: You can provide the name of the directory by adding it the last part
> of the `clone` command:
>
> ```bash
> git clone git@github.com:projectunic0rn/mentorship-ui.git my-mentorship-ui
> ```

The last command will output the path to the current working directory. In this
guide, we refer to the root of the Mentorship UI repository as `$PROJECT_ROOT`.

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

Finally, open your browser to http://localhost:3000.

### Other commands

The project also specifies other `npm` scripts you can run when working with
specific portions of the application:

| Script      | Description                                            |
| ----------- | ------------------------------------------------------ |
| `build-css` | Compile Sass files to CSS                              |
| `watch-css` | Compile Sass files to CSS and watch for changes        |
| `build`     | Builds the app for production to the build directory   |
| `test`      | Launches the test runner in the interactive watch mode |
| `eject`     | Removes the single build dependency from the project   |

### Environment variables

> [Add Custom Environment Variables](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables)

You may choose to provide the application some configuration via environment
variables when you are running the scripts above. For example, if you want to
run the `test` script in non-watch mode, i.e. it runs all the test only once:

```bash
CI=true npm run test
```

To configure the behavior that opens a browser immediately after compiling the
application when running the `start` script:

```bash
BROWSER=Firefox npm start
```

This is quite tedious to type so a better approach is to create a new file
called `.env.development.local` where you can list all your configurations:

> **TIP**: See [.env.development.local.example](.env.development.local.example)

```
BROWSER=none
```

Then you can just run `npm run start`.

> [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

You can also inject configuration values when compiling the application. Create
React App requires a `REACT_APP_` prefix for those values to be included:

```
REACT_APP_SECRET_KEY=secret
REACT_APP_MAGIC_NUMBER=42
```

Then access these values in the application:

```typescript
interface AppConfig {
  [key: string]: string | undefined;
}

export const config: AppConfig = {
  secretKey: process.env.REACT_APP_SECRET_KEY,
  magicNumber: process.env.REACT_APP_MAGIC_NUMBER,
};

const { secretKey } = config;

if (!secretKey) {
  throw new Error('Secret key not provided!');
}

console.log(secretKey);
```

> **NOTE**: Restart the development server when you change the `.env*` files

## Contributing

### GitHub

Before proceeding, make sure you have an account in GitHub. Please refer to the
following documentation:

> [Signing up for a new GitHub account][signup].

[signup]: https://help.github.com/articles/signing-up-for-a-new-github-account/

### Git

To be able to interact with a remote repository, such as Mentorship UI's
repository on GitHub, you have to setup authentication. Follow these guides from
GitHub:

> [Set up git](https://help.github.com/articles/set-up-git/).
>
> [Why is Git always asking for my password?](https://help.github.com/articles/why-is-git-always-asking-for-my-password/)

### Updating the default branch

When you clone the repository, you are always in the repository's default
branch, `dev`. You can verify this by running:

```console
$  git branch
   active-pending-list
   chat
*  dev
   mentor-dashboard
```

The one with the asterisk before it is the branch currently checked out. To get
the newly published changes in the remote repository's default branch, you can
do a `pull`, which will download and merge the changes to your local
repository's `dev` branch:

```bash
git pull
```

> **NOTE**: Run an `npm install` if there are changes to `package.json`'s
> dependencies

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
merges the latest commits from the `dev` branch of the remote `mentorship-ui`
repository hosted on GitHub. This is important because it can help avoid
problems when merging your feature branch to the `dev` branch later.

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
Stage this hunk [y,n,q,a,d,j,J,g,/,e,?]? ?
y - stage this hunk
n - do not stage this hunk
q - quit; do not stage this hunk or any of the remaining ones
a - stage this hunk and all later hunks in the file
d - do not stage this hunk or any of the later hunks in the file
g - select a hunk to go to
/ - search for a hunk matching the given regex
j - leave this hunk undecided, see next undecided hunk
J - leave this hunk undecided, see next hunk
e - manually edit the current hunk
? - print help
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
repository with all your current changes in it. It also sets up your local
feature branch to track this new remote branch (because of the `-u` flag).

You only need to add the `-u` flag once and then you can use `git push` without
passing the other arguments.

### Opening a pull request

When you publish a branch to a remote repository, you can open a pull request
based on it. See this help article from GitHub:

> [About Pull Requests](https://help.github.com/articles/about-pull-requests/)

### Pulling changes from `dev` to your feature branch

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
`Hello, World` string in it. Create a new branch called `other-branch`.

Modify "Hello, World" while you are at the `master` branch to `Saluton, Modo`.
Now, switch to `other-branch`, change `Hello, World` to `Bonjour le monde` and
then merge this branch to `master`. You'll be presented with the following:

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

## Tech Stack & Tools

### Front End

- **ReactJS** - a JavaScript library for building user interfaces.
- **TypeScript** - a typed superset of JavaScript that compiles to plain JavaScript.
- **SCSS** - a CSS pre-processor with syntax advancements.

### Back End

- **C#** - a general-purpose, multi-paradigm programming language.
- **Travis CI** - A hosted, distributed continuous integration service.
- **Azure** - a cloud computing service created by Microsoft.

### Task Planning

- **Waffle** - a lightweight project management tool.
- **MindMup** - a mind mapping application to create argument maps and concept maps.
- **Google Docs** - a word processor included as part of a free, web-based software office suite offered by Google.

### Design Tools

- **Adobe XD** - a vector-based tool developed and published by Adobe Inc for designing and prototyping user experience for web and mobile apps.
- **Zeplin** - is a collaboration tool, built for UI designers and frontend developers.

### Version Control

- **Git** - a version-control system for tracking changes in computer files and coordinating work on those files among multiple people.

### Communication

- **Slack** - a cloud-based set of proprietary team collaboration tools and services.
- **Google Hangouts** - is a communication platform developed by Google which includes messaging, video chat, SMS and VOIP features.

## Read more

- [Common Git commands](https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html)
- [A beginners guide to `npm`](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/)
- [TypeScript](https://www.typescriptlang.org/docs/index.html)
- [React](https://reactjs.org/docs/getting-started.html)
- [JSX with TypeScript](https://www.typescriptlang.org/docs/handbook/jsx.html)
- [Sass](https://sass-lang.com/guide)
- [C#](https://docs.microsoft.com/en-us/dotnet/csharp/)
- [Travis CI](https://travis-ci.org/)
- [Waffle](https://waffle.io/)
- [MindMup](https://www.mindmup.com/)
- [Adobe XD](https://www.adobe.com/ca/products/xd.html)
- [Zeplin](https://zeplin.io/)
- [Google Docs](https://www.google.com/docs/about/)
- [Google Hangouts](https://hangouts.google.com/)
- [Slack](https://slack.com/)
