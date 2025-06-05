import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ReviewNhaThat - Property Review Platform',
  description: 'Discover and review premium properties in the best locations across Vietnam and globally',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
