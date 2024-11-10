import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Walenciaga API",
      version: "1.0.0",
      description: "The Walenciaga API documentation",
    },
  },
  apis: ["./routes/apis/*.js"],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
