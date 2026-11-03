import React from 'react'
import { useApp } from '../context/AppContext'
import { COLLECTIONS } from '../data/catalog'

export default function HomeSearch(){
  const { catalog, addItemToList } = useApp()
  const [query, setQuery] = React.useState('')
  const [category, setCategory] = React.useState('All')

  const filtered = catalog.filter(item => {
    const matchCategory = category === 'All' || item.category === category || item.collections.includes(category)
    const q = query.trim().toLowerCase()
    const matchQuery = !q || item.name.toLowerCase().includes(q) || item.dept.toLowerCase().includes(q) || item.collections.some(tag => tag.toLowerCase().includes(q))
    return matchCategory && matchQuery
  }).slice(0, 40)

  return (
    <section className="p-4 space-y-3.5">
      <div className="flex justify-between items-center">
        <div>
          <span className="bg-blue-100 text-walmart-blue text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full">Pre-Ride Check</span>
          <h2 className="text-base font-black text-walmart-navy mt-1">Search & Compare Prices</h2>
        </div>
        <span className="text-xs font-bold text-walmart-blue">{catalog.length.toLocaleString()} products</span>
      </div>

      <div className="relative">
        <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search products or offers…" className="w-full pl-9 pr-4 py-2.5 bg-white border-2 border-walmart-blue rounded-2xl text-xs font-bold text-walmart-navy focus:outline-none" />
        <i className="fa-solid fa-magnifying-glass absolute left-3 top-3.5 text-walmart-blue text-xs" aria-hidden="true" />
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs" aria-label="Product categories">
        {['All', ...COLLECTIONS].map(itemCategory => (
          <button key={itemCategory} onClick={() => setCategory(itemCategory)} aria-pressed={category === itemCategory} className={`px-3 py-1 rounded-full font-bold shrink-0 ${category === itemCategory ? 'bg-walmart-blue text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
            {itemCategory}
          </button>
        ))}
      </div>

      <p className="text-[10px] text-gray-500">Showing {filtered.length} of {catalog.length.toLocaleString()} products{category !== 'All' ? ` in ${category}` : ''}</p>
      <div className="space-y-3">
        {filtered.map(item => (
          <div key={item.id} className="bg-white rounded-3xl p-3.5 border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-start space-x-3">
              <img src={item.image} alt="" className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-gray-200" />
              <div className="flex-1">
                <div className="flex justify-between items-start gap-2">
                  <div><h4 className="font-extrabold text-xs text-walmart-navy">{item.name}</h4><p className="text-[10px] text-gray-500">{item.dept} • <span className="text-walmart-green font-bold">In Stock</span></p></div>
                  <span className="text-xs font-black text-walmart-navy">₹{item.variants[0].price}</span>
                </div>
                <p className="text-[10px] text-walmart-blue font-bold mt-1">{item.aisle} • {item.bay}</p>
                <p className="text-[9px] text-gray-400 mt-1">{item.collections.filter(tag => tag !== item.category && tag !== 'Explore').slice(0, 3).join(' • ')}</p>
              </div>
            </div>
            <button onClick={() => addItemToList({ name:item.name, variant:item.variants[0].label, aisle:item.aisle, bay:item.bay, shelf:item.shelf, price:item.variants[0].price, image:item.image })} className="w-full rounded-xl bg-walmart-yellow px-3 py-2 text-xs font-black text-walmart-navy">
              <i className="fa-solid fa-cart-plus mr-1.5" aria-hidden="true" /> Add to cart • ₹{item.variants[0].price}
            </button>
          </div>
        ))}
        {filtered.length === 0 && <div className="rounded-2xl bg-white p-6 text-center text-xs text-gray-500">No products found. Try another search or category.</div>}
      </div>
    </section>
  )
}
