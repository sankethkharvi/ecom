import { fetchFromAPI } from '../pages/utils/FetchFromApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box,Image,Card,CardContent,CardMedia,Typography, Divider, Button } from '@mui/material';

function ProductDetails() {
  const [product, setProduct] = useState({});
  const [productPrice, setProductPrice] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(productPrice);
  const [cart, setCart] = useState([]);

  const { id } = useParams();
  const navigate=useNavigate();

  useEffect(() => {
    fetchFromAPI(`products/${id}`).then((data) => {
      setProduct(data);
      setProductPrice(data.price);
    });
  }, [id]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    setTotalPrice(quantity * productPrice);
  }, [quantity, productPrice]);

  const handleAddToCart = () => {
    setIsClicked(true);
    setTotalPrice(quantity * productPrice);

    const updatedProduct = { ...product, quantity, totalPrice };
    const updatedCart = [...cart, updatedProduct];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);

    const updatedCart = cart.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: newQuantity, totalPrice: newQuantity * productPrice };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const goToCart=()=>{
    navigate("/checkout")

  }

  return (

    <Box sx={{marginTop:"70px",display:"flex",flexDirection:"column",pl:'100px'}} > 
    <Box sx={{borderRadius:"15%",pl:"100px",display:"flex",flexDirection:"column"}}>
    <img
      src={product?.image ||""}
      style={{ height:"290px",borderRadius:"15%",width:"200px"}}
    
      />

      <Typography gutterBottom variant="h5" component="div">
           {product.title}
       </Typography>
       {isClicked ? (
        <div>
          <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
          <p>Total Price: ${totalPrice}</p>
        </div>
      ) : (
        <div>
          <p>Product Price: ${productPrice}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      )}
       
    </Box > 
    <Divider  orientation="vertical" flexItem/>
    <Typography variant="body2" color="text.secondary" sx={{pt:"20px"}}>
         {product.description}
    </Typography>

     <button onClick={goToCart} style={{width:"250px",display:'flex'}}>
      Go to Cart
      </button>  

    </Box>
    
  );
}

export default ProductDetails;