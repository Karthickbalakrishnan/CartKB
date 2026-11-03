import React from 'react'
import { useApp } from '../context/AppContext'

export default function ShoppingList(){
  const { shoppingList, removeItemFromList, navigate, openListImport } = useApp()
  const total = shoppingList.reduce((sum, item) => sum + (Number(item.price) || 0), 0)

  return (
    <section className="p-4 space-y-4 flex-1">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-walmart-navy">Your Shopping List</h2>
          <p className="text-xs text-gray-500 font-medium">{shoppingList.length} items • Estimated ₹{total.toFixed(2)}</p>
        </div>
        <button onClick={openListImport} className="shrink-0 rounded-full bg-blue-50 px-3 py-2 text-[10px] font-black text-walmart-blue"><i className="fa-solid fa-camera mr-1" aria-hidden="true" /> Scan list</button>
      </div>

      {shoppingList.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-blue-200 bg-white p-7 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-walmart-blue"><i className="fa-solid fa-list-check text-xl" aria-hidden="true" /></div>
          <h3 className="text-sm font-black text-walmart-navy">Your list is empty</h3>
          <p className="mt-1 text-xs text-gray-500">Scan a handwritten or printed list, or browse the catalog to add items.</p>
          <button onClick={openListImport} className="mt-4 rounded-full bg-walmart-yellow px-5 py-2.5 text-xs font-black text-walmart-navy">Upload a list image</button>
          <button onClick={() => navigate('screen-browse-catalog')} className="mt-2 block w-full py-2 text-xs font-bold text-walmart-blue">Browse products</button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {shoppingList.map(item => (
            <div key={item.id} className="bg-white p-3 rounded-2xl border border-gray-200 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center space-x-3">
                <img src={item.image} className="w-12 h-12 rounded-xl object-cover shrink-0" alt="" />
                <div className="min-w-0">
                  <div className="font-extrabold text-xs text-walmart-navy break-words">{item.name}</div>
                  <div className="text-[10px] text-gray-500">{item.aisle}{item.bay ? ` • ${item.bay}` : ''}</div>
                  {item.price ? null : <div className="text-[10px] text-amber-700 font-bold">Needs identification • price not set</div>}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-black text-walmart-navy">{item.price ? `₹${Number(item.price).toFixed(2)}` : '—'}</div>
                <button onClick={() => removeItemFromList(item.id)} className="text-xs text-gray-400 underline">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {shoppingList.length > 0 && <div className="pt-2 border-t border-gray-200">
        <button onClick={() => navigate('screen-ar-camera')} className="w-full bg-walmart-yellow hover:bg-walmart-yellowHover text-walmart-navy py-3 px-4 rounded-full font-black text-xs">Start aisle navigation</button>
      </div>}
    </section>
  )
}
