import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link, useParams } from 'react-router-dom';
import useCategoryContext from '../../context/Allcategory';
import { delay, motion } from "framer-motion"
import land from '../../../../assets/front-end/img/20943855_preview_rev_1.png'

const CategoryHome = () => {

const {id}=useParams()
const { categories } = useCategoryContext();

  return (
    
    <motion.section initial={{ x: -2000 }}  animate={{ x: 0 }} transition={{ delay: '0.6', duration: '0.6' }}  className='flex  md:flex-row sm:flex mx-10 flex-col mt-20'>
 

<div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
{categories.map((product, index) => (
  <Link to={'/show-product-category/' + product.id}>
    <div key={product.id} class=" overflow-hidden shadow-lg bg-gradient-to-r from-white via-gray-300 to-blue-400 rounded-3xl">
    <img src={`http://localhost:8000/image/${product.image}`} className='w-96'/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2"> {product.title}</div>
        <p className="text-gray-700 text-base">
        {product.description}
        </p>
        <Link to={'/show-product-category/' + product.id}
                type="button"
                className="inline-block rounded bg-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Show product
              </Link>
      </div>
     
    

    </div>
    </Link>
      ))}
      </div>
  </motion.section>
  
    
  );
};

export default CategoryHome;
