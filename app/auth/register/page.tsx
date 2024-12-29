import Link from 'next/link'
import { RegisterForm } from '../../../components/auth/register-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inscription - Affiliate Builder',
  description: 'Créez votre compte Affiliate Builder',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Créer un compte
          </h1>
          <p className="text-sm text-muted-foreground">
            Remplissez le formulaire ci-dessous pour créer votre compte
          </p>
        </div>
        <RegisterForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link 
            href="/auth/login"
            className="hover:text-brand underline underline-offset-4"
          >
            Déjà un compte ? Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
