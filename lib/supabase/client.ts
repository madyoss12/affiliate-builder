import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const createClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          avatar_url: string | null
          subscription_tier: string
          subscription_status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string | null
          avatar_url?: string | null
          subscription_tier?: string
          subscription_status?: string
        }
        Update: {
          name?: string | null
          avatar_url?: string | null
          subscription_tier?: string
          subscription_status?: string
        }
      }
      sites: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          domain: {
            name: string
            customDomain: string | null
          }
          template: string
          settings: Record<string, any>
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          name: string
          description?: string | null
          domain: {
            name: string
            customDomain?: string | null
          }
          template: string
          settings?: Record<string, any>
          status?: string
        }
        Update: {
          name?: string
          description?: string | null
          domain?: {
            name?: string
            customDomain?: string | null
          }
          template?: string
          settings?: Record<string, any>
          status?: string
        }
      }
      pages: {
        Row: {
          id: string
          site_id: string
          title: string
          slug: string
          content: Record<string, any>
          meta: Record<string, any>
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          site_id: string
          title: string
          slug: string
          content: Record<string, any>
          meta?: Record<string, any>
          status?: string
        }
        Update: {
          title?: string
          slug?: string
          content?: Record<string, any>
          meta?: Record<string, any>
          status?: string
        }
      }
      statistics: {
        Row: {
          id: string
          site_id: string
          date: string
          visitors: number
          pageviews: number
          conversions: number
          revenue: number
          data: Record<string, any>
          created_at: string
        }
        Insert: {
          site_id: string
          date: string
          visitors?: number
          pageviews?: number
          conversions?: number
          revenue?: number
          data?: Record<string, any>
        }
        Update: {
          visitors?: number
          pageviews?: number
          conversions?: number
          revenue?: number
          data?: Record<string, any>
        }
      }
    }
  }
}
