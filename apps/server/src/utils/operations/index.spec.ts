import { getOperationsNames } from '.'

test('generates correct names for operations', () => {
  const operationsNames = getOperationsNames('pear')
  expect(JSON.stringify(operationsNames)).toEqual(
    JSON.stringify({
      findAll: 'pears',
      findOne: 'pearById',
      create: 'createPear',
      update: 'updatePear',
      delete: 'deletePear'
    })
  )
})
