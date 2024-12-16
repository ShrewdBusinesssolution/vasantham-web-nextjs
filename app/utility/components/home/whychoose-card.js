import React from 'react'
import Image from 'next/image'

const cardData = [
  {
    imgSrc: '/assets/svg/math/m.svg',
    title: 'Multifaceted materials',
    description: 'Develop skills for career of various majors including computer',
  },
  {
    imgSrc: '/assets/svg/math/a.svg',
    title: 'Analytical approach',
    description: 'Develop skills for career of various majors including computer',
  },
  {
    imgSrc: '/assets/svg/math/t.svg',
    title: 'Top class faculties',
    description: 'Develop skills for career of various majors including computer',
  },
  {
    imgSrc: '/assets/svg/math/h.svg',
    title: 'Home-class culture',
    description: 'Develop skills for career of various majors including computer',
  },
]

const WhyChooseCard = () => {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5 py-5 '>
      {cardData.map((card, index) => (
        <div key={index} className="flex flex-col items-center justify-center space-y-2">
          <Image src={card.imgSrc} className='h-[70px] w-auto' width={70} height={70} alt={card.title} />
          <h4 className='text-[22px]'>{card.title}</h4>
        </div>
      ))}
    </div>
  )
}

export default WhyChooseCard
