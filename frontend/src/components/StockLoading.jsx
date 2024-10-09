import React from 'react'

export default function StockLoading() {
  return (
    <div className="w-[40rem] h-[30rem] flex flex-col justify-center items-center bg-zinc-100 rounded-xl bg-opacity-70 animate-pulse">
        <h1 className='text-xl font-bold'>Failed to fetch stock data. Try again in a few minutes</h1> 
    </div>
  )
}
