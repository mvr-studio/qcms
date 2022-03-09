import { resolvePermissions } from '.'

test('resolves boolean permission', () => {
  const permission = resolvePermissions({ permissionsResolver: true })
  expect(permission).toBeTruthy()
})

test('resolves functional permission', () => {
  const truthyPermissio = resolvePermissions({
    permissionsResolver: ({ user }: any) => user.id === 1,
    user: { id: 1 }
  })
  expect(truthyPermissio).toBeTruthy()
  const falsyPermission = resolvePermissions({
    permissionsResolver: ({ user }: any) => user.id === 2,
    user: { id: 1 }
  })
  expect(falsyPermission).toBeFalsy()
})
