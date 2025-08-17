import React, { useState } from 'react'

const Container = () => {
    const [searchCity, setSearchCity] = useState("")
    const [weatherData, setWeatherData] = useState(null)
    async function search() {
        if (!searchCity) {
            alert("Please Enter The CityName First")
            return
        }
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=280a0a168aeb4a3496f30316251307&q=${searchCity}`
        const response = await fetch(apiUrl)
        if (!response.ok) {
            alert("Error")
            return
        }
        const data = await response.json()
        if (data.error && data.error.code === 1006) {
            alert("No Matching Cities Found")
            return
        }
        setWeatherData(data)

    }
    return (
        <div className='px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[100px]'>

            <div className='flex flex-col gap-4 justify-center items-center mt-[5%] bg-gradient-to-r from-teal-200 to-teal-500 px-4 sm:px-6 md:px-8 lg:px-[30px] py-6 sm:py-8 lg:py-[40px] rounded-lg shadow-lg'>

                <div className="searchBox flex flex-col sm:flex-row items-center gap-3">
                    <input
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                        type="text" name="" id="" className='px-5 py-2 rounded-lg shadow-lg w-full sm:w-[250px] md:w-[300px]' placeholder='Enter City Name' />
                    <button
                        onClick={search}
                        type="button" className='px-5 py-2 rounded-lg shadow-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white active:bg-purple-700 duration-300 w-full sm:w-auto'>
                        Search
                    </button>
                </div>


            </div>
            {weatherData && weatherData.location && (
                <div className="cityName flex flex-col gap-1 items-center justify-center mt-6 sm:mt-8 lg:mt-[30px]">
                    <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-black text-center'>{weatherData.location.name}</h2>
                    <p className='text-sm sm:text-base text-black font-400 text-center'>
                        {weatherData.location.name}, {weatherData.location.country}
                    </p>
                    <p className='text-sm sm:text-base text-[#747c89] font-bold text-center'>
                        {weatherData.location.localtime}
                    </p>
                </div>
            )}

            {weatherData && weatherData.current && (
                <div className='flex flex-col gap-3 mt-4 sm:mt-6 lg:mt-[20px] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[170px] py-[10px]'>
                    <div className='flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 rounded-3xl shadow-2xl cursor-pointer bg-white gap-4 sm:gap-0'>
                        <div className='flex flex-row gap-2 items-center'>
                            <img src={weatherData.current.condition.icon} alt="Not Found" />
                            <div className='flex flex-col items-start'>
                                <h2 className='text-2xl sm:text-3xl lg:text-[36px] font-semibold leading-10'>{weatherData.current.temp_c}°C</h2>
                                <p className='text-sm sm:text-base lg:text-[18px] text-[rgb(89,89,89)] leading-7'>
                                    Feels Like {weatherData.current.feelslike_c}°C
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 items-center sm:items-end'>
                            <h2 className='text-base sm:text-lg lg:text-[20px] font-normal leading-7 text-center sm:text-right'>
                                {weatherData.current.condition.text}
                            </h2>
                            <p className='leading-6 text-center sm:text-right'>
                                {weatherData.current.temp_f}°F
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {weatherData && weatherData.current && (
                <div className="flex flex-col gap-4 sm:gap-6 mt-4 sm:mt-6 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[180px]">

                    {/* Row 1 */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        {/* Humidity */}
                        <div className="Humidity bg-white p-4 rounded-md shadow-lg flex flex-col items-center w-full sm:max-w-[300px] h-[180px] sm:h-[200px] justify-center gap-2">
                            <img src="https://cdn-icons-png.flaticon.com/128/13944/13944027.png" alt="Not Found" className="h-10 sm:h-12" />
                            <h2 className="text-lg sm:text-[20px] leading-7 font-semibold">Humidity</h2>
                            <h2 className="text-2xl sm:text-[32px] leading-8 text-[#2463eb] font-semibold">{weatherData.current.humidity}%</h2>
                        </div>

                        {/* Wind Speed */}
                        <div className="windSpeed bg-white p-4 rounded-md shadow-lg flex flex-col items-center w-full sm:max-w-[300px] h-[180px] sm:h-[200px] justify-center gap-2">
                            <img src="https://cdn-icons-png.flaticon.com/128/959/959711.png" alt="Not Found" className="h-10 sm:h-12" />
                            <h2 className="text-lg sm:text-[20px] leading-7 font-semibold">Wind Speed</h2>
                            <h2 className="text-2xl sm:text-[32px] leading-8 text-[#2463eb] font-semibold">{weatherData.current.wind_kph} km/h</h2>
                            <h2 className="text-xs sm:text-[14px] leading-5 text-[#6a7280] font-semibold">{weatherData.current.wind_dir} direction</h2>
                        </div>

                        {/* UV Index */}
                        <div className="uvIndex bg-white p-4 rounded-md shadow-lg flex flex-col items-center w-full sm:max-w-[300px] h-[180px] sm:h-[200px] justify-center gap-2">
                            <img src="https://cdn-icons-png.flaticon.com/128/5587/5587255.png" alt="Not Found" className="h-10 sm:h-12" />
                            <h2 className="text-lg sm:text-[20px] leading-7 font-semibold">UV Index</h2>
                            <h2 className="text-2xl sm:text-[32px] leading-8 text-[#2463eb] font-semibold">{weatherData.current.uv}</h2>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        {/* Pressure */}
                        <div className="Pressure bg-white p-4 rounded-md shadow-lg flex flex-col items-center w-full sm:max-w-[300px] h-[180px] sm:h-[200px] justify-center gap-2">
                            <img src="https://cdn-icons-png.flaticon.com/128/2930/2930091.png" alt="Not Found" className="h-10 sm:h-12" />
                            <h2 className="text-lg sm:text-[20px] leading-7 font-semibold">Pressure</h2>
                            <h2 className="text-2xl sm:text-[32px] leading-8 text-[#2463eb] font-semibold">{weatherData.current.pressure_mb} mb</h2>
                        </div>

                        {/* Visibility */}
                        <div className="Visibility bg-white p-4 rounded-md shadow-lg flex flex-col items-center w-full sm:max-w-[300px] h-[180px] sm:h-[200px] justify-center gap-2">
                            <img src="https://cdn-icons-png.flaticon.com/128/1146/1146733.png" alt="Not Found" className="h-10 sm:h-12" />
                            <h2 className="text-lg sm:text-[20px] leading-7 font-semibold">Visibility</h2>
                            <h2 className="text-2xl sm:text-[32px] leading-8 text-[#2463eb] font-semibold">{weatherData.current.vis_km} km</h2>
                        </div>

                        {/* Cloud Cover */}
                        <div className="CloudCover bg-white p-4 rounded-md shadow-lg flex flex-col items-center w-full sm:max-w-[300px] h-[180px] sm:h-[200px] justify-center gap-2">
                            <img src="https://cdn-icons-png.flaticon.com/128/414/414927.png" alt="Not Found" className="h-10 sm:h-12" />
                            <h2 className="text-lg sm:text-[20px] leading-7 font-semibold">Cloud Cover</h2>
                            <h2 className="text-2xl sm:text-[32px] leading-8 text-[#2463eb] font-semibold">{weatherData.current.cloud}%</h2>
                        </div>
                    </div>

                </div>
            )}


        </div>
    )
}

export default Container
