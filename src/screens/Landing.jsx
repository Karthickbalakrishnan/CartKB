import React from 'react'

const stores = [
  { name: 'Main Street Supercenter', distance: '0.8 km', features:['In Stock 98%','AR Enabled'] },
  { name: 'Saravana Stores Superstore', distance: '1.2 km', features:['In Stock 95%','Best Price'] },
  { name: 'Nilgiris Supermarket', distance: '1.5 km', features:['Low Stock'] }
]

export default function Landing(){
  return (
    <section className="p-4 space-y-4">
      <div className="bg-blue-50 rounded-2xl p-3 flex items-center justify-between">
        <div>
          <div className="font-black">Chennai, TN</div>
          <div className="text-xs text-gray-500">T. Nagar • South Boag Road Corridor</div>
        </div>
        <div className="text-green-600 font-bold text-sm">GPS 100%</div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-black uppercase">Nearby Verified Stores</h3>
          <span className="text-xs font-bold text-walmart-blue">{stores.length} Stores Nearby</span>
        </div>

        <div className="space-y-3">
          {stores.map(s => (
            <div key={s.name} className="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-sm">{s.name}</div>
                  <div className="text-xs text-gray-500">{s.distance} • Open till 10 PM</div>
                </div>
                <div className="text-xs text-right">
                  {s.features.map((f,i) => <div key={i} className="text-[10px]">{f}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="bg-white p-3 rounded-2xl border">Start at Home</button>
        <button className="bg-white p-3 rounded-2xl border">In-Store Now</button>
      </div>

    </section>
  )
}
