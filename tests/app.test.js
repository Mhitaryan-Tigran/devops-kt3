const request = require('supertest')
const { Client } = require('pg')
const { route, server } = require('../src/app')

test('GET / returns the app name', () => {
  expect(route('GET', '/')).toMatchObject({ status: 200, body: 'KT4 App' })
})

test('GET /health returns status ok as JSON', async () => {
  const res = await request(server).get('/health')
  expect(res.status).toBe(200)
  expect(res.headers['content-type']).toMatch(/application\/json/)
  expect(res.body).toEqual({ status: 'ok' })
})

test('unknown routes return 404', () => {
  expect(route('GET', '/nope').status).toBe(404)
})

const withDb = process.env.DATABASE_URL ? test : test.skip

withDb('the postgres service container is reachable', async () => {
  const client = new Client({ connectionString: process.env.DATABASE_URL })
  await client.connect()
  const { rows } = await client.query('SELECT version()')
  await client.end()
  expect(rows[0].version).toMatch(/PostgreSQL 16/)
})
