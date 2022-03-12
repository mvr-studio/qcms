---
sidebar_position: 2
---

# Installation

No matter if your app already exists or you want to start fresh, the proces is similar.

## Prerequisites

For the QCMS' needs you need:

- Node.js installed
- PostgreSQL installed (or MySQL, SQLite, Microsoft SQL Server). If you have Docker installed on your system, check our [Docker Compose example](https://google.com).

## NPM

Simply add the depedency by running following command:

```
yarn add @mvr-studio/qcms
```

Or with NPM:

```
npm i @mvr-studio/qcms
```

## Scripts

Next, add these scripts to your `package.json`:

```
"qcms:build": "yarn --cwd node_modules/@mvr-studio/qcms local:build",
"qcms:start": "yarn --cwd node_modules/@mvr-studio/qcms local:start",
"qcms:studio": "yarn --cwd node_modules/@mvr-studio/qcms local:studio"
```

Or with NPM:

```
"qcms:build": "npm run local:build --prefix node_modules/@mvr-studio/qcms",
"qcms:start": "npm run local:start --prefix node_modules/@mvr-studio/qcms",
"qcms:studio": "npm run local:studio --prefix node_modules/@mvr-studio/qcms"
```
