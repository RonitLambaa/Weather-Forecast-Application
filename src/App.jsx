import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CurrentWeather from './components/currentWeather/CurrentWeather'
import Forecast from './components/forecast/Forecast'

import Search from './components/Search'
import { FORECAST_API_URL, WEATHER_API_KEY, WEATHER_API_URL } from './Api'

function App() {
  const [count, setCount] = useState(0)

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
    const [lat, lon] = searchData.value.split(" ")

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    const forecastFetch = fetch(`${FORECAST_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    
    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (response) => {
      const weatherResponse = await response[0].json();
      const foreCastResponse = await response[1].json();
      setCurrentWeather({city : searchData.label, ...weatherResponse});
      setForecast({city : searchData.label, ...foreCastResponse});
     })
     .catch((error)=> console.log(error))

  }
  console.log(currentWeather);
  console.log(forecast);
  
  

  return (
    <React.StrictMode><div className= 'container'>
    <Search onSearchChange={handleOnSearchChange}/>
    {currentWeather&&<CurrentWeather data = {currentWeather}/>}
    {forecast&&<Forecast data = {forecast}/>}
    </div></React.StrictMode>
    
  )
}

export default App
