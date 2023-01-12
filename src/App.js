import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Container from '@mui/material/Container'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Products from './screens/products';
import NavBar from './common/nav';



function App() {
  return (
    <Container className='app'>
      <NavBar />
    <Router>
      <Routes>
        <Route path='/' element={<Products />}/>
        <Route path='/:productId' />
        <Route path='/checkout' />
      </Routes>
    </Router>
    </Container>
  );
}

export default App;
