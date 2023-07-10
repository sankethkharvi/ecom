import './App.css';
import { Container, Typography ,Box} from '@mui/material';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from './components';
import { Home,About,Contact } from './pages';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';



function App() {
  return (

    <BrowserRouter>
    <Box >
      <NavBar />
      <Routes>
        <Route exact path="/"  element={<Home />} />
        <Route path="/:id" element={<ProductDetails/>} />
        <Route path="/about"  element={<About />} />
        <Route path="/contact"  element={<Contact />} />
        <Route path='/cart' element={<CartPage/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>
      </Routes>
    </Box>
  </BrowserRouter>
  );
}

export default App;
