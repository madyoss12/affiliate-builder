'use client'

import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

export default function HomePage() {
  const features = [
    "Création de sites d'affiliation en quelques clics",
    "Templates optimisés pour la conversion",
    "Génération automatique de contenu",
    "Optimisation SEO intégrée",
    "Suivi des performances en temps réel",
    "Intégration multi-plateformes d'affiliation",
  ]

  const pricing = [
    {
      name: 'Gratuit',
      price: '0€',
      description: 'Pour commencer',
      features: [
        '1 site',
        'Templates de base',
        'Analytics basiques',
        'Support communautaire',
      ],
    },
    {
      name: 'Pro',
      price: '29€',
      description: 'Pour les créateurs sérieux',
      features: [
        '10 sites',
        'Tous les templates',
        'Analytics avancés',
        'Support prioritaire',
        'Domaine personnalisé',
        'Export des données',
      ],
    },
    {
      name: 'Enterprise',
      price: '99€',
      description: 'Pour les agences',
      features: [
        'Sites illimités',
        'API personnalisée',
        'Support dédié',
        'Formation incluse',
        'Multi-utilisateurs',
        'Statistiques avancées',
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                Créez vos sites d'affiliation
                <span className="text-indigo-600"> en quelques clics</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
                Générez des revenus passifs avec des sites d'affiliation optimisés et professionnels.
              </p>
              <div className="mt-8 flex justify-center space-x-4">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Tout ce dont vous avez besoin
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Des outils puissants pour créer et gérer vos sites d'affiliation
              </p>
            </div>
            <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center">
                    <Check className="h-6 w-6 text-indigo-500" />
                    <p className="ml-3 text-lg text-gray-900">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Tarifs simples et transparents
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Choisissez le plan qui correspond à vos besoins
              </p>
            </div>
            <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {pricing.map((plan) => (
                <div
                  key={plan.name}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-200"
                >
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="mt-4 text-gray-500">{plan.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-base font-medium text-gray-500">/mois</span>
                  </p>
                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-indigo-500" />
                        <span className="ml-3 text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link
                      href="/auth/register"
                      className="block w-full px-6 py-3 border border-transparent text-center font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Commencer avec {plan.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            2024 Affiliate Builder. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}
