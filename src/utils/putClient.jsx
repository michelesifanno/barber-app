import { useState } from 'react';

function putCliente(clienteId, data) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const putData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clienti/${clienteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setResponse(result);
      } else {
        setError(result.errorMessage || 'Errore durante la richiesta API');
      }
    } catch (error) {
      setError('Errore durante la richiesta API');
    } finally {
      setLoading(false);
    }
  };

  return {
    response,
    error,
    loading,
    putData,
  };
}


export default putCliente;
