---
sidebar_position: 1
---

# Object definition

To define an object (model, entity etc.) in QCMS you have to define its `fields` and optionally `permissions` (we higly recommend to do it to have safer API).

## Fields

Fields entry contains all the properties of your object.

```
// qcms.config.js
[...]
post: {
  fields: [
    { name: 'name', type: 'String', required: true },
    { name: 'content', type: 'String' }
  ]
}
[...]
```

> You should not define `id`, `createdAt`, `updatedAt` properties. They are reserved and added to every object automatically.

## Permissions

We want your API to be secure, so we added a simple authorization layer for object CRUD.

```
// qcms.config.js
[...]
post: {
  fields: [
    { name: 'name', type: 'String', required: true },
    { name: 'content', type: 'String' }
  ],
  permissions: {
    findOne: true,
    findAll: true,
    create: ({ user }) => user.role === 'ADMIN',
    update: ({ user }) => user.role === 'ADMIN',
    delete: ({ user }) => user.role === 'ADMIN'
  }
}
[...]
```

Setting one of the operations (`findOne`, `findAll`, `create`, `update`, `delete`) or resolving it to `true` allows given user in given context to access it.

### Resolvers

All the permission entries can be set as resolvers. It means you can pass a function there which takes `user` and `entity` as arguments (`create` only takes the `user`).

```
findOne: ({ user, entity }) => user.role === 'ADMIN' || entity.userId === user.id
```

In this case, before user accesses given object, resolver checks if current user is an admin or the entity was created by current user.
