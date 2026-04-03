const app = require('./app');
app.listen(3000, '0.0.0.0', (err) => {
  if (err) {
    console.error('Failed to start server:', err);
  } else {
    console.log('Server running on http://localhost:3000');
  }
});
