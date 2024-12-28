import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { ArrowLeft, Save, Eye, Undo, Redo, Layout } from 'lucide-react'
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
    title: `Éditer ${site?.name || 'Site'} - Affiliate Builder`,
    description: 'Éditeur de site',
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

export default async function SiteEditPage({ params }: PageProps) {
  const site = await getSite(params.id)
  if (!site) notFound()

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center space-x-4">
          <Link
            href={`/dashboard/sites/${params.id}`}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border bg-white text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-medium">{site.name}</h1>
            <p className="text-sm text-gray-500">
              {site.domain.customDomain || `${site.domain.name}.affiliate-builder.com`}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="inline-flex items-center px-3 py-2 border rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Undo className="w-4 h-4 mr-2" />
            Annuler
          </button>
          <button className="inline-flex items-center px-3 py-2 border rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Redo className="w-4 h-4 mr-2" />
            Rétablir
          </button>
          <button className="inline-flex items-center px-3 py-2 border rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Eye className="w-4 h-4 mr-2" />
            Aperçu
          </button>
          <button className="inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            <Save className="w-4 h-4 mr-2" />
            Enregistrer
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-64 border-r bg-white">
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Pages</h2>
                <nav className="mt-2 space-y-1">
                  {site.content.pages.map((page: any) => (
                    <button
                      key={page.id}
                      className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      <Layout className="w-4 h-4 mr-2" />
                      {page.title}
                    </button>
                  ))}
                </nav>
              </div>

              <div>
                <h2 className="text-sm font-medium text-gray-500">Composants</h2>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg mb-2"></div>
                    En-tête
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg mb-2"></div>
                    Héros
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg mb-2"></div>
                    Grille
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg mb-2"></div>
                    Liste
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 bg-gray-50">
          <div className="h-full p-8">
            <div className="bg-white border rounded-lg shadow-sm h-full">
              {/* Editor content will go here */}
              <div className="p-8">
                <div className="max-w-4xl mx-auto">
                  <div className="space-y-8">
                    {/* Example content blocks */}
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                      Faites glisser des composants ici
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Properties panel */}
        <div className="w-80 border-l bg-white">
          <div className="p-4">
            <h2 className="text-sm font-medium text-gray-500">Propriétés</h2>
            <div className="mt-4 space-y-4">
              {/* Example properties */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Titre
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <div className="mt-1 flex items-center">
                  <button className="inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Choisir une image
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
