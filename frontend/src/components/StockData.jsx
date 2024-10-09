import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockLoading from './StockLoading';

export default function StockData({ symbols }) {

  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const stockDataPromises = symbols.map(async (symbol) => {
          const response = await axios.get(`/api/stock/${symbol}`);
          return {
            symbol,
            price: response.data.price.c, // Assuming 'c' is current price
            companyProfile: response.data.profile,
          };
        });

        const stocksData = await Promise.all(stockDataPromises);
        setStocks(stocksData);
      } catch (err) {
        setError('Failed to fetch stock data. Try again in a few minutes');
      //   return <div className='w-[15rem] h-[4rem] bg-zinc-100 bg-opcaity-50 flex justify-center items-center'>
      //  
      // </div>;
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbols]);

  if (loading) return <StockLoading/>


  return (
    <div className="w-[40rem] flex flex-col bg-zinc-100 rounded-xl bg-opacity-70">
    {stocks.map(({ symbol, price, companyProfile }) => (
      <div key={symbol} className="flex border-b-[1px] border-gray-200 last:border-b-[0px] h-[2.5rem]">
        <div className='relative w-full flex justify-between items-center p-4 h-full'>
          {companyProfile && (
            <div className='flex items-center gap-2 h-full'>
              <img src={companyProfile.logo} alt={`${symbol} logo`} className='w-5 h-5'/>
              <p className='text-sm font-semibold'>{companyProfile.name}</p>
            </div>
          )}
          <div className="absolute left-[15rem] flex w-[10rem]  ">
            <h4 className='text-sm text-left font-light'>{symbol}</h4>
          </div>
          <p className='text-sm font-semibold'>${price}</p>
        </div>
      </div>
    ))}
  </div>
  );
}
