import React from 'react'
import { useApp } from '../context/AppContext'

export default function ARCamera(){
  const { navigate } = useApp()

  return (
    <section className="relative flex-1 flex flex-col p-4 bg-black text-white">
      <div className="absolute inset-0 bg-slate-900 z-0 opacity-60" />

      <div className="relative z-20 p-3 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={()=>navigate('screen-shopping-list')} className="bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center">✕</button>
        <div className="bg-black/60 text-white px-3 py-1 rounded-full text-[11px] font-bold">AR Wayfinder Active</div>
        <button onClick={()=>{}} className="bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center">⚡</button>
      </div>

      <div className="relative z-20 mx-4 mt-2 bg-walmart-navy/90 backdrop-blur-md text-white p-3 rounded-2xl border border-white/20 flex items-center space-x-3 shadow-lg">
        <div className="w-8 h-8 bg-walmart-yellow text-walmart-navy rounded-full flex items-center justify-center text-sm font-black">👣</div>
        <div>
          <h4 className="text-xs font-extrabold">Walk 8 meters forward. Look at left shelf.</h4>
          <p className="text-[10px] text-gray-300 font-medium">Follow the yellow floor path to your target item.</p>
        </div>
      </div>

      <div className="mt-auto p-4 space-y-3 bg-gradient-to-t from-walmart-navy via-walmart-navy/95 to-transparent pt-6">
        <div className="bg-white rounded-2xl p-3 shadow-xl border border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&auto=format&fit=crop&q=80" className="w-9 h-9 rounded-xl" alt="" />
            <div>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Next Item Target</span>
              <h4 className="text-xs font-extrabold text-walmart-navy">Milk 1L</h4>
            </div>
          </div>
          <button onClick={()=>navigate('screen-shopping-list')} className="bg-walmart-yellow hover:bg-walmart-yellowHover text-walmart-navy font-black text-xs px-4 py-2 rounded-full">Collected! →</button>
        </div>
      </div>
    </section>
  )
}
