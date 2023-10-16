import { Metadata } from 'next'
import UpdateProfile from './page'

export const metadata: Metadata = {
  title: 'Atualize seu perfil | Ignite Call',
  robots: {
    index: false,
  },
}

export default function Layout() {
  return <UpdateProfile />
}
