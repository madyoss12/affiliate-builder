import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { ArrowLeft, TrendingUp, Users, Clock, DollarSign } from 'lucide-react'
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
    title: `Analytics ${site?.name || 'Site'} - Affiliate Builder`,
    description: 'Statistiques et performances du site',
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

async function getAnalytics(siteId: string) {
  const supabase = createClient()
  const { data: analytics, error } = await supabase
    .from('statistics')
    .select('*')
    .eq('site_id', siteId)
    .order('date', { ascending: false })
    .limit(30)

  if (error) return null
  return analytics
}

export default async function SiteAnalyticsPage({ params }: PageProps) {
  const [site, analytics] = await Promise.all([
    getSite(params.id),
    getAnalytics(params.id),
  ])

  if (!site) notFound()

  const periods = [
    { name: '7 derniers jours', value: '7d' },
    { name: '30 derniers jours', value: '30d' },
    { name: '3 derniers mois', value: '3m' },
    { name: '12 derniers mois', value: '12m' },
  ]

  const stats = [
    {
      name: 'Visiteurs uniques',
      value: site.statistics.visitors.toLocaleString(),
      change: '+12.3%',
      changeType: 'positive',
      icon: Users,
    },
    {
      name: 'Temps moyen',
      value: `${Math.floor(site.statistics.averageTime / 60)}:${(site.statistics.averageTime % 60).toString().padStart(2, '0')}`,
      change: '+3.2%',
      changeType: 'positive',
      icon: Clock,
    },
    {
      name: 'Taux de conversion',
      value: `${((site.statistics.conversions / site.statistics.visitors) * 100).toFixed(2)}%`,
      change: '+2.3%',
      changeType: 'positive',
      icon: TrendingUp,
    },
    {
      name: 'Revenus',
      value: `${site.statistics.revenue.toLocaleString()}€`,
      change: '+8.2%',
      changeType: 'positive',
      icon: DollarSign,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href={`/dashboard/sites/${params.id}`}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border bg-white text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
            <p className="text-gray-500">{site.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <select className="px-3 py-2 border rounded-md shadow-sm text-sm">
            {periods.map((period) => (
              <option key={period.value} value={period.value}>
                {period.name}
              </option>
            ))}
          </select>
          <button className="px-4 py-2 bg-white border rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
            Exporter
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="space-y-4">
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Trafic
            </h3>
            <div className="mt-2">
              <div className="h-96 bg-gray-50 rounded-lg border">
                {/* Chart will go here */}
                <div className="flex items-center justify-center h-full text-gray-500">
                  Graphique du trafic
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Sources de trafic
              </h3>
              <div className="mt-2">
                <div className="h-80 bg-gray-50 rounded-lg border">
                  {/* Chart will go here */}
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Graphique des sources
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Conversions
              </h3>
              <div className="mt-2">
                <div className="h-80 bg-gray-50 rounded-lg border">
                  {/* Chart will go here */}
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Graphique des conversions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Pages les plus visitées
          </h3>
          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Page
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vues
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visiteurs uniques
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Taux de rebond
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Temps moyen
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {site.content.pages.map((page: any) => (
                    <tr key={page.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {page.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        1,234
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        987
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        45%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2:30
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}