// useClienti.js

import { useReducer, useState } from 'react';

// Definisci l'azione per aggiungere un cliente
const ADD_CLIENTE = 'ADD_CLIENTE';

// Il tuo reducer
const clientiReducer = (state, action) => {
  switch (action.type) {
    case ADD_CLIENTE:
      return [...state, action.payload];
    // Aggiungi altri casi se necessario
    default:
      return state;
  }
};

const addClient = () => {
  // Inizializza lo stato dei clienti con un array vuoto
  const [clienti, dispatch] = useReducer(clientiReducer, []);
  const [clientiLoading, setClientiLoading] = useState(false);
  const [clientiError, setClientiError] = useState(false);

  return { clienti, dispatch, clientiLoading, clientiError };
};

export default addClient;
