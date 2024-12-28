# Affiliate Builder 🚀

Une plateforme moderne pour créer et gérer des sites d'affiliation rentables en quelques clics.

## 🌟 Fonctionnalités

- 🎨 **Création de sites simplifiée**
  - Templates optimisés pour la conversion
  - Personnalisation sans code
  - Responsive design

- 📊 **Analytics avancés**
  - Suivi en temps réel
  - Rapports détaillés
  - Insights sur les performances

- 🔧 **Outils d'optimisation**
  - SEO automatisé
  - A/B testing
  - Optimisation des conversions

- 🔄 **Intégrations**
  - Multi-plateformes d'affiliation
  - Supabase pour l'authentification
  - API extensible

## 🚀 Démarrage rapide

```bash
# Cloner le projet
git clone https://github.com/votre-username/affiliate-builder.git

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local

# Lancer le serveur de développement
npm run dev
```

## 🛠️ Technologies utilisées

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase
- **Authentification**: Supabase Auth
- **Base de données**: PostgreSQL (via Supabase)
- **Déploiement**: Vercel

## 📦 Structure du projet

```
affiliate-builder/
├── src/
│   ├── app/                 # Pages Next.js
│   ├── components/          # Composants React
│   ├── lib/                 # Utilitaires et configurations
│   └── types/              # Types TypeScript
├── public/                  # Assets statiques
└── tests/                  # Tests unitaires et d'intégration
```

## 🧪 Tests

```bash
# Lancer les tests unitaires
npm run test

# Lancer les tests avec couverture
npm run test:coverage
```

## 📝 Configuration

### Variables d'environnement requises

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

## 🚀 Déploiement

Le projet est configuré pour un déploiement automatique sur Vercel. Chaque push sur la branche `main` déclenche un nouveau déploiement.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'feat: Add amazing feature'`)
4. Push sur la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📞 Support

- Documentation : [docs.affiliate-builder.com](https://docs.affiliate-builder.com)
- Email : support@affiliate-builder.com
- Issues : [GitHub Issues](https://github.com/votre-username/affiliate-builder/issues)
