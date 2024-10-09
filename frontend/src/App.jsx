import { useState, useEffect } from 'react';
import WeatherLoading from './components/WeatherLoading';
import './App.css';
import StockData from './components/StockData';
import WeatherData from './components/WeatherData';
import NewsData from './components/NewsData';
import NasaData from './components/NasaData';

function Weather() {
  const [time, setTime] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [precipitationChance, setPrecipitationChance] = useState(null);
  const [precipitation, setPrecipitation] = useState(null);
  const [rain, setRain] = useState(0)
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [loading, setLoading] = useState(true);

  const stockSymbols = [
    "AAPL", "GOOGL", "TSLA", "MSFT", 
    "AMZN", "META", "NVDA", "BRK.A", 
    "JPM", "JNJ", "XOM", "INTC"
  ];

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await fetch(
          // 'https://api.open-meteo.com/v1/forecast?latitude=50.85&longitude=4.85&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,rain,snowfall&timezone=Europe%2FBerlin'
          'https://api.open-meteo.com/v1/forecast?latitude=50.85&longitude=4.85&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,rain,snowfall,wind_speed_10m&timezone=Europe%2FBerlin'
        );
        const data = await response.json();

        const currentDate = new Date();
        currentDate.setMinutes(0, 0, 0);
        const timezoneOffset = 2; // CEST is UTC+2
        currentDate.setHours(currentDate.getHours() + timezoneOffset);
        const currentTime = currentDate.toISOString().slice(0, 16);
        
        setTime(currentTime);
        
        const timeIndex = data.hourly.time.indexOf(currentTime);
        
        if (timeIndex !== -1) {
          const precipitationChance = data.hourly.precipitation_probability ? data.hourly.precipitation_probability[timeIndex] : "no data available";
          const currentTemp = data.hourly.temperature_2m[timeIndex];
          const precipitation = data.hourly.precipitation[timeIndex];
          const rain = data.hourly.rain[timeIndex];
          const currentHumidity = data.hourly.relative_humidity_2m[timeIndex]
          const currentWind = data.hourly.wind_speed_10m[timeIndex]

          setTemperature(currentTemp);
          setPrecipitationChance(precipitationChance);
          setPrecipitation(precipitation);
          setRain(rain)
          setHumidity(currentHumidity)
          setWind(currentWind)
          console.log(rain);
          
        } else {
          console.error('Current time not found in the data');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    setInterval(() => {
      getWeather();
    }, 1800000);

    getWeather();
  }, []);

  return (
    <div className='background w-dvw h-dvh'>
      <div className='w-full h-[40%] flex'>
        <div className="retlative topLeft w-[50%] h-full flex justify-center items-center pl-[12rem]">
          <h1 className='absolute left-6 top-6 font-bold text-3xl text-white'>Dashboard</h1>
          {loading ? 
            <WeatherLoading/>
            :
            <WeatherData temperature={temperature} 
            precipitation={precipitation} precipitationChance={precipitationChance}
            time={time} rain={rain} humidity={humidity} wind={wind}
            />
          }
        </div>

        <div className="topRight w-[50%] h-full flex justify-center items-center">
          <NasaData/>
        </div>
      </div>

      <div className="w-full h-[60%] flex">

        <div className="botLeft flex flex-col w-[50%] h-full justify-center  items-end  pr-[4rem]">
          <StockData symbols={stockSymbols} /> {/* Pass array of symbols here */}
        </div>

        <div className="botRight w-[50%] h-full flex justify-center items-center">
          <NewsData/>
        </div>
      </div>
    </div>
  );
}

export default Weather;
