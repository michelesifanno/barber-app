
const deleteClient = async (clientId) => {
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clienti/${clientId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        throw new Error(error.errorMessage || 'Errore durante la richiesta API');
      }

        console.log('Cliente rimosso con successo!');

    } catch (error) {
      console.error(error);
      throw new Error('Errore durante la richiesta API');
    }
  };
  
  export default deleteClient;
  