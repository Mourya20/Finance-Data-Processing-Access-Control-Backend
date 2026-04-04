require('dotenv').config();
const express = require('express');
const rateLimit = require('./src/middleware/rateLimit');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const app = express();

app.use(express.json());
app.use(rateLimit);

//LOGGER 
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// SWAGGER 
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Backend API",
      version: "1.0.0",
      description: "Finance Management System with RBAC"
    },
    servers: [
      {
        url: "https://finance-data-processing-access-control-lxp4.onrender.com"
      }
    ],

    // AUTH BUTTON
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer"
        }
      }
    },

    paths: {

      // AUTH (NO SECURITY)
      "/auth/register": {
        post: {
          summary: "Register new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: { type: "string", example: "user@test.com" },
                    password: { type: "string", example: "123456" },
                    role: { type: "string", example: "ADMIN" }
                  }
                }
              }
            }
          },
          responses: { 201: { description: "User created" } }
        }
      },

      "/auth/login": {
        post: {
          summary: "Login user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: { type: "string", example: "user@test.com" },
                    password: { type: "string", example: "123456" }
                  }
                }
              }
            }
          },
          responses: { 200: { description: "JWT token returned" } }
        }
      },

      // RECORDS (PROTECTED)
      "/records": {
        get: {
          security: [{ bearerAuth: [] }],
          summary: "Get all records",
          responses: { 200: { description: "Records list" } }
        },
        post: {
          security: [{ bearerAuth: [] }],
          summary: "Create record (Admin only)",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    amount: { type: "number", example: 1000 },
                    type: { type: "string", example: "EXPENSE" },
                    category: { type: "string", example: "Food" }
                  }
                }
              }
            }
          },
          responses: { 201: { description: "Record created" } }
        }
      },

      "/records/{id}": {
        put: {
          security: [{ bearerAuth: [] }],
          summary: "Update record",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" }
            }
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    amount: { type: "number", example: 1200 },
                    category: { type: "string", example: "Travel" }
                  }
                }
              }
            }
          },
          responses: { 200: { description: "Updated" } }
        },
        delete: {
          security: [{ bearerAuth: [] }],
          summary: "Delete record",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" }
            }
          ],
          responses: { 200: { description: "Deleted" } }
        }
      },

      // DASHBOARD (PROTECTED)
      "/dashboard/summary": {
        get: {
          security: [{ bearerAuth: [] }],
          summary: "Get financial summary",
          responses: { 200: { description: "Summary data" } }
        }
      },

      "/dashboard/recent": {
        get: {
          security: [{ bearerAuth: [] }],
          summary: "Get recent transactions",
          responses: { 200: { description: "Recent data" } }
        }
      },

      "/dashboard/category": {
        get: {
          security: [{ bearerAuth: [] }],
          summary: "Category totals",
          responses: { 200: { description: "Category data" } }
        }
      },

      "/dashboard/category-breakdown": {
        get: {
          security: [{ bearerAuth: [] }],
          summary: "Expense breakdown",
          responses: { 200: { description: "Breakdown data" } }
        }
      },

      "/dashboard/finance/monthly": {
        get: {
          security: [{ bearerAuth: [] }],
          summary: "Monthly analytics",
          responses: { 200: { description: "Monthly finance" } }
        }
      },

      "/dashboard/finance/quarterly": {
        get: {
          security: [{ bearerAuth: [] }],
          summary: "Quarterly analytics",
          responses: { 200: { description: "Quarterly finance" } }
        }
      },

      "/dashboard/finance/yearly": {
        get: {
          security: [{ bearerAuth: [] }],
          summary: "Yearly analytics",
          responses: { 200: { description: "Yearly finance" } }
        }
      },

      // BUDGET (PROTECTED)
      "/budget": {
        post: {
          security: [{ bearerAuth: [] }],
          summary: "Set budget",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    category: { type: "string", example: "Food" },
                    limit: { type: "number", example: 5000 }
                  }
                }
              }
            }
          },
          responses: { 201: { description: "Budget created" } }
        }
      },

      "/budget/check": {
        get: {
          security: [{ bearerAuth: [] }],
          summary: "Check budget vs spending",
          responses: { 200: { description: "Budget analysis" } }
        }
      }

    }
  },
  apis: []
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROUTES
app.use('/auth', require('./src/routes/auth.routes'));
app.use('/records', require('./src/routes/record.routes'));
app.use('/dashboard', require('./src/routes/dashboard.routes'));
app.use('/budget', require('./src/routes/budget.routes'));

//ROOT
app.get('/', (req, res) => {
  res.send("API Running");
});

//404 HANDLER
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

//ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

module.exports = app;