import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { createClient } from '../../lib/supabase/client'

export const metadata: Metadata = {
  title: 'Dashboard - Affiliate Builder',
  description: 'Tableau de bord de votre compte Affiliate Builder',
}

export default async function DashboardPage() {
  const stats = [
    {
      name: 'Sites Actifs',
      value: '3',
      change: '+12%',
      changeType: 'positive',
    },
    {
      name: 'Visiteurs',
      value: '2,132',
      change: '+18.2%',
      changeType: 'positive',
    },
    {
      name: 'Conversions',
      value: '48',
      change: '+7%',
      changeType: 'positive',
    },
    {
      name: 'Revenus',
      value: '€2,845',
      change: '+10.3%',
      changeType: 'positive',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Tableau de bord</h2>
        <p className="text-muted-foreground">
          Bienvenue sur votre tableau de bord Affiliate Builder
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div
                className={`text-sm font-medium ${
                  stat.changeType === 'positive'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {stat.change}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Sites */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Sites Récents</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Site cards will go here */}
          <Card className="p-6">
            <div className="space-y-2">
              <h4 className="font-medium">Tech Reviews</h4>
              <p className="text-sm text-muted-foreground">
                Site de critiques technologiques
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-green-600">En ligne</span>
                <span>1.2k visiteurs</span>
                <span>32 conversions</span>
              </div>
            </div>
          </Card>
          {/* Add more site cards as needed */}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Activité Récente</h3>
        <Card className="divide-y">
          {/* Activity items will go here */}
          <div className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Nouveau site créé : Tech Reviews
                </p>
                <p className="text-sm text-muted-foreground">
                  Il y a 2 heures
                </p>
              </div>
            </div>
          </div>
          {/* Add more activity items as needed */}
        </Card>
      </div>
    </div>
  )
}
