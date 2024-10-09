const api_key = import.meta.env.VITE_API_KEY || "XEKUVW8F5ITEXFK9"

export const getStockData = async (symbol ) => {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}IBM&apikey=${api_key}`)
    const data  = await response.json()
    console.log(data);
    
    return data
}
