require('dotenv').config();
const express = require('express');
const rateLimit = require('./src/middleware/rateLimit');

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();

app.use(express.json());
app.use(rateLimit);

//LOGGER (put BEFORE routes)

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

//SWAGGER 
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
    ]
  },
  apis: [] // optional
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

// 404 HANDLER
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ERROR HANDLER 
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

module.exports = app;