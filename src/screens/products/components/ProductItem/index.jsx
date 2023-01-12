import React from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './style.css';
import { CartContext } from '../../../../context/Cart';
import useCart from '../../../../hooks/useCart';

const ProductItem = (props) => {
  const {addToCart} = useCart(CartContext);

  const handleAddToCart = () => {
    addToCart(props)
  }

  return (
    <Card sx={{ height: 400 }} elevation={4}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={props.img}
      />
      <CardContent>
        <Typography noWrap gutterBottom variant="h6" component="div">
          {props?.name || '?N/A'}
        </Typography>
        <Typography
          className="item-description"
          variant="body2"
          color="text.secondary"
        >
          {props?.description || 'N/A'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleAddToCart} color="primary" className="add-cart-btn" variant="contained">
          Add Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
