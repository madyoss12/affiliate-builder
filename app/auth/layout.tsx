import Image from 'next/image'
import Link from 'next/link'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="mb-8">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold">Affiliate Builder</span>
              </Link>
            </div>
            {children}
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-indigo-600 to-purple-600">
            <div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm">
              <div className="flex h-full items-center justify-center">
                <div className="max-w-2xl px-8 text-center text-white">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Créez vos sites d'affiliation en quelques clics
                  </h2>
                  <p className="mt-4 text-lg">
                    Avec Affiliate Builder, créez et gérez facilement vos sites d'affiliation.
                    Nos templates optimisés et nos outils de gestion vous permettent de vous
                    concentrer sur l'essentiel : générer des revenus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
