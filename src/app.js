const http = require('http')

const PORT = process.env.PORT || 3000

function route(method, url) {
  if (method === 'GET' && url === '/') return { status: 200, type: 'text/plain; charset=utf-8', body: 'KT3 App' }
  if (method === 'GET' && url === '/health') return { status: 200, type: 'application/json', body: JSON.stringify({ status: 'ok' }) }
  return { status: 404, type: 'application/json', body: JSON.stringify({ error: 'Not found' }) }
}

const server = http.createServer((req, res) => {
  const { status, type, body } = route(req.method, req.url)
  res.writeHead(status, { 'Content-Type': type })
  res.end(body)
})

if (require.main === module) {
  server.listen(PORT, () => console.log(`KT3 App on port ${PORT}`))
}

module.exports = { route, server }
