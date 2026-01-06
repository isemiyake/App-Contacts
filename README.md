# 📇 Modern Contacts Manager

Une application web de gestion de contacts robuste, construite en **JavaScript Vanille (ES6+)** avec une architecture orientée objet et une interface **Tailwind CSS**.

## 🌟 Points forts techniques
* **Architecture Orientée Objet** : Utilisation de classes ES6 pour une meilleure maintenabilité (Components, DB Manager).
* **Gestion du DOM Dynamique** : Injection de templates et mise à jour en temps réel sans rechargement de page.
* **Validation de Formulaire Custom** : Logique intégrée pour la vérification des champs vides et la validation du format email.
* **Asynchronisme (Async/Await)** : Gestion fluide des appels API et des opérations CRUD.
* **Responsive UI** : Interface stylisée avec Tailwind CSS et FontAwesome pour une expérience utilisateur moderne.

## 🛠️ Stack Technique
* **Langage** : JavaScript ES6+
* **Tooling** : Vite.js
* **Style** : Tailwind CSS 2.2+ & FontAwesome
* **API** : Intégration REST (MockAPI) avec Fallback local

## 📖 Fonctionnalités implémentées
- [x] Affichage dynamique de la liste des contacts
- [x] Compteur de contacts en temps réel (`renderItemsCount`)
- [x] Ajout de nouveaux contacts avec validation de données
- [x] Suppression de contacts synchronisée avec la base de données
- [x] Reset automatique des formulaires après action