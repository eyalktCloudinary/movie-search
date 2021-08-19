import '../styles/Search.css';
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import useFetch from '../hooks/useFetch';

// import sampleResults from './db';

import * as utils from '../utils';
import * as apiData from '../apiData';

const generateEndpoint = utils.generateEndpoint;
const posibleTypes = apiData.default().posibleTypes;
const maxResultsInPage = apiData.default().maxResultsInPage;

function Search() {

  const [params, setParams] = useState(null);
  const [results, setResults] = useState(null); // structure { totalResults[], results }
  const [error, setError] = useState(null);
  // const [endpoint, setEndpoint] = useState(null);

  // consider using endpoint state & update params only when results are ready.
  // consider providing cb param
  const { data: newResults, error: fetchError } = useFetch(generateEndpoint(params));

  // update results
  useEffect(() => {
    if (newResults) {
      console.log("newResults", newResults);
      setResults(curResults => curResults ?
        { totalResults: newResults.totalResults, results: [...curResults.results, ...newResults.Search] } :
        { totalResults: newResults.totalResults, results: newResults.Search });
    }
  }, [newResults]);

  // handle errors
  useEffect(() => {
    if (fetchError) {
      console.log("error", fetchError);
      switch (fetchError) {
        case 'Movie not found!':
          // setError('Could not find any results for "' + query + '"');
          setError(fetchError);
          break;

        default:
          setError('We are having some issues :/\n Please try again later.');
          break;
      }
    }
    else setError(null);
  }, [fetchError]);

  const handleLoadMore = () => {
    const newParams = { ...params, page: parseInt(params.page, 10) + 1 };
    // setEndpoint(generateEndpoint(newParams));
    setParams(newParams);
  }

  const handleSearchGo = (input) => {
    if (!input.str) return;
    setError(null);
    const type = input.type.toLowerCase();
    const s = input.str;
    let newParams;
    if (!type || (type && type === 'all types')) {
      newParams = { s, page: 1 };
    }
    else {
      newParams = { s, page: 1, type };
    }
    // setEndpoint(generateEndpoint(newParams));
    if (params && (params.s === newParams.s && params.page === newParams.page && params.type === newParams.type)) return;
    setResults(null);
    setParams(newParams);
    console.log("go");
  }

  return (
    <div className="search">
      <SearchBar onSearchGo={handleSearchGo} types={posibleTypes} resetError={() => setError(null)} />
      {
        results && params && !error &&
        <SearchResults
          results={results.results}
          onLoadMore={handleLoadMore}
          amountOfResults={results.totalResults}
          maxResultsInPage={maxResultsInPage}
          searchQuery={params}
        /> 
      }
      {
        error && 
        <div className="search-error">
          <h2>{error}</h2>
        </div>
      }
    </div>
  );
}

export default Search;
