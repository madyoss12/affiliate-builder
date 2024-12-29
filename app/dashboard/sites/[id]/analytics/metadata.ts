import { Metadata } from 'next'
import { getSite } from '@/lib/supabase/queries'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const site = await getSite(params.id)
  return {
    title: `Analytics ${site?.name || 'Site'} - Affiliate Builder`,
    description: `Statistiques et performances du site ${site?.name || ''}`,
  }
}
