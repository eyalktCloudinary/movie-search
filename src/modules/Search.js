import '../styles/Search.css';
import { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

// import sampleResults from './db';

function Search() {

  const [currParams, setCurrParams] = useState({});
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [errors, setErrors] = useState([]);

  const apikey = process.env.REACT_APP_OMDB_KEY;
  const baseEndpoint = 'http://www.omdbapi.com/?';
  const posibleTypes = ['All Types', 'Movie', 'Series', 'Episode']; 
  const maxResultsInPage = 10;

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
    
    console.log('fetching', params, query);
    return fetch(endpoint)
      .then(response => {
        if (!response.ok) throw Error('Server returned error');
        return response.json();
      })
      .then(data => {
        console.log('data', data);
        if (data.Error) {
          setResults([]);
          handleSearchErrors(data, params);
        }
        if (newSearch) setResults([ data ]);
        else setResults([...results, data]);
        setCurrParams(params);
        setPage(params.page);
        console.log('results', results);
        return data;
      })
      .catch(err => console.log(err));
  } 

  const handleLoadMore = async () => {
    const newParams = { ...currParams, page: page+1 };
    return fetchResults(newParams, false); 
  }

  const handleSearchGo = async (input) => {
    if (!input.str) return; 
    resetErrors();
    const type = input.type.toLowerCase();
    const s = input.str;
    if ( !type || (type && type === 'all types')) {
      return fetchResults({ s, page:1 }, true);
    } 
    else return fetchResults({ s, page:1, type }, true);
  }

  const handleSearchErrors = (data, params) => {
    let msg;
    switch (data.Error) {
      case 'Movie not found!':
        msg = 'Could not find any results for "' + params.s + '"';
        setErrors([...errors, { msg }]);
        break;
    
      default:
        msg = 'We are having some issues :/\n Please try again later.'
        setErrors([...errors, { msg }]);
        break;
    }
    throw Error(data.Error);
  }

  const resetErrors = () => {
    setErrors([]);
  }

  return (
    <div className="search">
      <SearchBar onSearchGo={handleSearchGo} types={posibleTypes} resetErrors={resetErrors} />
      { 
        errors.length === 0 ?
          results.length > 0 && 
            <SearchResults 
              results={results} 
              onLoadMore={handleLoadMore} 
              page={page} 
              amountOfResults={ results[0].totalResults }
              maxResultsInPage={maxResultsInPage}
              searchQuery={currParams.s}
              /> :
          <div className="search-error">
            <h2>{ errors[errors.length-1].msg }</h2>
          </div>
      }
    </div>
  );
}

export default Search;
