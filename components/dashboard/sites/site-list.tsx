'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MoreVertical, Globe, Edit, Trash2, BarChart2, Plus } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

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

export function SiteList({ initialSites = [] }: { initialSites?: Site[] }) {
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
    try {
      setIsDeleting(siteId)
      const { error } = await supabase.from('sites').delete().eq('id', siteId)
      
      if (error) throw error
      
      setSites(sites.filter(site => site.id !== siteId))
    } catch (error) {
      console.error('Error deleting site:', error)
    } finally {
      setIsDeleting(null)
    }
  }

  if (sites.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucun site</h3>
        <p className="mt-1 text-sm text-gray-500">
          Commencez par créer votre premier site d'affiliation.
        </p>
        <div className="mt-6">
          <Link
            href="/dashboard/sites/new"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nouveau site
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Site
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Template
            </th>
            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sites.map((site) => (
            <tr key={site.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-gray-100">
                    <Globe className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {site.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {site.domain?.customDomain || site.domain?.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(site.status)}`}>
                  {getStatusText(site.status)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {site.template?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                  <Link
                    href={`/dashboard/sites/${site.id}/analytics`}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <BarChart2 className="h-5 w-5" />
                  </Link>
                  <Link
                    href={`/dashboard/sites/${site.id}/edit`}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(site.id)}
                    className="text-gray-400 hover:text-gray-500"
                    disabled={isDeleting === site.id}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
