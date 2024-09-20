"use client"
import React, {useState} from 'react'

const Chapters = () => {
    const [progress, setProgress] = useState(100); // Initial progress set to 100

    const handleInputChange = (event) => {
      setProgress(event.target.value); // Update progress based on input value
    };

  return (
<main className='bg-[#FCFCFC] px-16'>
    <div className='brand-container rounded-lg bg-[#f7f7f7] '>
        <div className='p-5 flex flex-row justify-between'>
    <div className='flex flex-col gap-4'>
        <div className="flex items-center gap-2">
            <h3 className="text-[20px] font-medium text-[#535967]">Unit 1</h3>
            <p className="p-1 text-sm text-white px-4 bg-green-600 rounded-full">Completed</p>
        </div>
        <h3 className="text-[24px] text-[#222222]">Introduction to Mathematics</h3>
    </div>



    <div className="flex flex-col items-center justify-center">
  {/* Progress Indicator */}
  <h1 className="text-xl font-semibold text-blue-700">{progress}%</h1>

  {/* Progress Bar Wrapper */}
  <div className="relative w-full h-4 bg-red-300 rounded-full mt-2">
    {/* Static Background Bar */}
    <div className="absolute top-0 left-0 h-full bg-gray-300 rounded-full" style={{ width: '100%' }}></div>
    {/* Moving Green Bar */}
    <div 
      className="h-full bg-green-500 rounded-full" 
      style={{ width: `${progress}%` }}
    ></div>
  </div>

  {/* Input Range for Progress Control */}
  <input 
    type="range" 
    min="0" 
    max="100" 
    value={progress} 
    onChange={handleInputChange} 
    className="mt-2 w-full"
  />
</div>

    
    </div>


    </div>
</main>
)
}

export default Chapters