import React from 'react'
import { useApp } from '../context/AppContext'

export default function HomeSearch(){
  const { catalog, addItemToList, navigate } = useApp()
  const [query, setQuery] = React.useState('')
  const [category, setCategory] = React.useState('All')

  const filtered = catalog.filter(item=>{
    const matchCat = category==='All' || item.dept===category
    const q = query.trim().toLowerCase()
    const matchQ = !q || item.name.toLowerCase().includes(q) || item.dept.toLowerCase().includes(q)
    return matchCat && matchQ
  }).slice(0,40)

  return (
    <section className="p-4 space-y-3.5">
      <div className="flex justify-between items-center">
        <div>
          <span className="bg-blue-100 text-walmart-blue text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full">Pre-Ride Check</span>
          <h2 className="text-base font-black text-walmart-navy mt-1">Search & Compare Prices</h2>
        </div>
        <span className="text-xs font-bold text-walmart-blue">1000+ Live SKUs</span>
      </div>

      <div className="relative">
        <input value={query} onChange={e=>setQuery(e.target.value)} className="w-full pl-9 pr-24 py-2.5 bg-white border-2 border-walmart-blue rounded-2xl text-xs font-bold text-walmart-navy focus:outline-none shadow-sm" placeholder="Search 1000+ items (Milk, Vinegar, Oil)..." />
        <button onClick={()=>{}} className="absolute right-1.5 top-1.5 bg-walmart-yellow text-walmart-navy font-black text-xs px-3 py-1.5 rounded-xl">Search</button>
      </div>

      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
        {['All','Dairy','Kitchen','Snacks','Bathroom','Hall','Medical','Festival'].map(cat=> (
          <button key={cat} onClick={()=>setCategory(cat)} className={`hcat-btn px-3 py-1 rounded-full font-bold shrink-0 ${category===cat? 'bg-walmart-blue text-white':'bg-white border border-gray-200 text-walmart-navy'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div id="home-search-results" className="space-y-3">
        {filtered.map(item=> (
          <div key={item.id} className="bg-white rounded-3xl p-3.5 border border-gray-200 shadow-sm space-y-3">
            <div className="flex items-start space-x-3">
              <img src={item.image} alt="" className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-gray-200"/>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-xs text-walmart-navy">{item.name}</h4>
                    <p className="text-[10px] text-gray-500">{item.dept} • <span className="text-walmart-green font-bold">In Stock</span></p>
                  </div>
                  <span className="text-xs font-black text-walmart-navy">₹{item.variants[0].price}</span>
                </div>
                <p className="text-[10px] text-walmart-blue font-bold mt-1">{item.aisle} • {item.bay}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500">Size:</span>
              <div className="flex space-x-1 overflow-x-auto no-scrollbar">
                {item.variants.map(v=> (
                  <button key={v.label} onClick={()=>addItemToList({ name: `${item.name} (${v.label})`, variant:v.label, aisle:item.aisle, bay:item.bay, shelf:item.shelf, price:v.price, image:item.image })} className="px-2 py-1 bg-gray-50 hover:bg-walmart-yellow border border-gray-200 rounded-lg text-[10px] font-bold text-walmart-navy shrink-0 transition-all">{v.label} (₹{v.price})</button>
                ))}
              </div>
            </div>

            <button onClick={()=>{}} className="w-full bg-blue-50/80 hover:bg-blue-100/80 text-walmart-blue text-[10px] font-extrabold py-1.5 px-3 rounded-xl">Compare Store Prices</button>
          </div>
        ))}
      </div>
    </section>
  )
}
