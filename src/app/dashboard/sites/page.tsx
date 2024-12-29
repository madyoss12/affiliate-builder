'use client'

import { Suspense } from 'react'
import { Metadata } from 'next'
import { Plus } from 'lucide-react'
import { SiteList } from '@/components/dashboard/sites/site-list'
import { CreateSiteForm } from '@/components/dashboard/sites/create-site-form'
import { createClient } from '@/lib/supabase/client'

export const metadata: Metadata = {
  title: 'Sites - Affiliate Builder',
  description: 'Gérez vos sites d\'affiliation',
}

async function getSites() {
  const supabase = createClient()
  const { data: sites, error } = await supabase
    .from('sites')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return sites
}

async function getTemplates() {
  const supabase = createClient()
  const { data: templates, error } = await supabase
    .from('templates')
    .select('id, name, category')

  if (error) throw error
  return templates
}

export default async function SitesPage() {
  const [sites, templates] = await Promise.all([getSites(), getTemplates()])

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Sites</h2>
          <p className="text-muted-foreground">
            Gérez vos sites d'affiliation
          </p>
        </div>
        <dialog id="create-site-dialog" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Créer un nouveau site</h3>
            <CreateSiteForm 
              templates={templates}
              onSuccess={() => {
                const dialog = document.getElementById('create-site-dialog') as HTMLDialogElement
                dialog?.close()
              }}
            />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>Fermer</button>
          </form>
        </dialog>
        <button
          onClick={() => {
            const dialog = document.getElementById('create-site-dialog') as HTMLDialogElement
            dialog?.showModal()
          }}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouveau site
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Rechercher un site..."
              className="px-3 py-2 border rounded-md"
            />
            <select className="px-3 py-2 border rounded-md">
              <option value="all">Tous les statuts</option>
              <option value="live">En ligne</option>
              <option value="building">En construction</option>
              <option value="draft">Brouillon</option>
              <option value="archived">Archivé</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <select className="px-3 py-2 border rounded-md">
              <option value="created_desc">Plus récent</option>
              <option value="created_asc">Plus ancien</option>
              <option value="name_asc">Nom (A-Z)</option>
              <option value="name_desc">Nom (Z-A)</option>
              <option value="visitors_desc">Visiteurs (↓)</option>
              <option value="visitors_asc">Visiteurs (↑)</option>
            </select>
          </div>
        </div>

        <Suspense fallback={<div>Chargement des sites...</div>}>
          <SiteList initialSites={sites} />
        </Suspense>
      </div>
    </div>
  )
}
