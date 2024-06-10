
import { User, getServerSession } from 'next-auth'
import { authOption } from '../../app/api/auth/[...nextauth]/route'
export const getUserSession = async (): Promise<User> => {
  const authUserSession = await getServerSession(authOption)
  return authUserSession
}