# QCMS

QCMS is an experimental headless CMS ready to be tested on cloud.
This is a monorepo for all the QCMS services and apps.

### Apps and Packages

- `admin`: an optional Admin Panel for your CMS. You can always use Prisma Studio.
- `docs`: a CMS markdown-based Web documentation.
- `sandbox`: a meta-application for `server` testing and development purposes.
- `server`: a core of the CMS. This is where the magic happens.

## Setup

QCMS is meant to live in peace and harmony with your (already existing) Frontend.

### Prerequisites

For the QCMS' needs you need:

- Node.js installed
- PostgreSQL installed (or MySQL, SQLite, Microsoft SQL Server). If you have Docker installed on your system, check our [Docker Compose example](https://google.com).

### Installation

No matter if your app already exists or you want to start fresh, simply add the depedency:

```
$ yarn add @mvr-studio/qcms # or npm i @mvr-studio/qcms
```

Next, in your app's `package.json` you should add following scripts:

```
"qcms:build": "yarn --cwd node_modules/@mvr-studio/qcms local:build",
"qcms:start": "yarn --cwd node_modules/@mvr-studio/qcms local:start",
"qcms:studio": "yarn --cwd node_modules/@mvr-studio/qcms local:studio"
```

Then, create the `qcms.config.js` configuration. For referrence, check our [examples/](https://google.com) or visit [our documentation](https://google.com).

Finally, run:

```
$ yarn qcms:build
$ yarn qcms:start
```

## Useful Links

Learn more about the power of Turborepo:

- [Documentation](https://google.com)

Created and maintained by [MVR Studio](https://mvr.studio/)
