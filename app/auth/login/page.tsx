'use client'

import Link from 'next/link'
import { LoginForm } from '@/components/auth/login-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Connexion - Affiliate Builder',
  description: 'Connectez-vous à votre compte Affiliate Builder',
}

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Connexion</h1>
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
