require('dotenv').config()
const fastify = require('fastify')({ logger: true })
const fastifyCors = require('fastify-cors')
const fastifyJwt = require('fastify-jwt')
const routesAuth = require('./routes/auth')
const routesProducts = require('./routes/products')
const routesStores = require('./routes/stores')
const routesInventory = require('./routes/inventory')
const routesOrders = require('./routes/orders')

const PORT = process.env.PORT || 3000
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

fastify.register(fastifyCors, { origin: true })
fastify.register(fastifyJwt, { secret: JWT_SECRET })

// register routes
fastify.register(routesAuth, { prefix: '/api/auth' })
fastify.register(routesProducts, { prefix: '/api/products' })
fastify.register(routesStores, { prefix: '/api/stores' })
fastify.register(routesInventory, { prefix: '/api/inventory' })
fastify.register(routesOrders, { prefix: '/api/orders' })

fastify.decorate('authenticate', async function(request, reply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
})

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' })
    fastify.log.info(`Server listening on ${PORT}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
