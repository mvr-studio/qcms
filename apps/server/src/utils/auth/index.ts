import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'
import { AUTH_COOKIE_NAME } from '../../constants'
import { Context } from '../../context'

export const decodeToken = (authHeader: string) => {
  const jwtToken = authHeader.replace('Bearer ', '')
  if (!jwtToken) return null
  const decodedUser = jwt.verify(
    jwtToken,
    process.env.QCMS_JWT_SECRET || 'sadge'
  ) as Record<string, string | number>
  const exp = decodedUser.exp as number
  const expirationDate = dayjs(exp * 1000)
  if (dayjs().isBefore(expirationDate)) return decodedUser
  return null
}

export const resolvePermissions = ({
  permissionsResolver,
  entity,
  user
}: any) => {
  switch (typeof permissionsResolver) {
    case 'boolean':
      return permissionsResolver
    case 'function':
      return permissionsResolver({ user, entity })
  }
}

export const getSignedJWT = (data: Record<string, any>) =>
  jwt.sign({ data }, process.env.QCMS_JWT_SECRET || 'sadge', {
    expiresIn: '7d'
  })

interface SetAuthCookieProps {
  context: Context
  signedJWT: string
}

export const setAuthCookie = ({ context, signedJWT }: SetAuthCookieProps) => {
  return context.setCookies.push({
    name: AUTH_COOKIE_NAME,
    value: `Bearer ${signedJWT}`,
    options: {
      expires: dayjs().add(7, 'days').toDate(),
      httpOnly: true,
      sameSite: 'none'
    }
  })
}

export const unsetAuthCookie = ({
  context
}: Omit<SetAuthCookieProps, 'signedJWT'>) => {
  return context.setCookies.push({
    name: AUTH_COOKIE_NAME,
    value: '',
    options: {
      httpOnly: true,
      sameSite: 'none'
    }
  })
}
