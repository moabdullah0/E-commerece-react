import React,{useEffect} from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import { Login } from './Layouts/front-end/Auth/Login';
import { Register } from './Layouts/front-end/Auth/Register';
import { Home } from './Layouts/front-end/pages/Home';
import { AuthProvider } from './Layouts/front-end/context/AuthContext';
import {AllProductProvider } from './Layouts/front-end/context/Allproduct'
import {AllCategoryProvider } from './Layouts/front-end/context/Allcategory'
import Master from './Layouts/admin/master';
import Addpro from './Layouts/front-end/pages/products/Addpro';
import EditProduct from './Layouts/front-end/pages/products/EditProduct';

import ShowCategory from './Layouts/front-end/pages/Category/ShowCategory';
import '../node_modules/tw-elements/dist/js/tw-elements.umd.min.js'
import Category from './Layouts/front-end/pages/Category/Category';
import EditCategory from './Layouts/front-end/pages/Category/EditCategory';
import ShowproductfromCategory from './Layouts/front-end/pages/Category/ShowproductfromCategory';
import Productdetailes from './Layouts/front-end/pages/products/product-detailes';

import { getUserNameFromLocalStorage } from './Layouts/front-end/pages/getUserNameFromLocalStorage';
import Cart from './Layouts/front-end/pages/Orders/Cart';
import Checkout from './Layouts/front-end/pages/Orders/Checkout';
import FilterOrder from './Layouts/front-end/pages/Orders/FilterOrder';
import {
  Dropdown,
  Ripple,
  initTE,
  Collapse
} from "tw-elements";
import Thankyou from './Layouts/front-end/pages/Orders/Thankyou';
import ShowOrders from './Layouts/front-end/pages/Orders/ShowOrders';
import Orderdetailes from './Layouts/front-end/pages/Orders/Orderdetailes';
import Wishlist from './Layouts/front-end/pages/Wishlist';
import Search from './Layouts/front-end/pages/products/Search';
import ShowproContext from './Layouts/front-end/pages/products/ShowproContext';
import Allproduct from './Layouts/front-end/pages/products/Allproduct';
import Profile from './Layouts/front-end/Auth/Profile';




function App() {
  useEffect(() => {
    initTE({ Collapse,Dropdown, Ripple });
  }, []);



  return (
    <div className="App">
 
        <BrowserRouter>
        <AuthProvider >
        <AllCategoryProvider>
        <AllProductProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Master />} />
            <Route path="/add-product" element={<Addpro />} />
       
            <Route path="/show-product" element={<ShowproContext />} />
            <Route path="/allproduct" element={<Allproduct />} />

            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/product-detailes/:id" element={<Productdetailes />} />
            <Route path="/show-category" element={<ShowCategory />} />
            <Route path="/edit-category/:id" element={<EditCategory />} />
            <Route path="/show-product-category/:id" element={<ShowproductfromCategory />} />
            <Route path="/add-category" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thankyou" element={<Thankyou />} />
            <Route path="/show-order" element={<ShowOrders />} />
            <Route path="/order-detailes/:id" element={<Orderdetailes />} />
            <Route path="/dateorder/" element={<FilterOrder />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            
          
           
          
         
          </Routes>
          </AllProductProvider>
          </AllCategoryProvider>
          </AuthProvider>
        </BrowserRouter>
     
    </div>
  );
}

export default App;
