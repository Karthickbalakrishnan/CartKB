const db = require('../db')

module.exports = async function (fastify, opts) {
  fastify.get('/', async (request, reply) => {
    const res = await db.query('SELECT id,name,address,city FROM stores ORDER BY name')
    return { items: res.rows }
  })

  fastify.get('/:id', async (request, reply) => {
    const res = await db.query('SELECT id,name,address,city FROM stores WHERE id=$1', [request.params.id])
    if(!res.rows.length) return reply.code(404).send({ error: 'not found' })
    return res.rows[0]
  })
}
