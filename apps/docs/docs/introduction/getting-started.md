---
sidebar_position: 3
---

# Getting started

To get started you have to follow steps described in [Installation](/docs/introduction/installation). Next up, you should create `qcms.config.js` and `.env` files.

## QCMS Config

We took similar approach on configuring and setting up the QCMS as tools like Next.js, Gatsby etc.
You have to create `qcms.config.js` file which will contain all the configuration and schema for the CMS.
Even though the config file is a JavaScript module, you can still take the advantage of having TypeScript checks.

### Simple blog example

```js
// @ts-check

/** @type {import('@mvr-studio/qcms/src/types').QcmsConfig} */
const config = {
  name: 'Simple Blog',
  schema: {
    post: {
      fields: [
        { name: 'name', type: 'String', required: true },
        { name: 'content', type: 'String' },
        {
          name: 'categories',
          type: 'Relation',
          relation: 'hasMany',
          model: 'Category'
        }
      ],
      permissions: {
        findOne: true,
        findAll: true,
        create: ({ user }) => user.role === 'ADMIN',
        update: ({ user }) => user.role === 'ADMIN',
        delete: ({ user }) => user.role === 'ADMIN'
      }
    },
    category: {
      fields: [
        { name: 'name', type: 'String', required: true },
        {
          name: 'posts',
          type: 'Relation',
          relation: 'hasMany',
          model: 'Post'
        }
      ],
      permissions: {
        findOne: true,
        findAll: true,
        create: ({ user }) => user.role === 'ADMIN',
        update: ({ user }) => user.role === 'ADMIN',
        delete: ({ user }) => user.role === 'ADMIN'
      }
    }
  }
}

module.exports = config
```

For more cases please check out the [examples/](https://github.com/mvr-studio/qcms/tree/master/examples).

## Running

In order to build the CMS you have to run first:

```
yarn qcms:build
```

And then start the server with:

```
yarn qcms:start
```

### Watch schema changes

If you'd like to have a server rebuild on each `qcms.config.js` save, then simply install `nodemon` and add a script to your `package.json` like:

```
"qcms:dev": "nodemon -w qcms.config.js -x \"yarn qcms:build && yarn qcms:start\""
```
