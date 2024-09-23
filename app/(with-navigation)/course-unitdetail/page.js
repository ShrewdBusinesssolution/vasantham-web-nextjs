import { CourseBanner } from '@/app/utility/components/utility-components'
import React from 'react'

const UnitDetail = () => {
    const productData = {
        students: "1500 Students",
        lessons: "6 lessons",
        rating: "4.5",
        reviews:"30"
    }

  return (
   <main>
    {/* Banner */}
    <section>
            <CourseBanner title="Design" subtitle="Photography Crash Course for
Photographer" product={productData}/>
        </section>

        
   </main>
  )
}

export default UnitDetail