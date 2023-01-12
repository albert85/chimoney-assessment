import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './style.css';

const ProductItem = (props) => {
  return (
    <Card sx={{ height: 350 }} elevation={4}>
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
    </Card>
  );
};

export default ProductItem;
