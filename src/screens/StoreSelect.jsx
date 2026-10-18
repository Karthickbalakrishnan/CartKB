import React from 'react'
import { useApp } from '../context/AppContext'

export default function StoreSelect(){
  const { navigate, selectStore } = useApp()
  const stores = [
    'Main Street Supercenter', 'Saravana Stores Superstore', 'Nilgiris Supermarket', 'City Fresh Market'
  ]

  return (
    <section className="p-4 space-y-4">
      <div>
        <span className="bg-amber-100 text-amber-800 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full">In-Store Mode</span>
        <h2 className="text-base font-black text-walmart-navy mt-1">Select or Scan Store</h2>
        <p className="text-xs text-gray-500">Choose your store location to calibrate AR navigation.</p>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-sm space-y-3">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Nearby Supermarket</label>
        <select onChange={e=>selectStore(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-2xl text-xs font-extrabold">
          {stores.map(s=> <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div onClick={()=>{ selectStore('Scanned Store - Demo'); navigate('screen-store-mode') }} className="bg-blue-50/60 p-4 rounded-3xl border-2 border-dashed border-walmart-blue flex items-center justify-between cursor-pointer">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-walmart-blue text-white rounded-2xl flex items-center justify-center text-lg font-black">QR</div>
          <div>
            <h4 className="text-xs font-extrabold text-walmart-navy">Scan store entrance QR</h4>
            <p className="text-[10px] text-gray-500">Auto-detects your aisle location instantly</p>
          </div>
        </div>
        <i className="fa-solid fa-camera text-walmart-blue text-base" />
      </div>

      <button onClick={()=>navigate('screen-store-mode')} className="w-full bg-walmart-blue hover:bg-blue-800 text-white py-3 px-4 rounded-full font-black text-xs">Confirm store & continue</button>
    </section>
  )
}
