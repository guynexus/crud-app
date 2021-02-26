import { useState, useEffect } from "react";

function useFetch( url = '/api/employees/', options = {
  method: 'GET',
  headers : { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
   }
}) {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchUrl() {

    setLoading(true);

    try {

      const response = await fetch(url, options);
      const json = await response.json();
      console.log(json)

      setData(json.data);
      setLoading(false);

    } catch (err){

      console.log(err);
      setError(err);

    }

  }

  // eslint-disable-next-line
  useEffect(() => {fetchUrl();  }, []);

  return [ data, error, loading];
  
}

export { useFetch };
