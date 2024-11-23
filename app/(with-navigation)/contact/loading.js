import React from 'react'
import { LuLoader2 } from 'react-icons/lu'

export default function Loading() {
    return (
        <div className='grid place-items-center py-20'>
            <LuLoader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
    )
}
