const request = require('supertest');
const app = require('../src/app');

let token;
let email;

test('Register viewer user', async () => {
  email = `viewer${Date.now()}@test.com`;

  const res = await request(app).post('/auth/register').send({
    email,
    password: "123456",
    role: "VIEWER"
  });

  expect(res.statusCode).toBe(201);
});

test('Login viewer user', async () => {
  const res = await request(app).post('/auth/login').send({
    email,
    password: "123456"
  });

  console.log(res.body); 

  token = res.body.data.token;
});

test('Viewer should NOT create record', async () => {
  console.log("TOKEN:", token);

  const res = await request(app)
  .post('/records')
  .set({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  })
  .send({
    amount: 1000,
    type: "EXPENSE",
    category: "Food"
  });

  console.log("STATUS:", res.statusCode);

  expect(res.statusCode).toBe(403);
});