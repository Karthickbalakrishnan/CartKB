import React, { createContext, useContext, useEffect, useState } from 'react'
import generateCatalog from '../data/catalog'

const AppContext = createContext(null)
const CART_STORAGE_KEY = 'cartkb-shopping-list'

export function useApp(){
  return useContext(AppContext)
}

function loadShoppingList(){
  try {
    const saved = window.localStorage.getItem(CART_STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function AppProvider({ children }){
  const [currentScreen, setCurrentScreen] = useState('screen-landing')
  const [currentLang, setCurrentLang] = useState('en')
  const [currentStore, setCurrentStore] = useState('Main Street Supercenter')
  const [catalog] = useState(() => generateCatalog())
  const [shoppingList, setShoppingList] = useState(loadShoppingList)
  const [isListImportOpen, setIsListImportOpen] = useState(false)
  const [toast, setToast] = useState({ visible:false, msg:'', icon:'fa-circle-info' })

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(shoppingList))
    } catch (error) {
      console.warn('Could not save the shopping list locally', error)
    }
  }, [shoppingList])

  function navigate(screenId){
    setCurrentScreen(screenId)
    window.scrollTo(0,0)
  }

  function showToast(msg, icon='fa-circle-info'){
    setToast({ visible:true, msg, icon })
    setTimeout(()=> setToast({ visible:false, msg:'', icon:'fa-circle-info' }), 2000)
  }

  function addItemToList(item){
    setShoppingList(prev => [...prev, { ...item, id: window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`, collected:false }])
    showToast(`Added ${item.name} to cart`, 'fa-cart-plus')
  }

  function addItemsToList(items){
    const newItems = items.map((item, index) => ({
      ...item,
      id: window.crypto?.randomUUID?.() || `${Date.now()}-${index}-${Math.random()}`,
      collected: false
    }))
    setShoppingList(prev => [...prev, ...newItems])
    return newItems.length
  }

  function removeItemFromList(id){
    setShoppingList(prev => prev.filter(i => i.id !== id))
  }

  function selectStore(storeName){
    setCurrentStore(storeName)
    showToast(`Connected to ${storeName}`, 'fa-store')
  }

  function processUPI(){
    navigate('screen-payment-success')
    showToast('Payment Successful!', 'fa-check')
  }

  return (
    <AppContext.Provider value={{
      currentScreen, navigate,
      currentLang, setCurrentLang,
      currentStore, selectStore,
      catalog, shoppingList, addItemToList, addItemsToList, removeItemFromList,
      isListImportOpen, openListImport:()=>setIsListImportOpen(true), closeListImport:()=>setIsListImportOpen(false),
      showToast, toast, processUPI
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
