'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Layout, Home, Globe, Box, BarChart2, Settings, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface DashboardLayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Sites', href: '/dashboard/sites', icon: Globe },
  { name: 'Produits', href: '/dashboard/products', icon: Box },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { name: 'Paramètres', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const { signOut } = useAuth()

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="h-16 flex items-center px-6">
          <Layout className="w-6 h-6 mr-2" />
          <span className="font-semibold">Affiliate Builder</span>
        </div>
        
        <nav className="px-4 py-4">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-2 py-2 text-sm rounded-lg mb-1 ${
                  pathname === item.href
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
          
          <button
            onClick={() => signOut()}
            className="flex items-center px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg w-full mt-4"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Déconnexion
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
