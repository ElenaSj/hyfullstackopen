import { useEffect, useState } from "react";
import axios from "axios"; 

const Country = ({countries,filter,selectCity,setFilter}) => {
  let filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
  if (filteredCountries.length>10) {
    selectCity(null)
    return (
      <p>Too many matches, specify your search</p>
    )
  }
  if (filteredCountries.length===0) {
    selectCity(null)
    return (
      <p>No countries found, please try another search word</p>
    )
  }
  if (filteredCountries.length===1){
    
    let country = filteredCountries[0]
    selectCity(country.capital[0])
    let languages = []

    for (const [key, value] of Object.entries(country.languages)) {
      languages.push(value)
    }
    languages=languages.map(l => <li key={l}>{l}</li>) 

    return (
      <>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital[0]}<br></br>area: {country.area}</p>
      <h3>languages</h3>
      {languages}
      <img src={country.flags.png}/>
      </>
    )
  }

  if (filteredCountries.length<=10){
    filteredCountries=filteredCountries.map(c => <p key={c.name.common}>{c.name.common}<button onClick={()=>setFilter(c.name.common)}>show</button></p>)
    return (
      <>
      {filteredCountries}
      </>
    )
  }
}

const WeatherDetail = ({weather, city}) => {

  if (weather) {
    let temp = weather.days[0].temp
    let wind = weather.days[0].windspeed/3.6
    wind = Math.round(wind * 100) / 100
    return (
      <>
      <h3>Weather in {city}</h3>
      <p>temperature {temp} degrees Celsius</p>
      <img src={`${weather.days[0].icon}.png`}/>
      <p>wind {wind} m/s</p>
      </>
    )
  }
}

const App = () => {
  const [countries, getCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [city, selectCity] = useState(null)
  const [weather, getWeather] = useState(null)
  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(()=>{
    axios.get("https://restcountries.com/v3.1/all")
    .then(response=>getCountries(response.data))
    if (city){
      axios.get("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+city+"/today?unitGroup=metric&include=days&key="+apiKey+"&contentType=json")
      .then(response=>{
        getWeather(response.data)
      })
    }
    if (!city) {
      getWeather(null)
    }
  },[city])


return (
  <div>
    Search for countries <input value={filter} onChange={ev=>setFilter(ev.target.value)} />
    <Country countries={countries} selectCity={selectCity} filter={filter} setFilter={setFilter} />
    <WeatherDetail weather={weather} city={city} />
  </div>
)
}
export default App;
