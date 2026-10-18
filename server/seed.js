const db = require('./db')

async function seed(){
  console.log('Seeding stores and products...')

  const stores = [
    { name: 'Main Street Supercenter', address: 'South Boag Road, T. Nagar, Chennai', city: 'Chennai' },
    { name: 'Saravana Stores Superstore', address: 'Ranganathan St, Chennai', city: 'Chennai' },
    { name: 'Nilgiris Supermarket', address: 'GN Chetty Rd, Chennai', city: 'Chennai' }
  ]

  for(const s of stores){
    await db.query('INSERT INTO stores(name,address,city) VALUES($1,$2,$3) ON CONFLICT DO NOTHING', [s.name,s.address,s.city])
  }

  const baseCatalog = [
    { name: 'Fresh Toned Milk', dept: 'Dairy', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200', variants: [ ['250ml',18], ['500ml (1/2L)',32], ['1L',60] ] },
    { name: 'Apple Cider Vinegar', dept: 'Kitchen', img: 'https://images.unsplash.com/photo-1598511726623-d7228a7e089d?w=200', variants: [ ['250ml',145], ['500ml',270] ] },
    { name: 'Kadalai Mittai / Peanut Chikki', dept: 'Snacks', img: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200', variants: [ ['250g Box',150], ['500g Box',280] ] },
    { name: 'Moisturizing Bathing Soap 3-Pack', dept: 'Bathroom', img: 'https://images.unsplash.com/photo-1607006411601-775c8cc64f86?w=200', variants: [ ['Standard Pack',85], ['Value Pack',160] ] }
  ]

  // Insert products and variants
  let prodCount = 0
  for(let i=0;i<30;i++){
    for(const t of baseCatalog){
      prodCount++
      const sku = `SKU-${i+1}-${prodCount}`
      const name = `${t.name} #${i+1}`
      const res = await db.query('INSERT INTO products(gtin,sku,name,dept,image) VALUES($1,$2,$3,$4,$5) RETURNING id', [null, sku, name, t.dept, t.img])
      const productId = res.rows[0].id
      for(const v of t.variants){
        const vr = await db.query('INSERT INTO variants(product_id,label,price) VALUES($1,$2,$3) RETURNING id', [productId, v[0], v[1]])
        const variantId = vr.rows[0].id
        // seed inventory for each store
        const storesRes = await db.query('SELECT id FROM stores')
        for(const s of storesRes.rows){
          const qty = Math.floor(Math.random()*50)+1
          const stock = qty>5? 'In Stock': 'Low Stock'
          await db.query('INSERT INTO inventory(store_id,product_id,variant_id,stock_status,quantity) VALUES($1,$2,$3,$4,$5)', [s.id, productId, variantId, stock, qty])
          await db.query('INSERT INTO price_history(store_id,product_id,variant_id,price) VALUES($1,$2,$3,$4)', [s.id, productId, variantId, v[1]])
        }
      }
    }
  }

  console.log('Seeded products')
  process.exit(0)
}

seed().catch(err=>{console.error(err); process.exit(1)})
