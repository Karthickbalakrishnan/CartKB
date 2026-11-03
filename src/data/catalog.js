import React from 'react'

const PACKS = [
  { label: 'Small pack', multiplier: 0.65 },
  { label: 'Regular pack', multiplier: 1 },
  { label: 'Large pack', multiplier: 1.8 },
  { label: 'Family pack', multiplier: 2.7 },
  { label: 'Value pack', multiplier: 4.2 }
]

const COLLECTIONS = [
  'Festival Specials', 'Explore', "Today's Deals", 'Featured', 'Fresh At',
  'Offers for You', 'Buy Again', 'Fruits', 'Veggies', "Season's Best",
  'Blockbuster Deals', 'Grocery & Kitchen', 'Snacks & Drinks',
  'Fashion & Lifestyle', 'Beauty & Personal Care', 'Household Essentials',
  'Hobbies & Interests'
]

const groups = [
  { category:'Fruits', dept:'Fruits', aisle:'Aisle 1A', base:35, names:['Alphonso Mango','Robusta Banana','Washington Apple','Navel Orange','Green Grapes','Black Grapes','Pomegranate','Guava','Papaya','Sweet Lime'], brands:['Farm Fresh','Nature Basket','Daily Harvest','Orchard Select','Local Market'] },
  { category:'Fruits', dept:'Fruits', aisle:'Aisle 1B', base:45, names:['Dragon Fruit','Kiwi Fruit','Pear','Pineapple','Watermelon','Muskmelon','Strawberry','Blueberry','Jamun','Seasonal Chikoo'], brands:['Farm Fresh','Nature Basket','Daily Harvest','Orchard Select','Local Market'] },
  { category:'Veggies', dept:'Veggies', aisle:'Aisle 1C', base:20, names:['Tomato','Red Onion','Potato','Carrot','Green Capsicum','Cucumber','Cauliflower','Cabbage','Brinjal','Green Peas'], brands:['Farm Fresh','Nature Basket','Daily Harvest','Local Market','Fresh Fields'] },
  { category:'Veggies', dept:'Veggies', aisle:'Aisle 1D', base:18, names:['Spinach','Coriander Leaves','Curry Leaves','Drumstick','Okra','Bottle Gourd','Bitter Gourd','Beetroot','Sweet Potato','Green Beans'], brands:['Farm Fresh','Nature Basket','Daily Harvest','Local Market','Fresh Fields'] },
  { category:'Grocery & Kitchen', dept:'Grocery & Kitchen', aisle:'Aisle 2A', base:65, names:['Sona Masoori Rice','Basmati Rice','Whole Wheat Atta','Toor Dal','Moong Dal','Chana Dal','Rajma','Poha','Rava Sooji','Millet Mix'], brands:['Tata Sampann','Aashirvaad','Fortune','24 Mantra','Kitchen Select'] },
  { category:'Grocery & Kitchen', dept:'Grocery & Kitchen', aisle:'Aisle 2B', base:80, names:['Sunflower Oil','Groundnut Oil','Coconut Oil','Gingelly Oil','Olive Oil','Turmeric Powder','Chilli Powder','Sambar Powder','Garam Masala','Black Pepper'], brands:['Fortune','Aachi','Tata Sampann','Organic Tattva','Kitchen Select'] },
  { category:'Grocery & Kitchen', dept:'Grocery & Kitchen', aisle:'Aisle 2C', base:45, names:['Apple Cider Vinegar','Tomato Ketchup','Coconut Milk','Peanut Butter','Honey','Instant Coffee','Tea Leaves','Jaggery Powder','Pasta Sauce','Pickle'], brands:['Tata Sampann','Aachi','Dabur','Organic Tattva','Kitchen Select'] },
  { category:'Grocery & Kitchen', dept:'Grocery & Kitchen', aisle:'Aisle 2D', base:32, names:['Toned Milk','Curd','Paneer','Salted Butter','Cheddar Cheese','Fresh Cream','Buttermilk','Greek Yogurt','Ghee','Condensed Milk'], brands:['Amul','Aavin','Heritage','Milky Mist','Daily Fresh'] },
  { category:'Grocery & Kitchen', dept:'Grocery & Kitchen', aisle:'Aisle 2E', base:25, names:['Sandwich Bread','Whole Wheat Bread','Burger Buns','Pav Buns','Rusk Toast','Croissant','Fruit Cake','Multigrain Loaf','Pita Bread','Garlic Bread'], brands:['Modern','Harvest Gold','Britannia','The Baker','Daily Fresh'] },
  { category:'Grocery & Kitchen', dept:'Grocery & Kitchen', aisle:'Aisle 2F', base:50, names:['Breakfast Oats','Corn Flakes','Muesli','Wheat Flakes','Granola','Chia Seeds','Flax Seeds','Almond Flour','Coconut Flour','Protein Pancake Mix'], brands:['Kellogg’s','Quaker','Yoga Bar','True Elements','Kitchen Select'] },
  { category:'Snacks & Drinks', dept:'Snacks & Drinks', aisle:'Aisle 3A', base:20, names:['Masala Potato Chips','Salted Potato Chips','Banana Chips','Kadalai Mittai','Murukku','Mixture Namkeen','Roasted Peanuts','Popcorn','Nacho Chips','Chocolate Wafer'], brands:['Aachi','Haldiram’s','Bingo!','Too Yumm!','Snack House'] },
  { category:'Snacks & Drinks', dept:'Snacks & Drinks', aisle:'Aisle 3B', base:25, names:['Orange Juice','Mango Drink','Lime Soda','Sparkling Water','Coconut Water','Iced Tea','Cola Drink','Energy Drink','Apple Juice','Filter Coffee Can'], brands:['Paper Boat','Tropicana','Real','Campa','Daily Refresh'] },
  { category:'Snacks & Drinks', dept:'Snacks & Drinks', aisle:'Aisle 3C', base:35, names:['Dark Chocolate','Milk Chocolate','Cashew Cookies','Oat Cookies','Digestive Biscuits','Cream Biscuits','Almonds','Cashews','Pistachios','Trail Mix'], brands:['Amul','Britannia','Sunfeast','Cadbury','Snack House'] },
  { category:'Fashion & Lifestyle', dept:'Fashion & Lifestyle', aisle:'Aisle 4A', base:199, names:['Cotton Crew T-Shirt','Polo T-Shirt','Casual Shirt','Leggings','Cotton Kurta','Denim Jeans','Sleepwear Set','Sports Shorts','Cotton Socks','Everyday Scarf'], brands:['Style Street','Urban Loom','Everyday Wear','Indi Threads','Active Life'] },
  { category:'Fashion & Lifestyle', dept:'Fashion & Lifestyle', aisle:'Aisle 4B', base:149, names:['Reusable Tote Bag','Travel Pouch','Cotton Hand Towel','Water Bottle','Lunch Bag','Compact Umbrella','Wallet','Hair Band Set','Sunglasses','Travel Organizer'], brands:['Style Street','Urban Loom','Everyday Wear','Indi Threads','Active Life'] },
  { category:'Beauty & Personal Care', dept:'Beauty & Personal Care', aisle:'Aisle 5A', base:55, names:['Moisturizing Soap','Neem Bathing Soap','Shampoo','Conditioner','Body Lotion','Face Wash','Toothpaste','Toothbrush','Hand Wash','Deodorant'], brands:['Himalaya','Dove','Pond’s','Dabur','Personal Care Co'] },
  { category:'Beauty & Personal Care', dept:'Beauty & Personal Care', aisle:'Aisle 5B', base:75, names:['Sunscreen Lotion','Aloe Vera Gel','Lip Balm','Face Moisturizer','Hair Oil','Hair Serum','Clay Face Mask','Micellar Cleanser','Talcum Powder','Rose Water Toner'], brands:['Himalaya','Dove','Pond’s','Dabur','Personal Care Co'] },
  { category:'Household Essentials', dept:'Household Essentials', aisle:'Aisle 6A', base:65, names:['Laundry Detergent','Dishwash Liquid','Floor Cleaner','Bathroom Cleaner','Glass Cleaner','Fabric Softener','Scrub Sponge','Garbage Bags','Paper Towels','Toilet Cleaner'], brands:['Vim','Surf Excel','Harpic','Lizol','Home Essentials'] },
  { category:'Household Essentials', dept:'Household Essentials', aisle:'Aisle 6B', base:40, names:['LED Bulb','Storage Container','Kitchen Foil Roll','Food Storage Bags','Microfiber Cloth','Mop Refill','Laundry Basket','Room Freshener','Mosquito Repellent','Scented Candle'], brands:['Home Essentials','Bright Living','Godrej','Odonil','Everyday Home'] },
  { category:'Hobbies & Interests', dept:'Hobbies & Interests', aisle:'Aisle 7A', base:60, names:['Watercolor Set','Sketchbook','Color Pencil Set','Acrylic Paint Set','Craft Paper Pack','Knitting Yarn','Gardening Gloves','Seed Starter Kit','Yoga Mat','Resistance Bands'], brands:['Creative Corner','Art House','Garden Life','Active Life','Hobby Works'] }
]

function productCollections(group, productIndex, skuIndex, productName){
  const result = ['Explore']
  if (skuIndex % 4 === 0) result.push('Featured')
  if (skuIndex % 3 === 0) result.push("Today's Deals", 'Offers for You')
  if (skuIndex % 7 === 0) result.push('Buy Again')
  if (skuIndex % 11 === 0) result.push('Blockbuster Deals')
  if (group.category === 'Fruits' || group.category === 'Veggies') {
    result.push('Fresh At')
    if (productIndex % 2 === 0) result.push("Season's Best")
    if (group.category === 'Fruits' && /mango|grape|sweet|jamun/i.test(productName)) result.push('Festival Specials')
  }
  if (group.category === 'Grocery & Kitchen' && /oil|ghee|jaggery|rice|masala/i.test(productName)) result.push('Festival Specials')
  result.push(group.category)
  return [...new Set(result)]
}

export default function generateCatalog(){
  const products = []
  groups.forEach((group, groupIndex) => {
    group.names.forEach((productName, productIndex) => {
      const brand = group.brands[productIndex % group.brands.length]
      PACKS.forEach((pack, packIndex) => {
        const idNumber = products.length + 1
        const price = Math.max(10, Math.round(group.base * pack.multiplier))
        const label = ['250g / 250ml', '500g / 500ml', '1kg / 1L', 'Family size', 'Value size'][packIndex]
        products.push({
          id: `p${idNumber}`,
          name: `${brand} ${productName} - ${label}`,
          dept: group.dept,
          category: group.category,
          collections: productCollections(group, productIndex, idNumber, productName),
          aisle: group.aisle,
          bay: `Bay ${(productIndex % 5) + 1}`,
          shelf: ['Top Shelf', 'Middle Shelf', 'Lower Shelf'][(productIndex + packIndex) % 3],
          image: group.category === 'Fruits' || group.category === 'Veggies'
            ? 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop&q=80'
            : 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&auto=format&fit=crop&q=80',
          variants: [{ label, price }],
          storePrices: [
            { store:'Main Street Supercenter', price, stock:'In Stock' },
            { store:'Saravana Stores', price:Math.max(10, price - 2), stock:'In Stock' },
            { store:'Nilgiris Supermarket', price:price + 3, stock:'Low Stock' }
          ]
        })
      })
    })
  })
  return products.slice(0, 1000)
}

export { COLLECTIONS }
