import React from 'react'
import Image from 'next/image'

const cardData = [
  {
    imgSrc: '/assets/gif/pencil.gif',
    title: 'Expert Teacher',
    description: 'Develop skills for career of various majors including computer',
  },
  {
    imgSrc: '/assets/gif/doc.gif',
    title: 'Self Development',
    description: 'Develop skills for career of various majors including computer',
  },
  {
    imgSrc: '/assets/gif/remote.gif',
    title: 'Remote Learning',
    description: 'Develop skills for career of various majors including computer',
  },
  {
    imgSrc: '/assets/gif/support.gif',
    title: 'Life Time Support',
    description: 'Develop skills for career of various majors including computer',
  },
]

const WhyChooseCard = () => {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5 py-5 pb-10'>
      {cardData.map((card, index) => (
        <div key={index} className="flex flex-col items-center justify-center space-y-2">
          <Image src={card.imgSrc} className='' width={70} height={70} alt={card.title} />
          <h4 className='text-[22px]'>{card.title}</h4>
          <p className='text-sm text-center text-[#535967]'>{card.description}</p>
        </div>
      ))}
    </div>
  )
}

export default WhyChooseCard
