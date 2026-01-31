<p align="center">
  <a href="https://projectunicorn.net" target="_blank">
    <img src="https://sharedstorage2.blob.core.windows.net/pub/main-logo.png" alt="Project Unicorn" width="400">
  </a>
</p>

<p align="center">
  <strong>Where developers from around the world partner to build and ship software together</strong>
</p>

<p align="center">
  <a href="https://travis-ci.com/projectunic0rn/pub">
    <img src="https://travis-ci.com/projectunic0rn/pub.svg" alt="Build Status">
  </a>
  <a href="https://codecov.io/gh/projectunic0rn/pub">
    <img src="https://codecov.io/gh/projectunic0rn/pub/branch/master/graph/badge.svg" alt="Code Coverage">
  </a>
  <a href="https://projectunicorn.net/">
    <img src="https://img.shields.io/badge/website-projectunicorn.net-blue.svg" alt="Website">
  </a>
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
</p>

---

## About

Project Unicorn is a platform that connects developers worldwide to collaborate on software projects - whether for fun, learning, or profit. The platform enables developers to:

- **Find collaborators** for side projects and ideas
- **Showcase skills** through developer profiles
- **Manage projects** with team workspaces
- **Share knowledge** via the integrated blog

## Features

- **User Authentication** - Sign up, sign in, OAuth support, and password recovery
- **Developer Profiles** - Showcase your skills, technologies, and bio
- **Project Management** - Create, browse, and collaborate on projects
- **Team Workspaces** - Manage project collaborators and configurations
- **Blog Platform** - Markdown-based blog with author profiles and tagging
- **PWA Support** - Works offline with service worker caching

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Gatsby](https://www.gatsbyjs.com/) (React-based static site generator) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Styled Components](https://styled-components.com/) |
| **Testing** | [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/react) |
| **CI/CD** | [Travis CI](https://travis-ci.com/) |
| **Hosting** | GitHub Pages (production) / Surge.sh (staging) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/projectunic0rn/pub.git
   cd pub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to `http://localhost:8000` to view the site.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reloading |
| `npm run build` | Build production-ready static files |
| `npm run serve` | Serve the production build locally |
| `npm test` | Run tests with coverage report |
| `npm run test:watch` | Run tests in watch mode |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Run ESLint checks |
| `npm run lint:fix` | Auto-fix linting issues |
| `npm run format` | Format code with Prettier |

## Project Structure

```
pub/
├── src/
│   ├── api/              # API services and HTTP client
│   ├── components/       # React components
│   │   ├── account/      # User account components
│   │   ├── blog/         # Blog-related components
│   │   ├── index-page/   # Landing page sections
│   │   ├── projects/     # Project management components
│   │   └── shared/       # Reusable UI components
│   ├── contexts/         # React Context providers
│   ├── helpers/          # Utility helpers (JWT, session, auth)
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Gatsby page components (routes)
│   ├── templates/        # Gatsby templates for dynamic pages
│   ├── styles/           # Global styles and typography
│   └── utils/            # Utility functions
├── content/
│   ├── blog/             # Blog posts (Markdown)
│   ├── assets/           # Blog images and author avatars
│   └── author.yaml       # Author metadata
├── static/               # Static assets
└── scripts/              # Build and utility scripts
```

## Environment Configuration

The project uses environment-specific configuration files:

| Environment | File | Description |
|-------------|------|-------------|
| Development | `.env.development` | Local development with mock data |
| Staging | `.env.next` | Staging environment (projectunicorn-next.surge.sh) |
| Production | `.env.release` | Production environment (projectunicorn.net) |

To switch environments during build:

```bash
# Development (default)
npm run dev

# Staging build
GATSBY_ACTIVE_ENV=next npm run build

# Production build
GATSBY_ACTIVE_ENV=release npm run build
```

## Testing

Tests are written using Jest and React Testing Library. Run tests with:

```bash
# Run all tests with coverage
npm test

# Run tests in watch mode during development
npm run test:watch
```

Test files are located alongside their components in `__tests__` directories with a `.spec.tsx` extension.

## Deployment

### Staging (Automatic)

Pushes to the `master` branch automatically deploy to the staging environment at [projectunicorn-next.surge.sh](https://projectunicorn-next.surge.sh).

### Production (Tagged Releases)

Production deployments are triggered by creating a tagged release:

```bash
git tag -a v1.x.x -m "Release v1.x.x"
git push origin v1.x.x
```

This deploys to [projectunicorn.net](https://projectunicorn.net) via GitHub Pages.

## Contributing

We welcome contributions from developers of all skill levels! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

Please ensure your code:
- Passes all existing tests (`npm test`)
- Passes linting checks (`npm run lint`)
- Includes tests for new functionality
- Follows the existing code style

For detailed guidelines, see our [Contributing Guide](https://projectunicorn.net/blog/tag/contributing/).

## Documentation

- [Contributing Guide](https://projectunicorn.net/blog/tag/contributing/)
- [Attribution Notice](NOTICE)

## License

Copyright 2019 Project Unicorn

This repository contains content under different licenses:

- **Software**: Licensed under the [MIT License](LICENSE)
- **Blog Content** (`/content` directory): Licensed under [Creative Commons Attribution Share Alike 4.0 International (CC BY-SA 4.0)](/content/LICENSE)

## Acknowledgments

Built with love by the Project Unicorn community. Special thanks to all [contributors](https://github.com/projectunic0rn/pub/graphs/contributors) who help make this project possible.

---

<p align="center">
  <a href="https://projectunicorn.net">Website</a> •
  <a href="https://github.com/projectunic0rn/pub/issues">Report Bug</a> •
  <a href="https://github.com/projectunic0rn/pub/issues">Request Feature</a>
</p>
