import { useState } from 'react'
import Link from 'next/link'
import { MoreVertical, Globe, Edit, Trash2, BarChart2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Site {
  id: string
  name: string
  domain: {
    name: string
    customDomain?: string
  }
  status: 'draft' | 'building' | 'live' | 'archived'
  template: {
    id: string
    name: string
  }
  statistics: {
    visitors: number
    pageviews: number
    conversions: number
    revenue: number
  }
}

export function SiteList({ initialSites }: { initialSites: Site[] }) {
  const [sites, setSites] = useState<Site[]>(initialSites)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const getStatusColor = (status: Site['status']) => {
    switch (status) {
      case 'live':
        return 'text-green-600 bg-green-50'
      case 'building':
        return 'text-yellow-600 bg-yellow-50'
      case 'draft':
        return 'text-gray-600 bg-gray-50'
      case 'archived':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusText = (status: Site['status']) => {
    switch (status) {
      case 'live':
        return 'En ligne'
      case 'building':
        return 'En construction'
      case 'draft':
        return 'Brouillon'
      case 'archived':
        return 'Archivé'
      default:
        return status
    }
  }

  const handleDelete = async (siteId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce site ?')) return

    setIsDeleting(siteId)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('sites')
        .delete()
        .eq('id', siteId)

      if (error) throw error

      setSites(sites.filter(site => site.id !== siteId))
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      alert('Erreur lors de la suppression du site')
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Site</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Template</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Visiteurs</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Conversions</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Revenus</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sites.map((site) => (
              <tr key={site.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-gray-400 mr-2" />
                    <div>
                      <div className="font-medium text-gray-900">{site.name}</div>
                      <div className="text-sm text-gray-500">
                        {site.domain.customDomain || site.domain.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(site.status)}`}>
                    {getStatusText(site.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {site.template.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {site.statistics.visitors.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {site.statistics.conversions.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {site.statistics.revenue.toLocaleString()}€
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/dashboard/sites/${site.id}`}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <Link
                      href={`/dashboard/sites/${site.id}/analytics`}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <BarChart2 className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(site.id)}
                      disabled={isDeleting === site.id}
                      className="text-gray-400 hover:text-red-500 disabled:opacity-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
