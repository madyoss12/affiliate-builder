export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string
          created_at: string
          last_login: string
          status: 'active' | 'inactive' | 'suspended'
          company_name: string | null
          website: string | null
          industry: string | null
          preferred_niches: string[]
          preferred_templates: string[]
          default_settings: {
            language: string
            timezone: string
            currency: string
            email_notifications: {
              site_updates: boolean
              performance_alerts: boolean
              newsletter_subscription: boolean
            }
          }
          subscription: {
            plan: 'free' | 'starter' | 'pro' | 'enterprise'
            start_date: string
            end_date: string
            auto_renew: boolean
            payment_method: {
              type: string
              last_four: string
              expiry_date: string
            }
          }
          quotas: {
            max_sites: number
            max_storage: number
            remaining_credits: number
          }
          performance_metrics: {
            total_revenue: number
            total_commissions: number
            average_conversion_rate: number
          }
        }
        Insert: {
          id?: string
          email: string
          username: string
          created_at?: string
          last_login?: string
          status?: 'active' | 'inactive' | 'suspended'
          company_name?: string | null
          website?: string | null
          industry?: string | null
          preferred_niches?: string[]
          preferred_templates?: string[]
          default_settings?: {
            language: string
            timezone: string
            currency: string
            email_notifications: {
              site_updates: boolean
              performance_alerts: boolean
              newsletter_subscription: boolean
            }
          }
          subscription?: {
            plan: 'free' | 'starter' | 'pro' | 'enterprise'
            start_date: string
            end_date: string
            auto_renew: boolean
            payment_method: {
              type: string
              last_four: string
              expiry_date: string
            }
          }
          quotas?: {
            max_sites: number
            max_storage: number
            remaining_credits: number
          }
          performance_metrics?: {
            total_revenue: number
            total_commissions: number
            average_conversion_rate: number
          }
        }
        Update: {
          id?: string
          email?: string
          username?: string
          created_at?: string
          last_login?: string
          status?: 'active' | 'inactive' | 'suspended'
          company_name?: string | null
          website?: string | null
          industry?: string | null
          preferred_niches?: string[]
          preferred_templates?: string[]
          default_settings?: {
            language: string
            timezone: string
            currency: string
            email_notifications: {
              site_updates: boolean
              performance_alerts: boolean
              newsletter_subscription: boolean
            }
          }
          subscription?: {
            plan: 'free' | 'starter' | 'pro' | 'enterprise'
            start_date: string
            end_date: string
            auto_renew: boolean
            payment_method: {
              type: string
              last_four: string
              expiry_date: string
            }
          }
          quotas?: {
            max_sites: number
            max_storage: number
            remaining_credits: number
          }
          performance_metrics?: {
            total_revenue: number
            total_commissions: number
            average_conversion_rate: number
          }
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
