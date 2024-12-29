import Link from 'next/link'
import { LoginForm } from '../../../components/auth/login-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Connexion - Affiliate Builder',
  description: 'Connectez-vous à votre compte Affiliate Builder',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Bienvenue
          </h1>
          <p className="text-sm text-muted-foreground">
            Entrez votre email et mot de passe pour vous connecter
          </p>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link 
            href="/auth/register" 
            className="hover:text-brand underline underline-offset-4"
          >
            Pas encore de compte ? S'inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}
