import {useState,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Box, Typography, Button ,IconButton,TextField} from '@mui/material';
import { MdDelete } from "react-icons/md";

function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState('');
  const [isAddressFilled, setIsAddressFilled] = useState(false);
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  },[])

  const handleCheckout = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
    setIsOrderSuccessful(true);

    setTimeout(() => {
      setIsOrderSuccessful(false);
      navigate('/');
    }, 3000);
  };

  const handleDeleteItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    setIsAddressFilled(event.target.value !== '');
  };


  return (
    <Box sx={{ marginTop: '70px', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '500px', p: '20px' }}>
      <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>

        <TextField
          label="Address"
          variant="outlined"
          value={address}
          onChange={handleAddressChange}
          fullWidth
          sx={{ mb: '20px' }}
        />

        {cartItems.length > 0 ? (
          <Box>
            {cartItems.map((item, index) => (
              <Box
                key={index}
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}
              >
                <Typography variant="subtitle1">{item.title}{"  "}</Typography>
                <Typography variant="subtitle1" sx={{pl:"20px"}}>
                  {item.price} x {item.quantity}{"   "}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' ,pl:"20px"}}>
                  <Typography variant="subtitle1">${item.totalPrice}</Typography>
                  <IconButton
                    color="error"
                    aria-label="delete"
                    size="small"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <MdDelete />
                  </IconButton>
                </Box>
              </Box>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '20px' }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">
                ${cartItems.reduce((total, item) => total + item.totalPrice, 0)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={handleCheckout}
              disabled={!isAddressFilled}
              sx={{ mt: '20px' }}
            >
              Checkout
            </Button>
          </Box>
        ) : (
          <Typography variant="subtitle1">
            Your cart is empty. <Link to="/">Continue shopping</Link>
          </Typography>
        )}

{isOrderSuccessful && (
          <Typography variant="subtitle1" sx={{ mt: '20px', color: 'green' }}>
            Order placed successfully! Redirecting to home page...
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default CheckoutPage;