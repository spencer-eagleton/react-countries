import './App.css';
import { useState, useEffect } from 'react';
import { getCountries } from './services/countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountries();
      setCountries(data);
    };
    fetchData();
  }, []);

  function filterCountries() {
    return countries.filter((country) => {
      return country.name.includes(query);
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
