const getEvent = async () => {
    const queryParams = new URLSearchParams({
      nome: 'string',
      cognome: 'string',
      page: 0,
      size: 0,
      sort: 'string',
      allPages: true,
    });
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clienti?${queryParams}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
  
      const result = await response.json();
      console.log('Risposta dalla richiesta di prenotazioni:', result);
    } catch (error) {
      console.error('Errore nella richiesta di prenotazioni:', error.message);
    }
  };
  
  // Chiamare la funzione per ottenere le prenotazioni  
  export default getEvent;