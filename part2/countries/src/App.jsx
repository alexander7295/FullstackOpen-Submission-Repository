import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then(response => setCountries(response.data))
  },[])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  
  const countriesToShow = search === "" ? countries : countries.filter(country => 
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  const numberOfMatches = countriesToShow.length

  let contentToRender

  if (numberOfMatches > 10) {
    contentToRender = <div>Too many matches, specify another filter</div>
  }
  else if (numberOfMatches === 1) {
    const country = countriesToShow[0]
    
    contentToRender = (
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital[0]}</div>
        <div>Area {country.area}</div>
        <h1>Languages</h1>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png}/>
      </div>
    )
  }
  else {
    contentToRender = countriesToShow.map(country => <div key={country.name.common}>{country.name.common}</div>)
  }

  return (
    <div>
      <div>
        Find Countries <input value={search} onChange={handleSearch}/>
      </div>
      <div>
        List of Countries
        {contentToRender}
      </div>
    </div>
  )
}

export default App