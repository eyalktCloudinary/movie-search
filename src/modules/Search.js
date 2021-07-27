import '../styles/Search.css';
import { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

// import sampleResults from './db';

function Search() {

  const [currParams, setCurrParams] = useState({});
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  const apikey = process.env.REACT_APP_OMDB_KEY;
  const baseEndpoint = 'http://www.omdbapi.com/?';
  const posibleTypes = ['All Types', 'Movie', 'Series', 'Episode']; 

  // parse params oobj to search query
  const parseParams = (params) => {
    let queryArr = [];
    for (let p in params) {
      queryArr.push(p + '=' + params[p])
    }
    queryArr.push('apikey=' + apikey)
    return queryArr.join('&');
  }

  // get results from BE
  const fetchResults = async (params, newSearch) => {
    const query = parseParams(params);
    const endpoint = baseEndpoint + query;
    
    console.log("fetching", params, query);
    return await fetch(endpoint)
      .then(response => {
        if (!response.ok) throw Error('Server returned error');
        return response.json();
      })
      .then(data => {
        console.log("data", data);
        if (data.Error) {
          setResults([]);
          throw Error(data.Error);
        }
        if (newSearch) setResults([ data ]);
        else setResults([...results, data]);
        setCurrParams(params);
        setPage(params.page);
        console.log("results", results);
        return data;
      })
      .catch(err => console.log(err));
  } 

  const handleLoadMore = async () => {
    const newParams = { ...currParams, page: page+1 };
    return await fetchResults(newParams, false);
  }

  const handleSearchGo = async (input) => {
    if (!input.str) return; 
    const type = input.type.toLowerCase();
    const s = input.str;
    if ( !type || (type && type === "all types")) {
      return await fetchResults({ s, page:1 }, true);
    } 
    else await fetchResults({ s, page:1, type }, true);
  }

  return (
    <div className="search">
      <SearchBar onSearchGo={handleSearchGo} types={posibleTypes} />
      <SearchResults results={results} onLoadMore={handleLoadMore} />
    </div>
  );
}

export default Search;
