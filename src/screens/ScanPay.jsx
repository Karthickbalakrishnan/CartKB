import React from 'react'
import { useApp } from '../context/AppContext'

export default function ScanPay(){
  const { shoppingList, processUPI } = useApp()
  const total = shoppingList.reduce((s,i)=> s + (i.price||0), 0)

  return (
    <section className="p-4 space-y-4">
      <div>
        <h2 className="text-base font-black text-walmart-navy">Scan & Pay</h2>
        <p className="text-xs text-gray-500">Scan shelf barcodes, pay via UPI and skip the long checkout queue.</p>
      </div>

      <div className="relative h-44 bg-slate-900 rounded-3xl overflow-hidden border-2 border-walmart-blue flex flex-col justify-between p-3">
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className="w-32 h-32 border-2 border-dashed border-walmart-yellow rounded-2xl" />
        </div>

        <div className="relative z-10 flex justify-between items-center text-white">
          <span className="bg-black/60 px-2.5 py-1 rounded-full text-[10px] font-bold">Barcode Scanner</span>
          <span className="bg-walmart-green text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">Ready</span>
        </div>

        <div className="relative z-10 text-center text-xs text-white font-bold bg-black/60 py-1.5 rounded-xl border border-white/10">Tap camera view to scan shelf barcode</div>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-sm space-y-2.5">
        <div className="flex justify-between items-center border-b border-gray-100 pb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <span>Cart Summary</span>
          <span className="text-walmart-blue font-extrabold">{shoppingList.length} items</span>
        </div>

        <div className="space-y-2 text-xs">
          {shoppingList.map(it=> (
            <div key={it.id} className="flex justify-between items-center">
              <div>
                <div className="font-bold text-walmart-navy">{it.name}</div>
                <div className="text-[10px] text-gray-400">{it.aisle}</div>
              </div>
              <div className="text-right font-black">₹{it.price}</div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
          <span className="text-xs font-bold text-gray-600">Total Amount:</span>
          <span className="text-base font-black text-walmart-navy">₹{total}</span>
        </div>
      </div>

      <div className="space-y-2">
        <button onClick={processUPI} className="w-full bg-walmart-yellow hover:bg-walmart-yellowHover text-walmart-navy py-3 px-4 rounded-full font-black text-xs">Pay via UPI (Fast Checkout)</button>
        <p className="text-[10px] text-center text-gray-400 font-medium">🔒 Secure • Fast • Skip packaging & billing queue</p>
      </div>
    </section>
  )
}
