import React from 'react'
import { useApp } from '../context/AppContext'
import { COLLECTIONS } from '../data/catalog'

export default function BrowseCatalog(){
  const { catalog, addItemToList } = useApp()
  const [query, setQuery] = React.useState('')
  const [category, setCategory] = React.useState('All')

  const filtered = catalog.filter(item => {
    const matchCategory = category === 'All' || item.category === category || item.collections.includes(category)
    const q = query.trim().toLowerCase()
    const matchQuery = !q || item.name.toLowerCase().includes(q) || item.dept.toLowerCase().includes(q) || item.collections.some(tag => tag.toLowerCase().includes(q))
    return matchCategory && matchQuery
  }).slice(0, 100)

  return (
    <section className="p-4 space-y-3.5">
      <div>
        <h2 className="text-base font-black text-walmart-navy">Browse Catalog</h2>
        <p className="text-xs text-gray-500">{catalog.length.toLocaleString()} sample products across departments, deals, and seasonal collections.</p>
      </div>
      <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search products, departments, or offers…" className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-2xl text-xs font-bold text-walmart-navy focus:outline-none focus:ring-2 focus:ring-walmart-blue" />
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs" aria-label="Product categories">
        {['All', ...COLLECTIONS].map(itemCategory => (
          <button key={itemCategory} onClick={() => setCategory(itemCategory)} aria-pressed={category === itemCategory} className={`px-3 py-1 rounded-full font-bold shrink-0 ${category === itemCategory ? 'bg-walmart-blue text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>{itemCategory}</button>
        ))}
      </div>
      <p className="text-[10px] text-gray-500">Showing the first {filtered.length} matches • {catalog.length.toLocaleString()} products total</p>
      <div className="space-y-3">
        {filtered.map(item => (
          <div key={item.id} className="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center space-x-3">
              <img src={item.image} className="w-12 h-12 rounded-xl object-cover shrink-0" alt="" />
              <div className="min-w-0"><div className="font-extrabold text-xs break-words">{item.name}</div><div className="text-[10px] text-gray-500">{item.category} • {item.aisle} • {item.bay}</div></div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-black">₹{item.variants[0].price}</div>
              <button onClick={() => addItemToList({ name:item.name, variant:item.variants[0].label, aisle:item.aisle, bay:item.bay, shelf:item.shelf, price:item.variants[0].price, image:item.image })} className="text-[10px] font-bold text-walmart-blue underline">Add to cart</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="rounded-2xl bg-white p-6 text-center text-xs text-gray-500">No products found. Try a different query.</div>}
      </div>
    </section>
  )
}
