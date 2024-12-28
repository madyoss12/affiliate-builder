import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { ArrowLeft, Globe, Edit2, BarChart2, Settings, Link2 } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface PageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const site = await getSite(params.id)
  return {
    title: `${site?.name || 'Site'} - Affiliate Builder`,
    description: site?.description || 'Détails du site',
  }
}

async function getSite(id: string) {
  const supabase = createClient()
  const { data: site, error } = await supabase
    .from('sites')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return site
}

export default async function SiteDetailsPage({ params }: PageProps) {
  const site = await getSite(params.id)
  if (!site) notFound()

  const stats = [
    {
      name: 'Visiteurs',
      value: site.statistics.visitors.toLocaleString(),
      change: '+12.3%',
      changeType: 'positive',
    },
    {
      name: 'Pages vues',
      value: site.statistics.pageviews.toLocaleString(),
      change: '+15.1%',
      changeType: 'positive',
    },
    {
      name: 'Taux de conversion',
      value: `${((site.statistics.conversions / site.statistics.visitors) * 100).toFixed(2)}%`,
      change: '+2.3%',
      changeType: 'positive',
    },
    {
      name: 'Revenus',
      value: `${site.statistics.revenue.toLocaleString()}€`,
      change: '+8.2%',
      changeType: 'positive',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard/sites"
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border bg-white text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{site.name}</h1>
            <p className="text-gray-500">
              {site.domain.customDomain || `${site.domain.name}.affiliate-builder.com`}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <a
            href={`https://${site.domain.customDomain || `${site.domain.name}.affiliate-builder.com`}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Globe className="w-4 h-4 mr-2" />
            Voir le site
          </a>
          <Link
            href={`/dashboard/sites/${site.id}/edit`}
            className="inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Éditer
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                {stat.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {stat.value}
              </dd>
              <dd className={`mt-2 flex items-center text-sm ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </dd>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href={`/dashboard/sites/${site.id}/edit`}
          className="relative block p-6 bg-white shadow rounded-lg hover:bg-gray-50"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Edit2 className="w-6 h-6 text-gray-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Éditer le contenu
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Modifiez les pages et le contenu de votre site
              </p>
            </div>
          </div>
        </Link>

        <Link
          href={`/dashboard/sites/${site.id}/analytics`}
          className="relative block p-6 bg-white shadow rounded-lg hover:bg-gray-50"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart2 className="w-6 h-6 text-gray-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Analytics
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Consultez les performances détaillées
              </p>
            </div>
          </div>
        </Link>

        <Link
          href={`/dashboard/sites/${site.id}/settings`}
          className="relative block p-6 bg-white shadow rounded-lg hover:bg-gray-50"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Settings className="w-6 h-6 text-gray-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Paramètres
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Configurez les options du site
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Activité récente
        </h2>
        <div className="bg-white shadow rounded-lg">
          <div className="divide-y">
            {site.content.pages.map((page: any) => (
              <div key={page.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link2 className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {page.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {page.url}
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <Link
                      href={`/dashboard/sites/${site.id}/edit?page=${page.id}`}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Éditer
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
