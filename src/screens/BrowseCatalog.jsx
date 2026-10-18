import React from 'react'
import { useApp } from '../context/AppContext'

export default function BrowseCatalog(){
  const { catalog, addItemToList } = useApp()
  const [q, setQ] = React.useState('')
  const [category, setCategory] = React.useState('All')

  const filtered = catalog.filter(item=>{
    const matchCat = category==='All' || item.dept===category
    const qq = q.trim().toLowerCase()
    const matchQ = !qq || item.name.toLowerCase().includes(qq)
    return matchCat && matchQ
  }).slice(0,60)

  return (
    <section className="p-4 space-y-3.5">
      <div>
        <h2 className="text-base font-black text-walmart-navy">Browse Catalog (1000+ SKUs)</h2>
        <p className="text-xs text-gray-500">Find items and add them to your list.</p>
      </div>

      <div className="relative">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search 1000+ items..." className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-2xl text-xs font-bold text-walmart-navy" />
      </div>

      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
        {['All','Dairy','Kitchen','Snacks','Bathroom','Hall','Medical','Festival'].map(cat=> (
          <button key={cat} onClick={()=>setCategory(cat)} className={`bcat-btn px-3 py-1 rounded-full font-bold shrink-0 ${category===cat? 'bg-walmart-blue text-white':'bg-white border border-gray-200 text-walmart-navy'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div id="browse-catalog-container" className="space-y-3">
        {filtered.map(item=> (
          <div key={item.id} className="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={item.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
              <div>
                <div className="font-extrabold text-xs">{item.name}</div>
                <div className="text-[10px] text-gray-500">{item.aisle} • {item.bay}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-black">₹{item.variants[0].price}</div>
              <button onClick={()=>addItemToList({ name:item.name, variant:item.variants[0].label, aisle:item.aisle, bay:item.bay, shelf:item.shelf, price:item.variants[0].price, image:item.image })} className="mt-2 bg-walmart-blue text-white text-xs px-3 py-1 rounded-full">Add</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
