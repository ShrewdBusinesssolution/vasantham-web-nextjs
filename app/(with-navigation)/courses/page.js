import { AboutBanner } from '@/app/utility/components/utility-components'
import React from 'react'
import Filter from './filter'

const Course = () => {
  return (
    <main>
         <AboutBanner title={"our courses"} subtitle={"Explore our courses"}/> 
         <div>
         <Filter/>
         </div>
    </main>
  )
}

export default Course