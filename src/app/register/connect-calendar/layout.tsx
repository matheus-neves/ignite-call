import { Metadata } from 'next'
import ConnectCalendar from './page'

export const metadata: Metadata = {
  title: 'Conecte sua agenda do Google | Ignite Call',
  description: 'Generated by create next app',
  robots: {
    index: false,
  },
}

export default function Layout() {
  return <ConnectCalendar />
}