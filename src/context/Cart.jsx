import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

function CartContextController({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [cartItems, setCartItems] = useState({});

  useEffect(()=> {
    const existingCartItems = localStorage.getItem('cart');
    if(existingCartItems && typeof existingCartItems === 'string'){
      let convertedCartItems = JSON.parse(existingCartItems);
      setCartItems(convertedCartItems)
    }
  },[])

  useEffect(() => {
    setLoading(true);
    fetch('https://api.chimoney.io/v0.2/info/assets')
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.data.giftCardsRLD.content);
        setLoading(false)
      });
  }, []);

  const checkoutProduct = (cb) => {
    setLoading(true)
    localStorage.removeItem('cart');
    setCartItems({});
    toast.success(`Checkout was successfully`);
    setLoading(false)
    cb('/')
  }


  const deleteCartItem = (product) => {
    const existingCartItems = localStorage.getItem('cart');
    let convertedCartItems = JSON.parse(existingCartItems);

    delete convertedCartItems[product.productId];

    setCartItems(convertedCartItems);

    if(Object.keys(convertedCartItems)?.length === 0){

      localStorage.removeItem('cart');
    } else {
      localStorage.setItem('cart', JSON.stringify(convertedCartItems));
    }

    toast.success(`${product.name} was successfully deleted from the cart`);
  };

  const updateCartQty = (product, qty) => {
    const existingCartItems = localStorage.getItem('cart');
    let convertedCartItems = JSON.parse(existingCartItems);
    convertedCartItems = {
      ...convertedCartItems,
      [product.productId]: {
        quantity: qty,
      },
    };

    setCartItems(convertedCartItems)

    localStorage.setItem('cart', JSON.stringify(convertedCartItems));
    toast.success(`${product.name} was successfully updated in the cart`);
  };

  const addToCart = (product) => {
    const existingCartItems = localStorage.getItem('cart');
    if (existingCartItems) {
      let convertedCartItems = JSON.parse(existingCartItems);

      const isProductExist = convertedCartItems[product.productId];

      if (!isProductExist) {
        convertedCartItems = {
          ...convertedCartItems,
          [product.productId]: {
            quantity: 1,
          },
        };
        toast.success(`${product.name} was successfully added to cart`);
      } else {
        const newQty = convertedCartItems[product.productId].quantity + 1;
        convertedCartItems = {
          ...convertedCartItems,
          [product.productId]: {
            quantity: newQty,
          },
        };
        toast.success(`${product.name} was successfully updated in the cart`);
      }
      setCartItems(convertedCartItems);
      localStorage.setItem('cart', JSON.stringify(convertedCartItems));
    } else {
      const cartItem = { [product.productId]: { quantity: 1 } };
      const stringifyCartItem = JSON.stringify(cartItem);
      toast.success(`${product.name} was successfully added to cart`);
      localStorage.setItem('cart', stringifyCartItem);
      setCartItems(stringifyCartItem);
    }
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        updateCartQty,
        deleteCartItem,
        cartItems,
        products,
        checkoutProduct,
        loading
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextController;
