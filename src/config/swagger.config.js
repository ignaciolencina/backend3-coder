import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pet Adoption API",
      version: "1.0.0",
      description: "API de adopción de mascotas con Node.js, Express y MongoDB",
      contact: {
        name: "Ignacio Lencina",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 8080}`,
        description: "Servidor de desarrollo",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["first_name", "last_name", "email", "password"],
          properties: {
            _id: {
              type: "string",
              description: "ID único del usuario generado por MongoDB",
              example: "64f8a1b2c3d4e5f6789012ab",
            },
            first_name: {
              type: "string",
              description: "Nombre del usuario",
              example: "Juan",
            },
            last_name: {
              type: "string",
              description: "Apellido del usuario",
              example: "Pérez",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email único del usuario",
              example: "juan.perez@email.com",
            },
            password: {
              type: "string",
              description: "Contraseña hasheada del usuario",
              example: "$2b$10$...",
            },
            role: {
              type: "string",
              enum: ["user", "admin"],
              default: "user",
              description: "Rol del usuario en el sistema",
              example: "user",
            },
            pets: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                    description: "ID de la mascota adoptada",
                  },
                },
              },
              description: "Array de mascotas adoptadas por el usuario",
              example: [],
            },
          },
        },
        UserInput: {
          type: "object",
          required: ["first_name", "last_name", "email"],
          properties: {
            first_name: {
              type: "string",
              description: "Nombre del usuario",
              example: "Juan",
            },
            last_name: {
              type: "string",
              description: "Apellido del usuario",
              example: "Pérez",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email del usuario",
              example: "juan.perez@email.com",
            },
            role: {
              type: "string",
              enum: ["user", "admin"],
              description: "Rol del usuario",
              example: "user",
            },
          },
        },
        UserResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "success",
            },
            payload: {
              oneOf: [
                { $ref: "#/components/schemas/User" },
                {
                  type: "array",
                  items: { $ref: "#/components/schemas/User" },
                },
              ],
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "error",
            },
            error: {
              type: "string",
              example: "Error message",
            },
          },
        },
        SuccessMessage: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "success",
            },
            message: {
              type: "string",
              example: "Operation completed successfully",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJSDoc(options);

export { specs, swaggerUi };
