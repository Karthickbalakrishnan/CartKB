import React from 'react'

export default function Header(){
  return (
    <header className="bg-walmart-blue text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-walmart-yellow text-walmart-navy rounded-full flex items-center justify-center font-bold">KB</div>
        <h1 className="text-lg font-extrabold">CartKB</h1>
      </div>
      <div className="text-xs font-bold">EN</div>
    </header>
  )
}
