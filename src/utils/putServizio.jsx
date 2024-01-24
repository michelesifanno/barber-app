import { useState } from 'react';

function usePutServizio() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const putServizio = async (serviziId, data) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/servizi/${serviziId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.errorMessage || 'Errore durante la richiesta API');
      }

      setResponse(result.data);
    } catch (error) {
      setError(error.message || 'Errore durante la richiesta API');
    } finally {
      setLoading(false);
    }
  };

  return {
    response,
    error,
    loading,
    putServizio,
  };
}

export default usePutServizio;