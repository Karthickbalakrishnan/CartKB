import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-white border-t border-gray-200 px-3 py-2 flex justify-around items-center">
      <button className="flex flex-col items-center text-walmart-blue text-xs"><i className="fa-solid fa-house"/>Home</button>
      <button className="flex flex-col items-center text-gray-400 text-xs">List</button>
      <button className="flex flex-col items-center text-gray-400 text-xs">Scan</button>
      <button className="flex flex-col items-center text-gray-400 text-xs">More</button>
    </footer>
  )
}
