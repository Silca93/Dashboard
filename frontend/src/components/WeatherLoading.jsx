import React from 'react'

export default function WeatherLoading() {
  return (
    <div className="flex flex-col pt-2 items-center w-[14rem] h-[10rem] rounded-xl bg-slate-200 bg-opacity-45 animate-pulse">
        <p className='text-black font-semibold'>Current temperature:</p>
    </div>
  )
}
