#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function setup() {
  console.log('\n🚀 Configuration de Affiliate Builder\n');

  // 1. Vérification des prérequis
  console.log('📋 Vérification des prérequis...');
  try {
    execSync('node --version');
    execSync('npm --version');
    execSync('git --version');
    console.log('✅ Tous les prérequis sont installés\n');
  } catch (error) {
    console.error('❌ Certains prérequis sont manquants. Veuillez installer Node.js, npm et Git.');
    process.exit(1);
  }

  // 2. Installation des dépendances
  console.log('📦 Installation des dépendances...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dépendances installées\n');
  } catch (error) {
    console.error('❌ Erreur lors de l\'installation des dépendances');
    process.exit(1);
  }

  // 3. Configuration de l'environnement
  console.log('🔧 Configuration de l\'environnement...');
  const envExample = fs.readFileSync('.env.example', 'utf8');
  const envVars = {};

  // Supabase
  envVars.NEXT_PUBLIC_SUPABASE_URL = await askQuestion('URL Supabase : ');
  envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY = await askQuestion('Clé anonyme Supabase : ');

  // Site
  envVars.NEXT_PUBLIC_SITE_URL = await askQuestion('URL du site (http://localhost:3000) : ') || 'http://localhost:3000';
  envVars.NEXT_PUBLIC_APP_NAME = await askQuestion('Nom de l\'application (Affiliate Builder) : ') || 'Affiliate Builder';

  // Création du fichier .env
  let envContent = envExample;
  Object.entries(envVars).forEach(([key, value]) => {
    envContent = envContent.replace(`${key}=`, `${key}=${value}`);
  });

  fs.writeFileSync('.env', envContent);
  fs.writeFileSync('.env.local', envContent);
  console.log('✅ Fichiers .env créés\n');

  // 4. Initialisation de la base de données
  console.log('🗄️ Initialisation de la base de données...');
  console.log('Veuillez exécuter le fichier SQL dans votre projet Supabase :\n');
  console.log('supabase/migrations/01_initial_schema.sql\n');

  // 5. Configuration de Vercel
  console.log('🌐 Configuration de Vercel...');
  console.log(`
Instructions pour Vercel :
1. Allez sur vercel.com
2. Importez votre projet GitHub
3. Configurez les variables d'environnement
4. Déployez !
  `);

  // 6. Fin
  console.log(`
🎉 Configuration terminée !

Prochaines étapes :
1. Lancez le serveur de développement : npm run dev
2. Ouvrez http://localhost:3000
3. Commencez à développer !

Documentation : /docs
  `);

  rl.close();
}

setup().catch(console.error);
