import { ProductCard } from '@/app/utility/components/utility-components'
import React from 'react'

const Favourite = () => {

  const products = [
    { id: 1, imageSrc: "/assets/product/product-1.webp", price: "₹120.00", category: "Science", rating: 4.5, reviewCount: 20, title: "Photography Crash Course for Photographers", students: "100 Students", lessons: "6 Lessons" },
    { id: 2, imageSrc: "/assets/product/product-1.webp", price: "₹120.00", category: "Multi Media", rating: 4.5, reviewCount: 20, title: "Photography Crash Course for Photographers", students: "1500 Students", lessons: "4 Lessons" },
    { id: 2, imageSrc: "/assets/product/product-1.webp", price: "₹120.00", category: "Multi Media", rating: 4.5, reviewCount: 20, title: "Photography Crash Course for Photographers", students: "1500 Students", lessons: "4 Lessons" },
];


  return (
<main>
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center'>
  {products.map(product => (
                    <ProductCard key={product.id} product={product} homePage={true}/>
                ))}
  </div>
</main>
  )
}

export default Favourite