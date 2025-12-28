# Dependencies

This file tracks all dependencies in the project, their purpose, and how to install them.

## 1. Semantic Release & Plugins

Automates versioning, changelog generation, Git commits, and GitHub releases.

```bash
pnpm add -D semantic-release @semantic-release/changelog @semantic-release/git @semantic-release/github
```

## 2. pg

PostgreSQL client for Node.js

```bash
pnpm add pg
pnpm add -D @types/pg
```

## 3. bcryptjs

Password hashing utility

```bash
pnpm add bcryptjs
```

## 4. uuid

For the creation of RFC9562 (formerly RFC4122) UUIDs

```bash
pnpm add uuid
```

## 5. nodemailer

Email sending library

```bash
pnpm add nodemailer
pnpm add -D @types/nodemailer
```
