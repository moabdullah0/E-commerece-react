import React, { useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate, Link } from 'react-router-dom';
import Navbar from '../Navbar';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
const navigate=useNavigate()
const storedData = localStorage.getItem('user-info');
const parsedData = JSON.parse(storedData);
  const handleSearch = () => {
    // Make a GET request to the search API endpoint
    axios
      .get(`http://localhost:8000/api/search?search=${searchTerm}`)
      .then((response) => {
        if (response.data.status === 200) {
          setProducts(response.data.product);
          setMessage('');
         
        } else {
          setProducts([]);
          setMessage('No products found.');
        }
      })
      .catch((error) => {
        console.error('Error searching for products:', error);
        setProducts([]);
        setMessage('An error occurred while searching for products.');
      });
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
    }


  }
  
  function submitAddtocart(e) {
    e.preventDefault();
    const data = {
      product_id: products.id,
      product_qty: quantity,
    };
   
    const accessTokenString = localStorage.getItem('access_Token');
  
    if (!accessTokenString) {
      console.log('User is not logged in.');
  
      return;
    }
  
  

    console.log('Access Token:', accessTokenString);
     
      axios.post('http://127.0.0.1:8000/api/add-to-cart', data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_Token')}`,
        },
      })
      .then((res) => {
      
        if (res.data.status === 201) {
     
          console.log('Success', res.data.status);
          <div className='bg-green-600 text-white font-bold'>Success : {res.data.message}</div>
          console.log('Success', res.data.message);
          setMessage(res.data.message)
        } else  if (res.data.status === 401){
          console.log(res.data.status," : ",res.data.message);
          setMessage(res.data.message)
        }else  if (res.data.status === 404){
          console.log(res.data.status," : ",res.data.message);
          setMessage(res.data.message)
        }
        else  if (res.data.status === 409){
          console.log(res.data.status);
          console.log(res.data.message);
          setMessage(res.data.message)
        }
       
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        // Handle network errors or other exceptions
      });
   
 
    
  }
  function submitAddtoWishlist(e) {
    e.preventDefault();
    const data = {
      product_id: products.id,
      user_id: parsedData["0"].id,
    };
   
    const accessTokenString = localStorage.getItem('access_Token');
  
    if (!accessTokenString) {
      console.log('User is not logged in.');
  
      return;
    }
  
  

    console.log('Access Token:', accessTokenString);
     
      axios.post('http://127.0.0.1:8000/api/wishlist/add', data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_Token')}`,
        },
      })
      .then((res) => {
      
        if (res.data.status === 201) {
     
          console.log('Success', res.data.status);
          <div className='bg-green-600 text-white font-bold'>Success : {res.data.message}</div>
          console.log('Success', res.data.message);
          setMessage(res.data.message)
        } else  if (res.data.status === 401){
          console.log(res.data.status," : ",res.data.message);
          setMessage(res.data.message)
        }else  if (res.data.status === 404){
          console.log(res.data.status," : ",res.data.message);
          setMessage(res.data.message)
        }
        else  if (res.data.status === 409){
          console.log(res.data.status);
          console.log(res.data.message);
          setMessage(res.data.message)
        }
       
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        // Handle network errors or other exceptions
      });
   
 
    
  }
  return (
    <div>
      
      <div>
     
        <input  className='mx-5 rounded-full w-36  border-collapse bg-gray-50 color-gray-200'
          type="text"
          placeholder="Search for products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
         
        <button onClick={handleSearch}>Search</button>
      
      </div>
     
      <ul>
        {products.map((product) => (
          <section className="text-gray-700 body-font overflow-hidden bg-white">
      
          <div className="container px-5 py-24 mx-auto">
          <h1 className='items-center bg-red-300 w-56 rounded-full text-center font-bold text-xl text-gray-200 mb-10'> {message && <p>{message}</p>}</h1>
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
                
              <img
                src={`http://localhost:8000/uploads/${product.image}`}
                alt={product.title}
                width="200"
                height="100"
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className='text-3xl font-bold text-black'>Product Title : {product.title}</h1>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                  <div className="flex">
                  <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 ">
                  <div className="flex">
                    <span className="mr-3">Color</span>
                    <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                  </div>
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                        <option>SM</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
               
             
                  </div>
                  <div className="relative mx-10">
      <span className="mx-2">Quantity</span>
      <div className="flex items-center">
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded-l cursor-pointer"
          onClick={() => setQuantity(quantity - 1 >= 1 ? quantity - 1 : 1)}
        >
          -
        </button>
        <input
          type="number"
          className="border border-gray-400 rounded py-2 px-3 focus:outline-none focus:border-red-500 text-base"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded-r cursor-pointer"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>
    </div>
    
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">Price :${product.price}</span>
                  <button onClick={submitAddtocart} className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">Add to cart</button>
                  <button onClick={submitAddtoWishlist}  className="hover:bg-red-400 hover:text-white rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        ))}
      </ul>
    </div>
  );
};

export default Search;
