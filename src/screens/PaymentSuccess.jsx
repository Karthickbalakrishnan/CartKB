import React from 'react'
import { useApp } from '../context/AppContext'

export default function PaymentSuccess(){
  const { navigate } = useApp()

  return (
    <section className="p-4 space-y-4 flex-1 flex flex-col justify-between">
      <div className="space-y-4 text-center">
        <div className="w-14 h-14 bg-green-100 text-walmart-green rounded-full flex items-center justify-center text-2xl font-black mx-auto">✓</div>

        <div>
          <span className="bg-walmart-green text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase">Payment Successful!</span>
          <h2 className="text-lg font-black text-walmart-navy mt-1.5">₹285.00 paid via UPI</h2>
          <p className="text-xs text-gray-500 font-medium">Order #CKB-987452 • T. Nagar Store</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-walmart-green shadow-md space-y-3 inline-block w-full">
          <h3 className="text-xs font-extrabold text-walmart-navy">Digital Express Exit QR Pass</h3>
          <p className="text-[10px] text-gray-500">Show this QR code at the express exit gate.</p>

          <div className="p-3 bg-gray-50 rounded-2xl inline-block border border-gray-200">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CARTKB-EXPRESS-PAID-285" alt="Digital Exit QR Code" className="w-36 h-36 mx-auto" />
          </div>

          <div className="bg-green-50 text-walmart-green text-[10px] font-extrabold py-1 px-3 rounded-full inline-block">Valid for 10 minutes</div>
        </div>
      </div>

      <button onClick={()=>navigate('screen-landing')} className="w-full bg-walmart-yellow hover:bg-walmart-yellowHover text-walmart-navy py-3 px-4 rounded-full font-black text-xs">Done & Return Home</button>
    </section>
  )
}
