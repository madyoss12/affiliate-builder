import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createClient } from '@/lib/supabase/client'

const profileSchema = z.object({
  username: z.string().min(3, {
    message: "Le nom d'utilisateur doit contenir au moins 3 caractères.",
  }),
  companyName: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  industry: z.string().optional(),
  defaultSettings: z.object({
    language: z.string(),
    timezone: z.string(),
    currency: z.string(),
    emailNotifications: z.object({
      siteUpdates: z.boolean(),
      performanceAlerts: z.boolean(),
      newsletterSubscription: z.boolean(),
    }),
  }),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export function UserProfile({ user }: { user: any }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || '',
      companyName: user?.company_name || '',
      website: user?.website || '',
      industry: user?.industry || '',
      defaultSettings: user?.default_settings || {
        language: 'fr',
        timezone: 'Europe/Paris',
        currency: 'EUR',
        emailNotifications: {
          siteUpdates: true,
          performanceAlerts: true,
          newsletterSubscription: true,
        },
      },
    },
  })

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('users')
        .update({
          username: data.username,
          company_name: data.companyName,
          website: data.website,
          industry: data.industry,
          default_settings: data.defaultSettings,
        })
        .eq('id', user.id)

      if (error) throw error

      setSuccess('Profil mis à jour avec succès')
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium" htmlFor="username">
            Nom d'utilisateur
          </label>
          <input
            id="username"
            type="text"
            disabled={isLoading}
            {...form.register('username')}
            className="w-full mt-1 px-3 py-2 border rounded-md"
          />
          {form.formState.errors.username && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="companyName">
            Nom de l'entreprise
          </label>
          <input
            id="companyName"
            type="text"
            disabled={isLoading}
            {...form.register('companyName')}
            className="w-full mt-1 px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="website">
            Site web
          </label>
          <input
            id="website"
            type="url"
            disabled={isLoading}
            {...form.register('website')}
            className="w-full mt-1 px-3 py-2 border rounded-md"
          />
          {form.formState.errors.website && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.website.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="industry">
            Secteur d'activité
          </label>
          <select
            id="industry"
            disabled={isLoading}
            {...form.register('industry')}
            className="w-full mt-1 px-3 py-2 border rounded-md"
          >
            <option value="">Sélectionnez un secteur</option>
            <option value="tech">Technologie</option>
            <option value="ecommerce">E-commerce</option>
            <option value="finance">Finance</option>
            <option value="health">Santé & Bien-être</option>
            <option value="education">Éducation</option>
            <option value="other">Autre</option>
          </select>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Préférences</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium" htmlFor="language">
                Langue
              </label>
              <select
                id="language"
                disabled={isLoading}
                {...form.register('defaultSettings.language')}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="currency">
                Devise
              </label>
              <select
                id="currency"
                disabled={isLoading}
                {...form.register('defaultSettings.currency')}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Notifications par email</h4>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                disabled={isLoading}
                {...form.register('defaultSettings.emailNotifications.siteUpdates')}
                className="rounded"
              />
              <span className="text-sm">Mises à jour des sites</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                disabled={isLoading}
                {...form.register('defaultSettings.emailNotifications.performanceAlerts')}
                className="rounded"
              />
              <span className="text-sm">Alertes de performance</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                disabled={isLoading}
                {...form.register('defaultSettings.emailNotifications.newsletterSubscription')}
                className="rounded"
              />
              <span className="text-sm">Newsletter</span>
            </label>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 text-sm text-green-500 bg-green-50 rounded-md">
          {success}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {isLoading ? "Mise à jour..." : "Mettre à jour le profil"}
      </button>
    </form>
  )
}
