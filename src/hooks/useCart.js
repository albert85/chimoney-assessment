import { useContext } from 'react';
//
import { CartContext } from '../context/Cart';

const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) throw new Error('Cart context must be use inside Cart Provider');

  return context;
};

export default useCart;
