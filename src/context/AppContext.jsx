import React, { createContext, useContext, useState, useEffect } from 'react'
import generateCatalog from '../data/catalog'

const AppContext = createContext(null)

export function useApp(){
  return useContext(AppContext)
}

export function AppProvider({ children }){
  const [currentScreen, setCurrentScreen] = useState('screen-landing')
  const [currentLang, setCurrentLang] = useState('en')
  const [currentStore, setCurrentStore] = useState('Main Street Supercenter')
  const [catalog, setCatalog] = useState([])
  const [shoppingList, setShoppingList] = useState([])
  const [toast, setToast] = useState({ visible:false, msg:'', icon:'fa-circle-info' })

  useEffect(() => {
    // generate catalog once
    const db = generateCatalog()
    setCatalog(db)
  }, [])

  function navigate(screenId){
    setCurrentScreen(screenId)
    window.scrollTo(0,0)
  }

  function showToast(msg, icon='fa-circle-info'){
    setToast({ visible:true, msg, icon })
    setTimeout(()=> setToast({ visible:false, msg:'', icon:'fa-circle-info' }), 2000)
  }

  function addItemToList(item){
    setShoppingList(prev => [...prev, { ...item, id: Date.now().toString(), collected:false }])
    showToast(`Added ${item.name} to list`, 'fa-cart-plus')
  }

  function removeItemFromList(id){
    setShoppingList(prev => prev.filter(i => i.id !== id))
  }

  function selectStore(storeName){
    setCurrentStore(storeName)
    showToast(`Connected to ${storeName}`, 'fa-store')
  }

  function processUPI(){
    // simulate payment
    navigate('screen-payment-success')
    showToast('Payment Successful!', 'fa-check')
  }

  return (
    <AppContext.Provider value={{
      currentScreen, navigate,
      currentLang, setCurrentLang,
      currentStore, selectStore,
      catalog, shoppingList, addItemToList, removeItemFromList,
      showToast, toast, processUPI
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
