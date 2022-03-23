import dayjs from 'dayjs'
import { resolvePermissions } from '.'

test('resolves boolean permission', () => {
  const permission = resolvePermissions({ permissionsResolver: true })
  expect(permission).toBeTruthy()
})

test('resolves functional permission', () => {
  const truthyPermission = resolvePermissions({
    permissionsResolver: ({ user }: any) => user.id === '1x',
    user: {
      name: 'Johnny',
      email: 'johnny@cash.io',
      passwordDigest: '1xxx1',
      id: '1x',
      role: 'USER',
      createdAt: dayjs().toDate(),
      updatedAt: dayjs().toDate()
    }
  })
  expect(truthyPermission).toBeTruthy()
  const falsyPermission = resolvePermissions({
    permissionsResolver: ({ user }: any) => user.id === 'anythingelse1',
    user: {
      name: 'Johnny',
      email: 'johnny@cash.io',
      passwordDigest: '1xxx1',
      id: '1x',
      role: 'USER',
      createdAt: dayjs().toDate(),
      updatedAt: dayjs().toDate()
    }
  })
  expect(falsyPermission).toBeFalsy()
})
