import React from 'react'
import { useApp } from '../context/AppContext'

export default function Header(){
  const { openListImport, currentLang } = useApp()

  return (
    <header className="bg-walmart-blue text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-walmart-yellow text-walmart-navy rounded-full flex items-center justify-center font-bold">KB</div>
        <h1 className="text-lg font-extrabold">CartKB</h1>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={openListImport} className="bg-white/15 hover:bg-white/25 border border-white/30 rounded-full px-3 py-1.5 text-xs font-bold" aria-label="Upload a shopping list image">
          <i className="fa-solid fa-image mr-1.5" aria-hidden="true" /> Upload list
        </button>
        <span className="text-xs font-bold" aria-label={`Language ${currentLang}`}>{currentLang.toUpperCase()}</span>
      </div>
    </header>
  )
}
