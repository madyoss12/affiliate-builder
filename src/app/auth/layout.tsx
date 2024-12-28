interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-indigo-600" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img 
              src="/logo.svg" 
              alt="Logo" 
              className="h-8 w-auto mr-2"
            />
            Affiliate Builder
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "Créez des sites d'affiliation performants en quelques clics. 
                Générez du contenu optimisé et suivez vos performances en temps réel."
              </p>
              <footer className="text-sm">Sofia Martinez</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
