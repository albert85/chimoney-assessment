import React, { useEffect, useState } from 'react';
import { Button, Divider, Grid, Modal, Typography } from '@mui/material';
import AppLayout from '../../hoc/appLayout';
import useCart from '../../hooks/useCart';
import './style.css';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

function Cart() {
  const [open, setOpen] = useState(false);
  const [deletedProduct, setDeletedProp] = useState({});
  const { cartItems, products, updateCartQty, deleteCartItem } = useCart();
  const [carts, setCart] = useState([]);

  useEffect(() => {
    const checkCartItemn = typeof cartItems === 'string' ? JSON.parse(cartItems) : cartItems
    if (products && Object.keys(checkCartItemn)?.length > 0) {
      const cartItemProduction = Object.keys(checkCartItemn).map((e) =>
        parseInt(e, 10)
      );
      const filteredProduct = products.filter((product) =>
        cartItemProduction.includes(product.productId)
      );
      const newProduct = filteredProduct.map((product) => {
        return {
          ...product,
          qty: checkCartItemn[product.productId].quantity,
          price: 135,
        };
      });
      setCart(newProduct);
    } else {
      setCart([])
    }
  }, [cartItems, products]);

  const increaseBtn = (prop) => {
    updateCartQty(prop, prop.qty + 1);
  };

  const decreaseBtn = (prop) => {
    if (prop.qty > 1) {
      updateCartQty(prop, Math.max(1, prop.qty - 1));
    }
  };

  const handleDeleteCartItem = () => {
    deleteCartItem(deletedProduct);
    setOpen(false);
  };

  const handleCancelModal = () => {
    setOpen(false);
  };

  const handleConfirmModal = (prop) => {
    setOpen(true);
    setDeletedProp(prop);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <div className="cart-desc">
            {
              carts?.length === 0 && (<Typography textAlign='center'>No Items Available</Typography>)
            }
            {carts?.map((cart) => (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <img src={cart.img} alt="cart pic" width="150px" />
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="h6">{cart.name} </Typography>
                  <Typography sx={{ fontSize: 13 }} textAlign="left">
                    {cart.description}
                  </Typography>
                  <Typography variant="h5" textAlign="left">
                    ${cart.qty * cart.price}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={2}>
                    <Button
                      onClick={() => decreaseBtn(cart)}
                      className="decrease-btn"
                    >
                      -
                    </Button>
                    <Typography sx={{ mx: 2 }}>{cart.qty}</Typography>
                    <Button
                      sx={{ mr: 5 }}
                      onClick={() => increaseBtn(cart)}
                      className="increase-btn"
                    >
                      +
                    </Button>
                    <DeleteIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleConfirmModal(cart)}
                    />
                  </Box>
                </Grid>
                <Grid justifyContent="flex-end" item xs={2}>
                  <Typography textAlign="right">
                    ${cart.qty * cart.price}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ mb: 3 }} />
                </Grid>
              </Grid>
            ))}
            { carts?.length > 0 && (<Typography sx={{ mb: 3 }} variant="h6" textAlign="right">
              Subtotal ({Object.keys(cartItems).length} items): $
              {carts.reduce((prev, curr) => prev + curr.qty * curr.price, 0)}
            </Typography>)}
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
          <div className="info-section">
            <div className="checkout-info">
              <Typography>
                Subtotal ({Object.keys(cartItems).length} items): $
                {carts.reduce((prev, curr) => prev + curr.qty * curr.price, 0)}
              </Typography>
              <div className="gift-order">
                <input type="checkbox" />
                <Typography>This order contains a gift</Typography>
              </div>
              {carts?.length > 0 && (<Link className="checkout-btn-a" to="/checkout">
                <Button className="checkout-btn">Proceed to checkout</Button>
              </Link>)}
            </div>
          </div>
        </Grid>
      </Grid>
      <Modal open={open} onClose>
        <Box className="confirm-modal">
          <Typography textAlign="center">
            Are you sure want to remove this cart item
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              onClick={handleCancelModal}
              className="confirm-btn cancel-btn "
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteCartItem}
              className="confirm-btn confirm-btn-btn"
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AppLayout(Cart);
