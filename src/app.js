require('dotenv').config();
const express = require('express');
const rateLimit = require('./middleware/rateLimit');

const app = express();

app.use(express.json());
app.use(rateLimit);

// routes
app.use('/auth', require('./routes/auth.routes'));
app.use('/records', require('./routes/record.routes'));
app.use('/dashboard', require('./routes/dashboard.routes'));
app.use('/budget', require('./routes/budget.routes'));

// logger 
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

// health route
app.get('/', (req, res) => {
  res.send("API Running");
});
module.exports = app; 