import Link from 'next/link'
import { RegisterForm } from '@/components/auth/register-form'

export default function RegisterPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
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
