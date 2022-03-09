module.exports = {
  name: 'qcms',
  schema: {
    product: {
      fields: [
        {
          name: 'name',
          type: 'String',
          required: true,
          validationSchema: (z) => z.string().min(8).max(64)
        },
        {
          name: 'SKU',
          type: 'String'
        },
        { name: 'description', type: 'String' },
        { name: 'price', type: 'Int' },
        {
          name: 'category',
          type: 'Relation',
          relation: 'belongsTo',
          model: 'Category'
        },
        {
          name: 'orders',
          type: 'Relation',
          relation: 'hasMany',
          model: 'Order'
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
        {
          name: 'name',
          type: 'String',
          required: true,
          validationSchema: (z) => z.string().min(12)
        },
        {
          name: 'products',
          type: 'Relation',
          relation: 'hasMany',
          model: 'Product'
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
    order: {
      fields: [
        {
          name: 'products',
          type: 'Relation',
          relation: 'hasMany',
          model: 'Product'
        },
        { name: 'state', type: 'String', default: 'NEW' },
        { name: 'user', type: 'Relation', relation: 'belongsTo', model: 'User' }
      ],
      permissions: {
        findOne: ({ user, entity }) =>
          // Either Admin or owner of the order
          user.role === 'ADMIN' || entity.userId === user.id,
        findAll: ({ user }) => user.role === 'ADMIN',
        create: ({ user }) => !!user,
        update: ({ user }) => user.role === 'ADMIN',
        delete: ({ user }) => user.role === 'ADMIN'
      }
    }
  }
}
