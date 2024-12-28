# Guide de Déploiement

Ce guide explique comment déployer l'application Affiliate Builder en production.

## Prérequis

1. Compte Vercel
2. Compte Supabase
3. Compte GitHub

## Configuration de l'Environnement

### 1. Variables d'Environnement

Configurez les variables suivantes dans Vercel :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

### 2. Base de Données

1. Créez un nouveau projet Supabase
2. Exécutez les migrations :
   ```sql
   -- Create users table extensions
   create extension if not exists "uuid-ossp";
   
   -- Create sites table
   create table sites (
     id uuid default uuid_generate_v4() primary key,
     user_id uuid references auth.users not null,
     name text not null,
     domain jsonb not null,
     template text not null,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Create statistics table
   create table statistics (
     id uuid default uuid_generate_v4() primary key,
     site_id uuid references sites on delete cascade not null,
     date date not null,
     visitors integer default 0,
     pageviews integer default 0,
     conversions integer default 0,
     revenue numeric(10,2) default 0.00,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );
   ```

## Déploiement

### 1. Configuration de Vercel

1. Connectez-vous à Vercel
2. Importez votre projet depuis GitHub
3. Configurez les variables d'environnement
4. Déployez !

### 2. Configuration du Domaine

1. Ajoutez votre domaine dans Vercel
2. Configurez les enregistrements DNS :
   ```
   A     @     76.76.21.21
   CNAME  www   cname.vercel-dns.com
   ```

### 3. Configuration SSL

Le SSL est automatiquement géré par Vercel.

## Surveillance

### 1. Logs

Accédez aux logs via :
- Vercel Dashboard > Votre Projet > Deployments > Logs

### 2. Métriques

Surveillez les performances via :
- Vercel Analytics
- Supabase Dashboard

## Sauvegardes

### 1. Base de Données

Configurez des sauvegardes automatiques dans Supabase :
1. Dashboard > Project Settings > Database
2. Activez "Point-in-time Recovery"

### 2. Contenu

Les fichiers sont stockés dans Supabase Storage avec réplication.

## Mise à l'Échelle

### 1. Vercel

- Mise à l'échelle automatique
- Pas de configuration nécessaire

### 2. Supabase

Pour augmenter les limites :
1. Dashboard > Project Settings > Subscription
2. Choisissez un plan adapté

## Sécurité

### 1. Headers

Vérifiez la présence des headers de sécurité :
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

### 2. Rate Limiting

Configurez le rate limiting dans l'API :
```typescript
import rateLimit from 'express-rate-limit'

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite par IP
})
```

## Maintenance

### 1. Mises à Jour

1. Testez en staging
2. Déployez via GitHub
3. Vérifiez les logs

### 2. Rollback

Pour revenir en arrière :
1. Vercel Dashboard > Deployments
2. Trouvez le déploiement précédent
3. Cliquez sur "Promote to Production"

## Support

### 1. Monitoring

Utilisez :
- Vercel Analytics
- Sentry pour les erreurs
- Uptime Robot pour la disponibilité

### 2. Alertes

Configurez des alertes pour :
- Erreurs 5xx
- Temps de réponse élevé
- Utilisation CPU/Mémoire
