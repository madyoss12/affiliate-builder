'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createClient } from '@/lib/supabase/client'

const siteSchema = z.object({
  name: z.string().min(3, {
    message: "Le nom du site doit contenir au moins 3 caractères.",
  }),
  templateId: z.string({
    required_error: "Veuillez sélectionner un template.",
  }),
  domain: z.object({
    name: z.string().min(3, {
      message: "Le nom de domaine doit contenir au moins 3 caractères.",
    }),
    customDomain: z.string().optional(),
  }),
  niche: z.string({
    required_error: "Veuillez sélectionner une niche.",
  }),
  description: z.string().optional(),
})

type SiteFormValues = z.infer<typeof siteSchema>

interface Template {
  id: string
  name: string
  category: string
}

interface CreateSiteFormProps {
  templates: Template[]
  onSuccess?: () => void
}

export function CreateSiteForm({ templates, onSuccess }: CreateSiteFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<SiteFormValues>({
    resolver: zodResolver(siteSchema),
    defaultValues: {
      name: '',
      templateId: '',
      domain: {
        name: '',
      },
      niche: '',
      description: '',
    },
  })

  async function onSubmit(data: SiteFormValues) {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      
      // Créer le site
      const { data: site, error: siteError } = await supabase
        .from('sites')
        .insert({
          name: data.name,
          template: {
            id: data.templateId,
            version: '1.0',
          },
          domain: {
            name: data.domain.name,
            customDomain: data.domain.customDomain,
            ssl: true,
          },
          status: 'draft',
          content: {
            pages: [
              {
                id: crypto.randomUUID(),
                type: 'home',
                url: '/',
                title: data.name,
                content: {},
                seo: {
                  metaTitle: data.name,
                  metaDescription: data.description,
                  keywords: [],
                },
              },
            ],
          },
          monetization: {
            affiliatePrograms: [],
          },
          statistics: {
            visitors: 0,
            pageviews: 0,
            bounceRate: 0,
            averageTime: 0,
            conversions: 0,
            revenue: 0,
          },
        })
        .select()
        .single()

      if (siteError) throw siteError

      // Rediriger vers l'éditeur de site
      router.push(`/dashboard/sites/${site.id}`)
      onSuccess?.()
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const niches = [
    { id: 'tech', name: 'Technologie' },
    { id: 'fashion', name: 'Mode' },
    { id: 'health', name: 'Santé & Bien-être' },
    { id: 'finance', name: 'Finance' },
    { id: 'travel', name: 'Voyage' },
    { id: 'food', name: 'Cuisine & Alimentation' },
    { id: 'sports', name: 'Sports & Fitness' },
    { id: 'education', name: 'Éducation' },
    { id: 'lifestyle', name: 'Style de vie' },
    { id: 'business', name: 'Business' },
  ]

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium" htmlFor="name">
            Nom du site
          </label>
          <input
            id="name"
            type="text"
            disabled={isLoading}
            {...form.register('name')}
            className="w-full mt-1 px-3 py-2 border rounded-md"
            placeholder="Mon site d'affiliation"
          />
          {form.formState.errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="templateId">
            Template
          </label>
          <select
            id="templateId"
            disabled={isLoading}
            {...form.register('templateId')}
            className="w-full mt-1 px-3 py-2 border rounded-md"
          >
            <option value="">Sélectionner un template</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name} ({template.category})
              </option>
            ))}
          </select>
          {form.formState.errors.templateId && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.templateId.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="domain.name">
            Nom de domaine
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              id="domain.name"
              type="text"
              disabled={isLoading}
              {...form.register('domain.name')}
              className="flex-1 rounded-l-md border px-3 py-2"
              placeholder="mon-site"
            />
            <span className="inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 bg-gray-50 text-gray-500">
              .affiliate-builder.com
            </span>
          </div>
          {form.formState.errors.domain?.name && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.domain.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="domain.customDomain">
            Domaine personnalisé (optionnel)
          </label>
          <input
            id="domain.customDomain"
            type="text"
            disabled={isLoading}
            {...form.register('domain.customDomain')}
            className="w-full mt-1 px-3 py-2 border rounded-md"
            placeholder="www.mon-domaine.com"
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="niche">
            Niche
          </label>
          <select
            id="niche"
            disabled={isLoading}
            {...form.register('niche')}
            className="w-full mt-1 px-3 py-2 border rounded-md"
          >
            <option value="">Sélectionner une niche</option>
            {niches.map((niche) => (
              <option key={niche.id} value={niche.id}>
                {niche.name}
              </option>
            ))}
          </select>
          {form.formState.errors.niche && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.niche.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="description">
            Description (optionnel)
          </label>
          <textarea
            id="description"
            disabled={isLoading}
            {...form.register('description')}
            className="w-full mt-1 px-3 py-2 border rounded-md"
            rows={3}
            placeholder="Description de votre site..."
          />
        </div>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {isLoading ? "Création en cours..." : "Créer le site"}
      </button>
    </form>
  )
}
