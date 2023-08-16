import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import UpdateProfilePage from './components/UpdateProfilePage'

export default async function UpdateProfile() {
  const session = await getServerSession(authOptions)
  return <UpdateProfilePage session={session} />
}
