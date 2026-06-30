export const openapiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Identity Service",
    version: "1.0.0",
    description: "API de consultation des utilisateurs.",
  },
  servers: [{ url: "http://localhost:3000" }],
  security: [{ HostToken: [] }],
  paths: {
    "/users": {
      get: {
        summary: "Lister les utilisateurs",
        tags: ["Users"],
        responses: {
          "200": {
            description: "Liste des utilisateurs",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/User" },
                },
              },
            },
          },
          "401": { description: "Jeton inter-services manquant ou invalide" },
        },
      },
    },
    "/users/{id}": {
      get: {
        summary: "Consulter un utilisateur",
        tags: ["Users"],
        parameters: [{ $ref: "#/components/parameters/UserId" }],
        responses: {
          "200": {
            description: "Utilisateur trouvé",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          "400": { description: "Identifiant invalide" },
          "401": { description: "Jeton inter-services manquant ou invalide" },
          "404": { description: "Utilisateur non trouvé" },
        },
      },
    },
    "/users/{id}/exists": {
      get: {
        summary: "Vérifier l'existence d'un utilisateur",
        tags: ["Users"],
        parameters: [{ $ref: "#/components/parameters/UserId" }],
        responses: {
          "200": {
            description: "Résultat de la vérification",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    exists: { type: "boolean", example: true },
                  },
                  required: ["exists"],
                },
              },
            },
          },
          "400": { description: "Identifiant invalide" },
          "401": { description: "Jeton inter-services manquant ou invalide" },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      HostToken: {
        type: "apiKey",
        in: "header",
        name: "X-Host-Token",
        description: "Jeton partagé entre les microservices",
      },
    },
    parameters: {
      UserId: {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "integer" },
        description: "Identifiant de l'utilisateur",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Alice" },
        },
        required: ["id", "name"],
      },
    },
  },
};
