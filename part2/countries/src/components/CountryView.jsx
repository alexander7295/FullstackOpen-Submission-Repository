import axios from "axios"
import { useState, useEffect } from "react"
const apiKey = import.meta.env.VITE_WEATHER_KEY

const CountryView = ({ country, handleClick }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&appid=${apiKey}`)
    .then(response => {
      setWeather(response.data)
    })
  }, [country])

  const iconCode = weather?.weather?.[0]?.icon
  const weatherIcon = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    : null

  return (
    <div>
      <h1>{country.name.common}</h1>
      {handleClick 
        ? <button onClick={() => handleClick(null)}>Unselect</button>
        : <></>
      }
      <div>Capital {country.capital[0]}</div>
      <div>Area {country.area}</div>
      <h1>Languages</h1>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png}/>
      {weather 
        ? (<>
            <h1>Weather in {country.capital[0]}</h1>
            <div>Temperature {weather.main.temp} Celsius</div>
            <div>{weatherIcon && <img src={weatherIcon}/>}</div>
            <div>Wind {weather.wind.speed} m/s</div>
          </>
          )
        : "Loading weather data"
      }
      
    </div>
  )
  
}

export default CountryView