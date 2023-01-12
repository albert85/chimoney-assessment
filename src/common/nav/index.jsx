import React from 'react';
import './style.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useCart from '../../hooks/useCart';
import { CartContext } from '../../context/Cart';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const {cartItems} = useCart(CartContext);

  const notiCount = React.useMemo(()=> typeof cartItems === 'string' ? JSON.parse(cartItems) : cartItems, [cartItems]);

  return (
    <div className="nav">
      <img
        height={30}
        src="https://logos-world.net/wp-content/uploads/2020/04/Amazon-Emblem.jpg"
        alt="logo"
      />
      <Link className='cart-text' to="/cart">
      <Box display='flex' alignItems='center' flexDirection='row' >
      <Badge badgeContent={(notiCount && Object.keys(notiCount)?.length) || 0} color="primary">
        <ShoppingCartIcon />
      </Badge>
      <Typography sx={{ ml:1,}}>Cart</Typography>
      </Box>
      </Link>
    </div>
  );
};

export default NavBar;
