import React from 'react'
import { FaCloud } from "react-icons/fa";
import { MdOnlinePrediction } from "react-icons/md";
import { FaWind } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";




export default function WeatherData({temperature, precipitation, precipitationChance, time, rain, humidity, wind}) {
    return (
    <div className="relative w-[18rem] h-[12rem] rounded-xl bg-slate-200 bg-opacity-45">
        <div className="flex items-center justify-between p-2 w-full h-[8rem]  rounded-t-xl ">
            <div className="left flex w-1/2 h-full  justify-center items-center">
                <div className="w-[4rem] h-[3rem]  flex justify-center items-center">
                    {
                    precipitation > 0 ?
                    <div className="rainy-cloud loader">
                        <div className="snow">
                        <span style={{ '--i': 11 }}></span>
                        <span style={{ '--i': 12 }}></span>
                        <span style={{ '--i': 15 }}></span>
                        <span style={{ '--i': 17 }}></span>
                        <span style={{ '--i': 18 }}></span>
                        <span style={{ '--i': 13 }}></span>
                        <span style={{ '--i': 14 }}></span>
                        <span style={{ '--i': 19 }}></span>
                        <span style={{ '--i': 20 }}></span>
                        <span style={{ '--i': 10 }}></span>
                        <span style={{ '--i': 18 }}></span>
                        <span style={{ '--i': 13 }}></span>
                        <span style={{ '--i': 14 }}></span>
                        <span style={{ '--i': 19 }}></span>
                        <span style={{ '--i': 20 }}></span>
                        <span style={{ '--i': 10 }}></span>
                        <span style={{ '--i': 18 }}></span>
                        <span style={{ '--i': 13 }}></span>
                        <span style={{ '--i': 14 }}></span>
                        <span style={{ '--i': 19 }}></span>
                        <span style={{ '--i': 20 }}></span>
                        <span style={{ '--i': 10 }}></span>
                        </div>
                    </div>
                    :
                    <FaCloud className='text-[3rem] text-gray-200 overflow-hidden'/>
                    }
                </div> 
            </div>

            <div className="right flex flex-col w-1/2 h-full  justify-center items-center">
                <span className='font-bold text-[2.5rem]'>{temperature}°C</span>
                <span className='font-semibold pt-1 text-sm'>50.85° N, 4.84° E</span>
            </div>
        </div>

        <div className="absolute w-[95%] h-[1px] bg-slate-100 left-2 bg-opacity-25 bottom-[70px]">
        </div>            

        <div className="flex items-center rounded-b-xl  w-full h-[4rem] overflow-hidden p-1">

            <div className="flex w-1/3 h-full flex-col  items-center justify-center">
                <MdOnlinePrediction className='text-lg'/>
                <span className='font-bold text-sm '>{precipitationChance}%</span>
                <p className='text-sm'>Precipitation</p>
            </div>

            <div className="flex w-1/3 h-full flex-col items-center justify-center">
                <FaWind className='text-lg'/>
                <span className='font-bold text-sm '>{wind} km/h</span>
                <p className='text-sm'>Wind</p>
               
            </div>

            <div className="flex w-1/3 h-full flex-col  items-center justify-center">
                <FaDroplet className='text-[12px]'/>
                <span className='font-bold text-sm pt-1 '>{humidity}%</span>
                <p className='text-sm'>Humidity</p>
            </div>

            <div className="flex gap-2 justify-center items-center">
                
            </div>
        </div>
   
    </div>
    )
}
