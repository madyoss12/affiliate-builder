'use client'

import Link from 'next/link'
import { RegisterForm } from '@/components/auth/register-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inscription - Affiliate Builder',
  description: 'Créez votre compte Affiliate Builder',
}

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Inscription</h1>
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
