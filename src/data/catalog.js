// simplified catalog generator adapted from original demo
const baseCatalogTemplates = [
  { name: "Fresh Toned Milk", dept: "Dairy", aisle: "Aisle 1A", bay: "Bay 3", shelf: "Middle Shelf", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&auto=format&fit=crop&q=80", type: 'fluid-small' },
  { name: "Apple Cider Vinegar", dept: "Kitchen", aisle: "Aisle 2B", bay: "Bay 4", shelf: "Middle Shelf", img: "https://images.unsplash.com/photo-1598511726623-d7228a7e089d?w=200&auto=format&fit=crop&q=80", type: 'fluid-vinegar' },
  { name: "Kadalai Mittai / Peanut Chikki", dept: "Snacks", aisle: "Aisle 3C", bay: "Bay 2", shelf: "Middle Shelf", img: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&auto=format&fit=crop&q=80", type: 'sweets' },
  { name: "Moisturizing Bathing Soap 3-Pack", dept: "Bathroom", aisle: "Aisle 4B", bay: "Bay 1", shelf: "Top Shelf", img: "https://images.unsplash.com/photo-1607006411601-775c8cc64f86?w=200&auto=format&fit=crop&q=80", type: 'standard' }
]

const variantMap = {
  "fluid-small": [ { label: '250ml', price: 18 }, { label: '500ml (1/2L)', price: 32 }, { label: '1L', price: 60 } ],
  "fluid-vinegar": [ { label: '250ml', price: 145 }, { label: '500ml', price: 270 } ],
  "sweets": [ { label: '250g Box', price: 150 }, { label: '500g Box', price: 280 } ],
  "standard": [ { label: 'Standard Pack', price: 85 }, { label: 'Value Pack', price: 160 } ]
}

const brands = ["Heritage", "Aachi", "Tata Simply", "Fortune", "Amul"]

export default function generateCatalog(){
  const catalogMasterDB = []
  let idCounter = 1
  for(let i=0;i<40;i++){
    baseCatalogTemplates.forEach(template=>{
      const brand = brands[i % brands.length]
      const variantType = variantMap[template.type] || variantMap['standard']
      const basePrice = variantType[0].price
      catalogMasterDB.push({
        id: `p${idCounter++}`,
        name: `${brand} ${template.name} #${i+1}`,
        dept: template.dept,
        aisle: template.aisle,
        bay: template.bay,
        shelf: template.shelf,
        image: template.img,
        variants: variantType,
        storePrices: [
          { store: 'Main Street Supercenter', price: basePrice, stock: 'In Stock' },
          { store: 'Saravana Stores', price: Math.max(10, basePrice-2), stock: 'In Stock' },
        ]
      })
    })
  }
  return catalogMasterDB
}
