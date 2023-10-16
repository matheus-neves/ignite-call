import { Metadata } from 'next'
import Register from './page'

export const metadata: Metadata = {
  title: 'Crie uma conta | Ignite Call',
}

export default function Layout() {
  return <Register />
}
