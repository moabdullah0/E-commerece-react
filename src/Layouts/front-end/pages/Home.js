
import React,{useEffect} from 'react';
import Navbar from './Navbar';

import Landing from './Landing';
import Category from './Category/Category';
import { getUserNameFromLocalStorage } from './getUserNameFromLocalStorage';

import Addpro from './products/Addpro';
import CategoryHome from './Category/CategoryHome';
import { delay, motion } from "framer-motion"
import {
  Dropdown,
  Ripple,
  initTE,
  Collapse
} from "tw-elements";
import Services from './Services';
import Footer from './Footer';
export const Home = () => {
  let userName=getUserNameFromLocalStorage();
 console.warn(userName);
  useEffect(() => {
    initTE({ Collapse,Dropdown, Ripple });
  }, []);
  return (
    <div className=''>
    <div  dir='' className='bg-gradient-to-r from-blue-400 via-blue-300 to-gray-400 rounded-3xl mb-5 pb-10 relative'>
   
    <Navbar userName={userName} className="fixed top-0 left-0 right-0" />
    <div>
   

 
      
    </div>
    <Landing/>
    <CategoryHome/>
<Services/>
    </div>
  <Footer/>


  

  </div>
  )
}

export default Home
