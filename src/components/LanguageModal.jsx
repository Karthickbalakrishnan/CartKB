import React from 'react'
import { useApp } from '../context/AppContext'

export default function LanguageModal(){
  const { currentLang, setCurrentLang } = useApp()
  const [open, setOpen] = React.useState(false)

  // Simple modal toggle for demo
  React.useEffect(()=>{
    function onKey(e){ if(e.key==='l') setOpen(o=>!o) }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  },[])

  if(!open) return null

  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full rounded-t-3xl sm:rounded-3xl p-5 space-y-4 shadow-2xl border border-gray-100 max-w-sm">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <h3 className="text-sm font-black text-walmart-navy">Select Language</h3>
          <button onClick={()=>setOpen(false)} className="w-7 h-7 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center text-xs">✕</button>
        </div>

        <div className="space-y-2">
          <button onClick={()=>setCurrentLang('en')} className={`w-full p-3 rounded-2xl ${currentLang==='en'? 'bg-blue-50 border-2 border-walmart-blue':'bg-gray-50'}`}>English</button>
          <button onClick={()=>setCurrentLang('ta')} className={`w-full p-3 rounded-2xl ${currentLang==='ta'? 'bg-blue-50 border-2 border-walmart-blue':'bg-gray-50'}`}>தமிழ் (Tamil)</button>
          <button onClick={()=>setCurrentLang('hi')} className={`w-full p-3 rounded-2xl ${currentLang==='hi'? 'bg-blue-50 border-2 border-walmart-blue':'bg-gray-50'}`}>हिंदी (Hindi)</button>
        </div>
      </div>
    </div>
  )
}
