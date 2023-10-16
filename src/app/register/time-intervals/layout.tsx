import { Metadata } from 'next'
import TimeIntervals from './page'

export const metadata: Metadata = {
  title: 'Selecione sua disponibilidade | Ignite Call',
  robots: {
    index: false,
  },
}

export default function Layout() {
  return <TimeIntervals />
}
