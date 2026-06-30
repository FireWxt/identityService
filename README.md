# Identity Service

Microservice de consultation des utilisateurs. Expose une liste d'utilisateurs en mémoire et permet de vérifier l'existence d'un utilisateur (utilisé par le `bookingService` pour orchestrer une réservation).

## Démarrage

```bash
npm install
cp .env.example .env
npm run dev   # ou npm start
```

Le service écoute sur le port **3000**.

## Configuration

| Variable | Description | Défaut |
| --- | --- | --- |
| `HOST_TOKEN` | Jeton partagé requis pour authentifier les appels inter-services | `tp-secret-host-token` |

## Authentification

Toutes les routes (hors `/` et `/api-docs`) nécessitent l'en-tête `X-Host-Token` correspondant à `HOST_TOKEN`. Une réponse `401` est renvoyée si le jeton est manquant ou invalide.

## Routes

| Méthode | Route | Description |
| --- | --- | --- |
| GET | `/users` | Liste tous les utilisateurs |
| GET | `/users/:id` | Récupère un utilisateur par id (`400` si id invalide, `404` si introuvable) |
| GET | `/users/:id/exists` | Indique si un utilisateur existe (`{ exists: boolean }`) |

## Documentation API

La documentation Swagger est disponible sur `/api-docs` une fois le service démarré.
