import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Vérifiez votre email - Affiliate Builder',
  description: 'Vérifiez votre adresse email pour activer votre compte',
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Vérifiez votre email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Nous vous avons envoyé un email de confirmation.
            Veuillez cliquer sur le lien dans l'email pour activer votre compte.
          </p>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Vous n'avez pas reçu l'email ?{' '}
            <button
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => {
                // TODO: Implémenter la logique de renvoi d'email
              }}
            >
              Cliquez ici pour le renvoyer
            </button>
          </p>
        </div>

        <div className="mt-8">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Retour à la page de connexion
          </Link>
        </div>
      </div>
    </div>
  )
}
