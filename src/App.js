import './App.css';
import { useState, useEffect } from 'react';
import { getCountries } from './services/countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [continent, setContinent] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountries();
      setCountries(data);
    };
    fetchData();
  }, []);

  function filterCountries() {
    return countries.filter((country) => {
      return (
        country.name.includes(query) && (country.continent === continent || continent === 'All')
      );
    });
  }

  return (
    <div className="App">
      <h1>Flags of the World</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <select value={continent} onChange={(e) => setContinent(e.target.value)}>
        <option value="All">All</option>
        <option value="North America">North America</option>
        <option value="South America">South America</option>
        <option value="Africa">Africa</option>
        <option value="Asia">Asia</option>
        <option value="Oceania">Oceania</option>
        <option value="Europe">Europe</option>
      </select>
      {filterCountries().map((c) => {
        return (
          <>
            <div key="c.id" className="name">
              {c.name};
            </div>
            <img src={`https://flagcdn.com/80x60/${c.iso2.toLowerCase()}.png`}></img>
          </>
        );
      })}
    </div>
  );
}

export default App;
