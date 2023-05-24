import { useContext, createContext, useReducer, useEffect } from 'react';
import { reducer } from './reducer.js';
import cartItems from './data.jsx';
import { getTotals } from './utils.js';
import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  IS_LOADING,
  DISPLAY_ITEMS,
} from './actions.js';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialState = {
    isLoading: false,
    cart: new Map(
      cartItems.map((item) => {
        return [item.id, item];
      })
    ),
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { totalAmount, totalCost } = getTotals(state.cart);

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };

  const increaseItem = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };

  const decreaseItem = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };

  return (
    <AppContext.Provider
      value={{ ...state, clearCart, removeItem, increaseItem, decreaseItem }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
