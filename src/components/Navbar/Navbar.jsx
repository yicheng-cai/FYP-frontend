import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart} from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/commerce.png'
import useStyles from './style';
 
const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();
    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={ Link } to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
                        shopping 
                    </Typography>                    
                    <div className={classes.grow} />
                    {location.pathname === '/' && (
                    <div className={classes.button}>
                    <Typography component={ Link } to="/Login" variant="h6" className={classes.title} color="inherit">
                        Login 
                    </Typography>
                    <Typography component={ Link } to="/Logout" variant="h6" className={classes.title} color="inherit">
                        Out
                    </Typography>
                    <IconButton component={ Link } to="/cart" aria-label="Show Cart items" color="inherit">
                        <Badge badgeContent={totalItems} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    </div>)}
                    
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
