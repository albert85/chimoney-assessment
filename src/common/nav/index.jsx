import './style.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NavBar = () => {
  return (
    <div className="nav">
      <img
        height={30}
        src="https://logos-world.net/wp-content/uploads/2020/04/Amazon-Emblem.jpg"
        alt="logo"
      />
      <Box display='flex' alignItems='center' flexDirection='row' >
      <Badge badgeContent={0} color="primary">
        <ShoppingCartIcon />
      </Badge>
      <Typography sx={{ ml:1}}>Cart</Typography>
      </Box>
    </div>
  );
};

export default NavBar;
