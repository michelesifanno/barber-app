import { useState, useEffect } from 'react';

function useGetServizi() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/servizi`, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
          },
        });

        const result = await response.json();

        if (response.ok) {
          setData(result);
        } else {
          setError(result.errorMessage || 'Errore durante la richiesta API');
        }
      } catch (error) {
        setError('Errore durante la richiesta API');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    error,
    loading,
  };
}

export default useGetServizi;

