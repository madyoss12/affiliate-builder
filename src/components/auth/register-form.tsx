import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { createClient } from '@/lib/supabase/client'

const formSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  password: z.string().min(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères.",
  }),
  username: z.string().min(3, {
    message: "Le nom d'utilisateur doit contenir au moins 3 caractères.",
  }),
  companyName: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  industry: z.string().optional(),
})

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      companyName: "",
      website: "",
      industry: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)
    
    try {
      const supabase = createClient()
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            username: values.username,
          },
        },
      })

      if (authError) throw authError

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: values.email,
            username: values.username,
            company_name: values.companyName || null,
            website: values.website || null,
            industry: values.industry || null,
            status: 'active',
            created_at: new Date().toISOString(),
            default_settings: {
              language: 'fr',
              timezone: 'Europe/Paris',
              currency: 'EUR',
              email_notifications: {
                site_updates: true,
                performance_alerts: true,
                newsletter_subscription: true,
              },
            },
            subscription: {
              plan: 'free',
              start_date: new Date().toISOString(),
              end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              auto_renew: true,
              payment_method: null,
            },
            quotas: {
              max_sites: 1,
              max_storage: 500 * 1024 * 1024, // 500MB
              remaining_credits: 100,
            },
            performance_metrics: {
              total_revenue: 0,
              total_commissions: 0,
              average_conversion_rate: 0,
            },
          })

        if (profileError) throw profileError
      }

      router.refresh()
      router.push('/dashboard')
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="nom@exemple.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...form.register("email")}
              className="w-full px-3 py-2 border rounded-md"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          
          <div className="grid gap-1">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              id="username"
              type="text"
              disabled={isLoading}
              {...form.register("username")}
              className="w-full px-3 py-2 border rounded-md"
            />
            {form.formState.errors.username && (
              <p className="text-sm text-red-500">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              disabled={isLoading}
              {...form.register("password")}
              className="w-full px-3 py-2 border rounded-md"
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <label htmlFor="companyName">Nom de l'entreprise (optionnel)</label>
            <input
              id="companyName"
              type="text"
              disabled={isLoading}
              {...form.register("companyName")}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="website">Site web (optionnel)</label>
            <input
              id="website"
              type="url"
              placeholder="https://..."
              disabled={isLoading}
              {...form.register("website")}
              className="w-full px-3 py-2 border rounded-md"
            />
            {form.formState.errors.website && (
              <p className="text-sm text-red-500">
                {form.formState.errors.website.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <label htmlFor="industry">Secteur d'activité (optionnel)</label>
            <select
              id="industry"
              disabled={isLoading}
              {...form.register("industry")}
              className="w-full px-3 py-2 border rounded-md"
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
            {isLoading ? "Inscription en cours..." : "S'inscrire"}
          </button>
        </div>
      </form>
    </div>
  )
}
