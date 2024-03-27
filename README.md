This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Hosting & Deployment

### Deploying to Production

The main branch will be connected to staging site, and production branch will be connected to production site.
When you push the main branch to production branch, it will trigger build for production. Please make sure to check main (staging site) so that we are not pushing any bug to the production site.

```
  git checkout main
  git pull origin main
  git checkout production
  git merge main
  git push origin/production
```

Alternatively, make & merge a pull request from `main` to `production`.

## Features

### A/B Testing

Sanity and the Next.js app are configured for A/B testing. Read how this works in the [A/B Testing Readme](./docs/ABTesting.md)

## Development

### Branch Naming Convention

Branch names should follow the category, reference, description convention (`<cagtegory/reference/description-in-kebab-case>`)

Categories:

- `feature` is for adding, refactoring or removing a feature
- `bugfix` is for fixing a bug
- `hotfix` is for changing code with a temporary solution and/or without following the usual process (usually because of an emergency)
- `test` is for experimenting outside of an issue/ticket

Reference: reference of the issue/ticket. If there is no reference, just add `no-ref`.

Description: description the sums up the issue/ticket in kebab case. The title of the ticket should suffice in most cases.

### Commit Naming Convention

We follow the Conventional Commits convention when writing commit messages ([https://www.conventionalcommits.org/en/v1.0.0/#summary]). Adhering to these commit conventions gives clarity for peer reviews as well as automated github releases that we create to capture changes to the codebase once a week.

Overview:

- fix: a commit of the type `fix` patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
- feat: a commit of the type `feat` introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).
- BREAKING CHANGE: a commit that has a footer `BREAKING CHANGE`:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
- types other than `fix:` and `feat:` are allowed, for example @commitlint/config-conventional (based on the Angular convention) recommends `build:`, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, and others.
- footers other than `BREAKING CHANGE: <description>` may be provided and follow a convention similar to git trailer format.
