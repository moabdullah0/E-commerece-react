import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { motion } from 'framer-motion';

const ShowproductfromCategory = () => {
  const [productbycategory, seproductbycategory] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/show-product-category/${id}`).then((res) => {
      if (res.data.status === 200) {
      
        seproductbycategory(res.data.Product);
      }
    }).catch(err => { });
  }, []);

  return (
    <div className="mt-20 lg:mx-56 sm:mx-5 ">
      <Navbar />

      
      <motion.section initial={{ x: -2000,  }}animate={{ x: 0 }} transition={{ delay: '1', duration: '1' }}  className='flex container md:flex-row sm:flex mx-10 flex-col mt-20'>
 

<div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
{productbycategory.map((product, index) => (
    <div key={product.id} className=" overflow-hidden shadow-lg bg-gradient-to-r from-white via-gray-300 to-blue-400 rounded-3xl">
    <img src={`http://localhost:8000/uploads/${product.image}`} className='w-96'/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2"> {product.title}</div>
        <p className="text-gray-700 text-base">
        {product.description}
        </p>
        <Link to={'/product-detailes/' + product.id}
                type="button"
                classNameName="inline-block rounded bg-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-yellow-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Show product
              </Link>
      </div>
     
    

    </div>
      ))}
      </div>
  </motion.section>
    </div>
  );
};

export default ShowproductfromCategory;
