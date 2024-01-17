import { useState } from 'react';

function postEvent() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/prenotazioni`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.errorMessage || 'Errore durante la richiesta API');
      }

      setResponse(result);
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
    postData,
  };
}

export default postEvent;
