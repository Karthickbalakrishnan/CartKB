import React from 'react'
import { useApp } from '../context/AppContext'

export default function ShoppingList(){
  const { shoppingList, removeItemFromList, navigate } = useApp()

  const total = shoppingList.reduce((s,i)=> s + (i.price||0), 0)

  return (
    <section className="p-4 space-y-3.5">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-walmart-navy">Your Shopping List</h2>
          <p className="text-xs text-gray-500 font-medium">{shoppingList.length} items • Estimated ₹{total}</p>
        </div>
        <span className="bg-walmart-yellow text-walmart-navy text-xs font-black px-3 py-1 rounded-full">{shoppingList.length} Items</span>
      </div>

      <div className="space-y-2.5">
        {shoppingList.map(item=> (
          <div key={item.id} className="bg-white p-3 rounded-2xl border border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={item.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
              <div>
                <div className="font-extrabold text-xs">{item.name}</div>
                <div className="text-[10px] text-gray-500">{item.aisle} • {item.bay}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-black">₹{item.price}</div>
              <button onClick={()=>removeItemFromList(item.id)} className="text-xs text-gray-400">Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-gray-200">
        <button onClick={()=>navigate('screen-ar-camera')} className="w-full bg-walmart-yellow hover:bg-walmart-yellowHover text-walmart-navy py-3 px-4 rounded-full font-black text-xs">Start aisle camera navigation →</button>
      </div>
    </section>
  )
}
