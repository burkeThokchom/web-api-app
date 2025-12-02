import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Enterprise Express API",
      version: "1.0.0",
      description: "Production-ready Express API scaffold with Neo4j, Redis, JWT, OAuth, and modular architecture",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js"], // Path to files with Swagger comments
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;