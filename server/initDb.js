const db = require('./db')

async function init(){
  console.log('Initializing DB tables...')

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT,
      created_at TIMESTAMP DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS stores (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      address TEXT,
      city TEXT,
      meta JSONB DEFAULT '{}'::jsonb
    );

    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      gtin TEXT,
      sku TEXT UNIQUE,
      name TEXT NOT NULL,
      dept TEXT,
      image TEXT,
      meta JSONB DEFAULT '{}'::jsonb
    );

    CREATE TABLE IF NOT EXISTS variants (
      id SERIAL PRIMARY KEY,
      product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
      label TEXT,
      price NUMERIC(10,2)
    );

    CREATE TABLE IF NOT EXISTS inventory (
      id SERIAL PRIMARY KEY,
      store_id INTEGER REFERENCES stores(id) ON DELETE CASCADE,
      product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
      variant_id INTEGER REFERENCES variants(id) ON DELETE SET NULL,
      stock_status TEXT,
      quantity INTEGER DEFAULT 0,
      updated_at TIMESTAMP DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS price_history (
      id SERIAL PRIMARY KEY,
      store_id INTEGER REFERENCES stores(id),
      product_id INTEGER REFERENCES products(id),
      variant_id INTEGER REFERENCES variants(id),
      price NUMERIC(10,2),
      recorded_at TIMESTAMP DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      store_id INTEGER REFERENCES stores(id),
      total_amount NUMERIC(12,2),
      status TEXT DEFAULT 'created',
      payload JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMP DEFAULT now()
    );
  `)

  console.log('Done')
  process.exit(0)
}

init().catch(err=>{console.error(err); process.exit(1)})
