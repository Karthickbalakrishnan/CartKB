import React from 'react'
import { AppProvider } from './context/AppContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './screens/Landing'
import HomeSearch from './screens/HomeSearch'
import StoreSelect from './screens/StoreSelect'
import StoreMode from './screens/StoreMode'
import ShoppingList from './screens/ShoppingList'
import BrowseCatalog from './screens/BrowseCatalog'
import ARCamera from './screens/ARCamera'
import ScanPay from './screens/ScanPay'
import PaymentSuccess from './screens/PaymentSuccess'
import LanguageModal from './components/LanguageModal'
import Toast from './components/Toast'
import { useApp } from './context/AppContext'

function AppInner(){
  const { currentScreen } = useApp()

  return (
    <div className="app-container w-full bg-walmart-bg rounded-none sm:rounded-[40px] overflow-hidden flex flex-col relative border-0 sm:border-[8px] sm:border-slate-800">
      <Header />

      <main id="main-viewport" className="flex-1 overflow-y-auto custom-scroll relative flex flex-col">
        {currentScreen === 'screen-landing' && <Landing />}
        {currentScreen === 'screen-home-search' && <HomeSearch />}
        {currentScreen === 'screen-store-select' && <StoreSelect />}
        {currentScreen === 'screen-store-mode' && <StoreMode />}
        {currentScreen === 'screen-shopping-list' && <ShoppingList />}
        {currentScreen === 'screen-browse-catalog' && <BrowseCatalog />}
        {currentScreen === 'screen-ar-camera' && <ARCamera />}
        {currentScreen === 'screen-scan-pay' && <ScanPay />}
        {currentScreen === 'screen-payment-success' && <PaymentSuccess />}
      </main>

      <Footer />

      <LanguageModal />
      <Toast />
    </div>
  )
}

export default function App(){
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  )
}
