import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList';
import Pagination from './components/Pagination';
import axios from "axios";



// https://pokeapi.co/api/v2/pokemon

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [prevPageUrl, setPrevPageUrl] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken(c => cancel = c)
      })
      .then(res => {
        setLoading(false)
        setNextPageUrl(res.data.next) 
        setPrevPageUrl(res.data.previous) 
        setPokemon(res.data.results.map(p => p.name))
        console.log(res.data.results)
        });

        return () => {
          cancel()
        }
  }, [currentPageUrl]);

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if(loading) return "Loading..."

  return (
    <div className="App">
      <h1>Pokemon API</h1>
      <PokemonList pokemon={pokemon} />
      <Pagination 
      goToNextPage={nextPageUrl ? goToNextPage : null} 
      goToPrevPage={prevPageUrl ? goToPrevPage : null}/>
    </div>
  );
}

export default App;
