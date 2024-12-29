import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate Builder - Créez vos sites d\'affiliation',
  description: 'Créez et gérez facilement vos sites d\'affiliation avec Affiliate Builder',
}

export const dynamic = 'force-static'

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
        'Templates personnalisés',
        'Analytics premium',
        'Support dédié',
        'API access',
        'Formation incluse',
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold">Affiliate Builder</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6">
            <Link href="/features" className="text-sm font-medium hover:text-indigo-600">
              Fonctionnalités
            </Link>
            <Link href="/templates" className="text-sm font-medium hover:text-indigo-600">
              Templates
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-indigo-600">
              Tarifs
            </Link>
            <Link href="/auth/login" className="text-sm font-medium hover:text-indigo-600">
              Connexion
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Commencer gratuitement
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-b from-indigo-50 to-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold tracking-tight mb-6">
                Créez des Sites d'Affiliation{' '}
                <span className="text-indigo-600">Rentables</span> en Quelques Clics
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Générez automatiquement des sites d'affiliation optimisés et suivez vos performances 
                en temps réel. Multipliez vos revenus sans coder.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/templates"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50"
                >
                  Voir les templates
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Tout ce dont vous avez besoin pour réussir
              </h2>
              <p className="text-xl text-gray-600">
                Des outils puissants et intuitifs pour créer des sites d'affiliation performants
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm"
                >
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-indigo-600" />
                  </div>
                  <p className="text-lg font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 bg-gray-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Des prix adaptés à vos besoins
              </h2>
              <p className="text-xl text-gray-600">
                Choisissez le plan qui vous convient et commencez à générer des revenus
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricing.map((plan) => (
                <div
                  key={plan.name}
                  className="flex flex-col p-8 bg-white rounded-lg shadow-sm"
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                  <div className="mb-6">
                    <p className="text-4xl font-bold">{plan.price}</p>
                    <p className="text-gray-600">par mois</p>
                  </div>
                  <ul className="mb-8 space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-indigo-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/auth/register"
                    className="mt-auto inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    Commencer
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm font-semibold mb-4">Produit</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-sm text-gray-600 hover:text-gray-900">
                    Fonctionnalités
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className="text-sm text-gray-600 hover:text-gray-900">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">
                    Tarifs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Ressources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-sm text-gray-600 hover:text-gray-900">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-sm text-gray-600 hover:text-gray-900">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Légal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                    Confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                    Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-gray-600">
              2024 Affiliate Builder. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
