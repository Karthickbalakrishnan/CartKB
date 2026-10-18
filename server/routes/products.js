const db = require('../db')

module.exports = async function (fastify, opts) {
  // GET /api/products?q=&dept=&page=&limit=
  fastify.get('/', async (request, reply) => {
    const q = (request.query.q || '').trim()
    const dept = request.query.dept
    const page = Math.max(1, parseInt(request.query.page) || 1)
    const limit = Math.min(200, Math.max(10, parseInt(request.query.limit) || 40))
    const offset = (page-1)*limit

    let where = []
    let params = []
    if(q){ params.push(`%${q.toLowerCase()}%`); where.push(`LOWER(p.name) LIKE $${params.length}`) }
    if(dept){ params.push(dept); where.push(`p.dept = $${params.length}`) }

    const whereSql = where.length? ('WHERE ' + where.join(' AND ')) : ''

    const sql = `SELECT p.id, p.sku, p.name, p.dept, p.image, json_agg(json_build_object('id',v.id,'label',v.label,'price',v.price)) as variants
      FROM products p
      JOIN variants v ON v.product_id = p.id
      ${whereSql}
      GROUP BY p.id
      ORDER BY p.name
      LIMIT ${limit} OFFSET ${offset}`

    const res = await db.query(sql, params)
    return { items: res.rows, page, limit }
  })

  // GET /api/products/:id
  fastify.get('/:id', async (request, reply) => {
    const id = request.params.id
    const res = await db.query('SELECT p.*, json_agg(json_build_object(\'id\',v.id, \'label\',v.label, \'price\',v.price)) as variants FROM products p JOIN variants v ON v.product_id=p.id WHERE p.id=$1 GROUP BY p.id', [id])
    if(!res.rows.length) return reply.code(404).send({ error: 'not found' })
    return res.rows[0]
  })
}
