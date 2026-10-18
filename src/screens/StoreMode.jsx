import React from 'react'
import { useApp } from '../context/AppContext'

export default function StoreMode(){
  const { currentStore, navigate } = useApp()

  return (
    <section className="p-4 space-y-4">
      <div className="bg-green-50 p-3.5 rounded-2xl border border-green-200 flex items-center space-x-3">
        <div className="w-8 h-8 bg-walmart-green text-white rounded-full flex items-center justify-center text-sm font-black">✓</div>
        <div>
          <span className="text-[10px] font-bold text-walmart-green uppercase">Selected Location</span>
          <h4 className="text-xs font-black text-walmart-navy">{currentStore}</h4>
        </div>
      </div>

      <h2 className="text-base font-black text-walmart-navy">Choose how you'd like to shop</h2>

      <div onClick={()=>navigate('screen-shopping-list')} className="bg-white p-4 rounded-3xl border-2 border-gray-100 shadow-sm hover:border-walmart-blue cursor-pointer flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 bg-blue-50 text-walmart-blue rounded-2xl flex items-center justify-center text-lg font-black">📋</div>
          <div>
            <h4 className="text-xs font-extrabold text-walmart-navy">Open my shopping list</h4>
            <p className="text-[10px] text-gray-500">Pre-saved items auto-mapped to aisles</p>
          </div>
        </div>
        <i className="fa-solid fa-chevron-right text-gray-400" />
      </div>

      <div onClick={()=>navigate('screen-browse-catalog')} className="bg-white p-4 rounded-3xl border-2 border-gray-100 shadow-sm hover:border-walmart-blue cursor-pointer flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-lg font-black">🔎</div>
          <div>
            <h4 className="text-xs font-extrabold text-walmart-navy">Browse & search items</h4>
            <p className="text-[10px] text-gray-500">Search 1000+ SKUs on the fly</p>
          </div>
        </div>
        <i className="fa-solid fa-chevron-right text-gray-400" />
      </div>

      <div className="bg-blue-50 p-3 rounded-2xl border border-blue-100 flex items-center space-x-2.5 text-xs text-walmart-blue">
        <i className="fa-solid fa-circle-info text-sm" />
        <span className="text-[11px] font-semibold">You can switch modes or change store anytime from the menu.</span>
      </div>
    </section>
  )
}
