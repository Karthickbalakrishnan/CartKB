const db = require('../db')

module.exports = async function (fastify, opts) {
  // GET /api/inventory?product_id=&store_id=
  fastify.get('/', async (request, reply) => {
    const productId = request.query.product_id
    const storeId = request.query.store_id
    const conditions = []
    const params = []
    if(productId){ params.push(productId); conditions.push(`i.product_id = $${params.length}`) }
    if(storeId){ params.push(storeId); conditions.push(`i.store_id = $${params.length}`) }
    const where = conditions.length? ('WHERE ' + conditions.join(' AND ')) : ''

    const sql = `SELECT i.id,i.store_id,i.product_id,i.variant_id,i.stock_status,i.quantity,p.name as product_name,v.label as variant_label FROM inventory i LEFT JOIN products p ON p.id=i.product_id LEFT JOIN variants v ON v.id=i.variant_id ${where}`
    const res = await db.query(sql, params)
    return { items: res.rows }
  })

  // Protected update endpoint
  fastify.post('/', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const { store_id, product_id, variant_id, quantity, stock_status } = request.body
    const res = await db.query('INSERT INTO inventory(store_id,product_id,variant_id,quantity,stock_status) VALUES($1,$2,$3,$4,$5) RETURNING *', [store_id,product_id,variant_id,quantity||0,stock_status||'In Stock'])
    return res.rows[0]
  })
}
