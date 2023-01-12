import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ProductItem from './components/ProductItem';
import './style.css';
import AppLayout from '../../hoc/appLayout';

const Products = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true)
    fetch('https://api.chimoney.io/v0.2/info/assets')
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        setProducts(res.data.giftCardsRLD.content)
      });
  }, []);

  return (
    <div className='container'>
      <Grid container spacing={2}>
        {!loading && React.Children.toArray(
          products.map((product) => (
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <ProductItem {...product} />
            </Grid>
          ))
        )}
        {
          loading && (
          <Box height='100vh' width='100%' justifyContent='center' alignItems='center' display='flex'><CircularProgress /></Box>)
        }
      </Grid>
    </div>
  );
};

export default AppLayout(Products);
