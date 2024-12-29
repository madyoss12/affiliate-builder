import { AuthProvider } from '@/contexts/AuthContext'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Affiliate Builder - Créez vos sites d\'affiliation',
  description: 'Créez et gérez facilement vos sites d\'affiliation avec Affiliate Builder',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
