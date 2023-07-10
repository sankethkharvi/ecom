import React from 'react';
import { Stack,Box, Typography } from '@mui/material';
import { FiShoppingCart } from "react-icons/fi";
import { NavLink } from 'react-router-dom';

const NavBar = () => {

    const styles = {
        textDecoration: 'none',
      };
    return (
        <Box sx={{justifyContent:'space-between',flexDirection:"row",display:'flex',height:"60px",backgroundColor:"yellow",alignItems:"center"}}>
             <NavLink to="/" activeClassName="active-link" style={styles}>
             <Typography variant='1' fontWeight="bold" fontSize="24px">
                             NIVEUS ECOMMERCE
                                      </Typography>
             
             </NavLink>
            
            
            
            <Box  sx={{display:"flex",flexDirection:"row",paddingLeft:"400px",justifyContent:'space-around',width:"20%"}}>

                <NavLink to="/" activeClassName="active-link" style={styles}>
                <Typography variant='1' fontWeight="bold">
                   Home
                </Typography>
                </NavLink>

                <NavLink to="about" activeClassName="active-link" style={styles}>
                <Typography variant='1' fontWeight="bold">
                    About
                </Typography>


                </NavLink>

               

                <NavLink to="contact" activeClassName="active-link" style={styles} > 
                <Typography variant='1' fontWeight="bold">
                    Contact
                </Typography>
                </NavLink>

               
                
                
            </Box>
            
            <NavLink to="checkout" sx={{width:"max-content"}}>
            <FiShoppingCart style={{ fontSize: '25px', fontWeight: 'bold' ,paddingRight:"30px" }}/>

            </NavLink>
        </Box>
    );
};

export default NavBar;