import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ProductItem from './components/ProductItem';
import './style.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://api.chimoney.io/v0.2/info/assets')
      .then((res) => res.json())
      .then((res) => setProducts(res.data.giftCardsRLD.content));
  }, []);

  console.log('****', products[0]);

  return (
    <div>
      <Grid className='container' container spacing={2}>
        {React.Children.toArray(
          products.map((product) => (
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <ProductItem {...product} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default Products;
