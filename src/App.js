import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
//import Products from './components/Products/Products'
//import Navbar from './components/Navbar/Navbar';
import { Products, Navbar, Cart, Checkout } from './components';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BrowserRouter, Route, Link, Switch, Router } from 'react-router-dom';
import HomeScreen from './Screens/Screen/HomePage';
import ProductScreen from './Screens/Screen/ProductScreen';
import SigninScreen from './Screens/Screen/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './Screens/Screen/RegisterScreen';
import ProductsScreen from './Screens/Screen/ProductsScreen';
import ProfileScreen from './Screens/Screen/ProfileScreen';
import FavouriteScreen from "./Screens/Screen/FavouriteScreen"

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {
         const { data } = await commerce.products.list();

         setProducts(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())

      
    }
    
    const handleAddToCart = async (productId, quanitity) =>{
        const { cart } = await commerce.cart.add(productId, quanitity);

        setCart(cart);
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });

        setCart(cart);
    }


    const handleRemoveFromCart =async (productId) => {
        const { cart } = await commerce.cart.remove(productId);

        setCart(cart);
    }


    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();

        setCart(cart);
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);

    }
    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try{
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

            setOrder(incomingOrder);
            
            refreshCart();
        } catch(error){

            setErrorMessage(error.data.error.message);
        }
    }

    useEffect(() =>{
        fetchProducts();
        fetchCart();
    }, []);

     console.log(cart);


 
     //xin
     const userSignin = useSelector((state) => state.userSignin);
     const { userInfo } = userSignin;
   
     const openMenu = () => {
       document.querySelector('.sidebar').classList.add('open');
     };
     const closeMenu = () => {
       document.querySelector('.sidebar').classList.remove('open');
     };


     return (
        <BrowserRouter>
          <div className="grid-container">
            <header className="header">
              <div className="brand">
                <button onClick={openMenu}>&#9776;</button>
                <Link to="/">Welcome!!!</Link>
              </div>
              <div className="header-links">
                <Link to="/cart">Cart</Link>
                <Link to="/favourite/:id?">Favourite</Link>
                {userInfo ? (
                  <Link to="/profile">{userInfo.name}</Link>
                ) : (
                  <Link to="/signin">Sign In</Link>
                )}
                {userInfo && userInfo.isAdmin && (
                  <div className="dropdown">
                    <a href="#">Admin</a>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/products">Products</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </header>
            <aside className="sidebar">
              <h3>Shops</h3>
              <button className="sidebar-close-button" onClick={closeMenu}>
                x
              </button>
              <ul className="categories">
                <li>
                  <Link to="/commerce">Commerce shop(can be paid by stripe)</Link>
                </li>
    
                <li>
                  <Link to="/">Normal shop</Link>
                </li>
              </ul>
            </aside>
            <main className="main">
              <div className="content">
                <Route path="/products" component={ProductsScreen} />
                <Route path="/signin" component={SigninScreen} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/product/:id" component={ProductScreen} />
                <Route path="/" exact={true} component={HomeScreen} />
                <Route path="/profile" component={ProfileScreen} />
                <Route path="/favourite/:id?" component={FavouriteScreen} />

                <Route path="/commerce">
                <Products products={products} onAddToCart={handleAddToCart} />
                </Route>
                <Route exact path="/cart">
                <Cart cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleEmptyCart={handleEmptyCart}
                handleRemoveFromCart={handleRemoveFromCart}
                 />
               </Route>
                 <Route exact path="/checkout">
              <Checkout 
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
              />
               </Route>
              </div>
            </main>
          </div>

        </BrowserRouter>
      );
 }









//   return (


//       <Router>
//     <div>
//         <Navbar totalItems={cart.total_items} />
//         <Switch>
//         <AuthProvider>
//           <Route path="/signup" component={SignupPage} />
//           <Route path='/Login' component={LoginPage}/>
//           <PrivateRoute path='/logout' component={LogoutPage}/>
//           </AuthProvider>
//             <Route exact path="/">
//             <Products products={products} onAddToCart={handleAddToCart} />
//             </Route>
//           <Route exact path="/cart">
//           <Cart cart={cart}
//            handleUpdateCartQty={handleUpdateCartQty}
//            handleEmptyCart={handleEmptyCart}
//            handleRemoveFromCart={handleRemoveFromCart}
//             />
//           </Route>
//           <Route exact path="/checkout">
//               <Checkout 
//               cart={cart}
//               order={order}
//               onCaptureCheckout={handleCaptureCheckout}
//               error={errorMessage}
//               />
//           </Route>
          
//      </Switch>
//     </div>
//     </Router>
//   ); 
// }

export default App;
