// clientiReducer.js
export const clientiReducer = (state, action) => {
    switch (action.type) {
      case 'SET_CLIENTI':
        return { ...state, clienti: action.payload };
      case 'ADD_CLIENTE':
        return { ...state, clienti: [...state.clienti, action.payload] };
      default:
        return state;
    }
  };
  