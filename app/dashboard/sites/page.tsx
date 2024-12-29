'use client'

import { Suspense } from 'react'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { SiteList } from '@/components/dashboard/sites/site-list'
import { CreateSiteForm } from '@/components/dashboard/sites/create-site-form'
import { createClient } from '@/lib/supabase/client'

export default function SitesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Mes sites</h1>
        <Link
          href="/dashboard/sites/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouveau site
        </Link>
      </div>

      <Suspense fallback={<div>Chargement...</div>}>
        <SiteList />
      </Suspense>
    </div>
  )
}
