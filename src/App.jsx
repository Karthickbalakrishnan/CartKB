import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './screens/Landing'

export default function App(){
  return (
    <div className="min-h-screen bg-walmart-bg text-walmart-navy font-sans">
      <div className="max-w-md mx-auto shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]">
        <Header />
        <main className="bg-walmart-bg min-h-[560px]">
          <Landing />
        </main>
        <Footer />
      </div>
    </div>
  )
}
