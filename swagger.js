/**
 * Configuration de Swagger pour la documentation de l'API
 * Port de Plaisance Russell
 */
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Port de Plaisance Russell",
      version: "1.0.0",
      description: "Documentation de l'API de gestion des catways et réservations du Port de Plaisance Russell",
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Serveur local",
      },
    ],
    components: {
      schemas: {
        Catway: {
          type: "object",
          properties: {
            catwayNumber: { type: "string" },
            catwayType: { type: "string" },
            catwayState: { type: "string" },
          },
        },
        CatwayState: {
          type: "object",
          properties: {
            catwayState: { type: "string" },
          },
        },
        Reservation: {
          type: "object",
          properties: {
            catwayNumber: { type: "string" },
            clientName: { type: "string" },
            boatName: { type: "string" },
            checkIn: { type: "string", format: "date" },
            checkOut: { type: "string", format: "date" },
          },
        },
      },
    },
  },
        User: {
          type: "object",
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
        },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;