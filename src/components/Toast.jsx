import React from 'react'
import { useApp } from '../context/AppContext'

export default function Toast(){
  const { toast } = useApp()
  if(!toast.visible) return null
  return (
    <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-walmart-navy text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl z-50 flex items-center space-x-2">
      <i className={`fa-solid ${toast.icon} text-walmart-yellow`} />
      <span>{toast.msg}</span>
    </div>
  )
}
