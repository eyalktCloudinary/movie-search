import { useEffect } from "react";
import { useState } from "react";

const useFetch = (endpoint) => {
  // const [currParams, setCurrParams] = useState({});
  const [data, setData] = useState([]);
  // const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  // const query = parseParams(params);
  // const endpoint = baseEndpoint + query;

  useEffect(() => {
    fetch(endpoint)
      .then(response => {
        if (!response.ok) throw Error('could not fetch data');
        return response.json();
      })
      .then(data => {
        // console.log('data', data);
        if (data.Error) throw Error(data.Error);
        
        // if (newSearch) setResults([data]);
        // else setResults([...results, data]);
        else {
          setData(data);
          setError(null); ///?
        }
        // setCurrParams(params);
        // setPage(params.page);
        // console.log('results', results);
        return data;
      })
      .catch(err => setError(err.message));
  }, [endpoint])

  return { data, error };
}

export default useFetch;



