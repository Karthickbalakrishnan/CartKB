import React from 'react'
import { createWorker } from 'tesseract.js'
import { useApp } from '../context/AppContext'

const MAX_IMAGE_BYTES = 10 * 1024 * 1024

function cleanRecognizedText(text){
  return text
    .split(/\r?\n/)
    .map(line => line.replace(/^\s*(?:[-*•▪]|\d+[.)])\s*/, '').trim())
    .filter(line => line && !/^[-_=|.]+$/.test(line))
    .join('\n')
}

function matchRecognizedItem(line, catalog){
  const normalized = line.toLocaleLowerCase().replace(/\s+/g, ' ').trim()
  const exact = catalog.find(item => item.name.toLocaleLowerCase() === normalized)
  const match = exact || catalog.find(item => {
    const productName = item.name.toLocaleLowerCase().replace(/\s*\([^)]*\)\s*$/, '')
    return productName.includes(normalized) || normalized.includes(productName)
  })

  if (match) {
    const variant = match.variants[0]
    return {
      name: `${match.name} (${variant.label})`, variant: variant.label,
      aisle: match.aisle, bay: match.bay, shelf: match.shelf,
      price: variant.price, image: match.image
    }
  }

  return {
    name: line, variant: 'Needs matching in store', aisle: 'Aisle not assigned',
    bay: '', shelf: '', price: 0,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop&q=80'
  }
}

export default function OCRListImport(){
  const { isListImportOpen, closeListImport, catalog, addItemsToList, showToast, navigate } = useApp()
  const [imageUrl, setImageUrl] = React.useState('')
  const [recognizedText, setRecognizedText] = React.useState('')
  const [isRecognizing, setIsRecognizing] = React.useState(false)
  const [error, setError] = React.useState('')
  const inputRef = React.useRef(null)

  React.useEffect(() => () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl)
  }, [imageUrl])

  function reset(){
    closeListImport()
    if (imageUrl) URL.revokeObjectURL(imageUrl)
    setImageUrl('')
    setRecognizedText('')
    setError('')
    setIsRecognizing(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  async function handleFileChange(event){
    const file = event.target.files?.[0]
    if (!file) return
    setError('')
    setRecognizedText('')
    if (!file.type.startsWith('image/')) {
      setError('Choose an image file such as JPG, PNG, or WebP.')
      return
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError('This image is larger than 10 MB. Please choose a smaller image.')
      return
    }

    setImageUrl(URL.createObjectURL(file))
    setIsRecognizing(true)
    let worker
    try {
      worker = await createWorker('eng')
      const { data } = await worker.recognize(file)
      const cleaned = cleanRecognizedText(data.text || '')
      if (!cleaned) setError('No text was found. Try a clearer, well-lit photo, or type the items below.')
      setRecognizedText(cleaned)
    } catch (recognitionError) {
      console.error('List OCR failed', recognitionError)
      setError('Text recognition could not complete. Check your connection and try again, or type the items below.')
    } finally {
      if (worker) await worker.terminate()
      setIsRecognizing(false)
    }
  }

  function confirmAddToCart(){
    const lines = [...new Set(recognizedText.split(/\r?\n/).map(line => line.trim()).filter(Boolean))]
    if (!lines.length) {
      setError('Add at least one item before confirming.')
      return
    }
    const items = lines.map(line => matchRecognizedItem(line, catalog))
    addItemsToList(items)
    showToast(`${items.length} recognized item${items.length === 1 ? '' : 's'} added to cart`, 'fa-cart-plus')
    reset()
    navigate('screen-shopping-list')
  }

  if (!isListImportOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget && !isRecognizing) reset() }}>
      <section role="dialog" aria-modal="true" aria-labelledby="ocr-title" className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl p-5 space-y-4 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="ocr-title" className="text-lg font-black text-walmart-navy">Scan your shopping list</h2>
            <p className="text-xs text-gray-500 mt-1">Choose or photograph a list. Review every OCR result before adding it to your cart.</p>
          </div>
          <button type="button" onClick={reset} disabled={isRecognizing} aria-label="Close" className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 disabled:opacity-40">×</button>
        </div>

        <label className="block">
          <span className="sr-only">Choose a list image</span>
          <input ref={inputRef} type="file" accept="image/*" capture="environment" onChange={handleFileChange} disabled={isRecognizing} className="w-full text-xs file:mr-3 file:rounded-xl file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:font-bold file:text-walmart-blue" />
        </label>

        {imageUrl && <img src={imageUrl} alt="Uploaded shopping list preview" className="w-full max-h-48 object-contain rounded-2xl bg-gray-50 border border-gray-200" />}
        {isRecognizing && <div role="status" className="rounded-xl bg-blue-50 p-3 text-xs font-bold text-walmart-blue"><i className="fa-solid fa-spinner fa-spin mr-2" aria-hidden="true" />Reading text from your image… This may take a moment.</div>}
        {error && <p role="alert" className="text-xs text-red-700 bg-red-50 rounded-xl p-3">{error}</p>}

        <div>
          <label htmlFor="ocr-recognized-items" className="block text-xs font-black text-walmart-navy mb-1.5">Recognized items — edit before adding</label>
          <textarea id="ocr-recognized-items" value={recognizedText} onChange={event => setRecognizedText(event.target.value)} placeholder="Your recognized items will appear here. You can also type or correct them." rows={7} className="w-full p-3 rounded-2xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-walmart-blue" />
          <p className="text-[10px] text-gray-500 mt-1">Unmatched items are saved with no price so you can identify them in store.</p>
        </div>

        <div className="flex gap-2">
          <button type="button" onClick={reset} disabled={isRecognizing} className="flex-1 rounded-full border border-gray-300 py-3 text-xs font-bold text-gray-600 disabled:opacity-40">Cancel</button>
          <button type="button" onClick={confirmAddToCart} disabled={isRecognizing || !recognizedText.trim()} className="flex-1 rounded-full bg-walmart-yellow py-3 text-xs font-black text-walmart-navy disabled:opacity-50">Confirm & add to cart</button>
        </div>
      </section>
    </div>
  )
}
