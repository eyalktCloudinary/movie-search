import { useEffect } from "react";
import { useState } from "react";

const useFetch = (endpoint) => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (endpoint) {
      console.log("fetch", endpoint);
      fetch(endpoint)
        .then(response => {
          if (!response.ok) throw Error('could not fetch data');
          return response.json();
        })
        .then(data => {
          if (data.Error) throw Error(data.Error);
          else {
            setData(data);
            setError(null); //
          }
        })
        .catch(err => setError(err.message));
    }
  }, [endpoint])

  return { data, error };
}

export default useFetch;



