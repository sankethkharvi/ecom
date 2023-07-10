import { Stack, Box, Typography,CardContent,CardMedia } from "@mui/material";
import { useState, useEffect } from "react";
import { fetchFromAPI } from "./utils/FetchFromApi";
import { NavLink } from "react-router-dom";


const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("products");
  const [products, setProducts] = useState([]);

  useEffect(() => {


    setProducts([]);
    fetchFromAPI(`${selectedCategory}`).then((data) =>
      setProducts(data)
    );
  }, [selectedCategory]);

  console.log(products);
  const styles = {
    textDecoration: 'none',
  };

  return (
    <Box sx={{width:"100%"}}>

<Stack
    direction="row"
    flexWrap="wrap"
    justifyContent="center"
    alignItems="start"
    gap={2}
    sx={{ backgroundColor: 'black', padding: '10px' }}
  >
    {products.map((item) => (
      <NavLink to={`${item.id}`} key={item.id} style={styles}> 
      <Box  sx={{
        display:"flex",
        width: "300px",
        height:"380px",
        boxShadow: "none",
        borderRadius: "10px",
        justifyContent: "center",
        background: "skyblue",
        alignItems:"center"
      }}>
        
    
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <CardMedia
          image={
            item?.image
          }
          alt="image"
          sx={{
            borderRadius: "15%",
            height: "180px",
            width: "300px",
            margin: "2px",
            border: "red",
            justifyContent: "center",
            
          }}
        />
        <Typography variant="h6" fontWeight="bold" color="black">
          {item?.title}{" "}
          {/* <CheckCircleIcon
            sx={{ fontSize: "14px", color: "black", ml: "5px" }}
          /> */}
        </Typography>
        {/* <Typography>{item?.description}</Typography> */}
      </CardContent>
    
  </Box>
        
    
  </NavLink>))}
  </Stack>

    

    </Box>
    
      
    
    
  )
}

export default Home