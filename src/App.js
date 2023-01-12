import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Products from './screens/products';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartContext from './context/Cart';
import Cart from './screens/cart';
import Checkout from './screens/checkout';



function App() {
  return (
    <CartContext>
    <div className='app'>
    <Router>
      <Routes>
        <Route path='/' element={<Products />}/>
        <Route path='/:productId' />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </Router>
    <ToastContainer />
    </div>
    </CartContext>
  );
}

export default App;
