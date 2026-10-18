const bcrypt = require('bcrypt')
const db = require('../db')

module.exports = async function (fastify, opts) {
  fastify.post('/register', async (request, reply) => {
    const { email, password, name } = request.body
    if(!email || !password) return reply.code(400).send({ error: 'email and password required' })
    const hash = await bcrypt.hash(password, 10)
    try{
      const res = await db.query('INSERT INTO users(email,password_hash,name) VALUES($1,$2,$3) RETURNING id,email,name', [email, hash, name || null])
      const user = res.rows[0]
      const token = fastify.jwt.sign({ userId: user.id, email: user.email })
      return { user, token }
    }catch(err){
      request.log.error(err)
      return reply.code(400).send({ error: 'user exists or db error' })
    }
  })

  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body
    if(!email || !password) return reply.code(400).send({ error: 'email and password required' })
    const res = await db.query('SELECT id,email,password_hash,name FROM users WHERE email=$1', [email])
    const user = res.rows[0]
    if(!user) return reply.code(401).send({ error: 'invalid' })
    const ok = await bcrypt.compare(password, user.password_hash)
    if(!ok) return reply.code(401).send({ error: 'invalid' })
    const token = fastify.jwt.sign({ userId: user.id, email: user.email })
    return { user: { id: user.id, email: user.email, name: user.name }, token }
  })
}
