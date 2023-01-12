import React, { useEffect, useState } from 'react';
import { Button, Divider, Grid, Modal, Typography } from '@mui/material';
import AppLayout from '../../hoc/appLayout';
import useCart from '../../hooks/useCart';
import './style.css'
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

function Checkout () {
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const {cartItems, products, checkoutProduct, loading} = useCart();
  const [carts, setCart] = useState([])

  useEffect(()=>{
    if(products && Object.keys(cartItems)?.length > 0){
      const cartItemProduction = Object.keys(cartItems).map((e) => parseInt(e,10));
      const filteredProduct = products.filter((product) => cartItemProduction.includes(product.productId));
      const newProduct = filteredProduct.map((product) => {
        return {
          ...product,
          qty: cartItems[product.productId].quantity,
          price: 135
        };
      })
      setCart(newProduct);
    }
  },[cartItems, products])

  const handleCheckout = () => {
    checkoutProduct(navigation);
    setOpen(false);
  }

  const handleCancelModal = () => {
    setOpen(false)
  }

  const handleConfirmModal = (prop) => {
    setOpen(true)
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="cart-desc">
          {carts?.map((cart) => (
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <img src={cart.img} alt='cart pic' width='150px' />
                </Grid>
                <Grid item xs={7}>
                  <Typography variant='h6'>{cart.name} </Typography>
                  <Typography sx={{ fontSize: 13 }} textAlign="left">{cart.description}</Typography>
                  <Typography variant='h5' textAlign="left">${cart.qty * cart.price}</Typography>
                </Grid>
                <Grid justifyContent="flex-end" item xs={2}>
                  <Typography textAlign="right">${cart.qty * cart.price}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ mb: 3}} />
                </Grid>
            </Grid>
          ))}
          <Typography sx={{ mb: 3}} variant='h6' textAlign='right'>Subtotal ({Object.keys(cartItems).length} items): ${carts.reduce((prev, curr)=> prev+(curr.qty * curr.price),0)}</Typography>
          <Box className='checkout-container'>
          <Button disabled={loading} className="checkout-btn" onClick={handleConfirmModal}>{loading ? 'Please wait...' : "Checkout"}</Button>
          </Box>
          </div>
        </Grid>
      </Grid>
      <Modal open={open} onClose>
        <Box className='confirm-modal'>
          <Typography textAlign='center'>Are you sure want Checkout all the items</Typography>
          <Box display='flex' justifyContent='space-between' mt={3}>
            <Button disabled={loading} onClick={handleCancelModal} className="confirm-btn cancel-btn ">Cancel</Button>
            <Button disabled={loading} onClick={handleCheckout} className="confirm-btn confirm-btn-btn">{loading ? "Please wait..." : "Confirm"}</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}


export default AppLayout(Checkout)