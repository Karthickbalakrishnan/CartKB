const db = require('../db')

module.exports = async function (fastify, opts) {
  // create order
  fastify.post('/', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const { store_id, items, total_amount } = request.body
    const userId = request.user.userId
    const res = await db.query('INSERT INTO orders(user_id,store_id,total_amount,payload,status) VALUES($1,$2,$3,$4,$5) RETURNING *', [userId,store_id,total_amount, JSON.stringify({ items }), 'created'])
    return res.rows[0]
  })

  // get user orders
  fastify.get('/my', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const userId = request.user.userId
    const res = await db.query('SELECT * FROM orders WHERE user_id=$1 ORDER BY created_at DESC', [userId])
    return { items: res.rows }
  })
}
