import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Sidebar from '../../../admin/sidebar';
import {
  Dropdown,
  Ripple,
  initTE,
  Collapse
} from "tw-elements";
import Navbar from '../Navbar';
initTE({ Collapse,Dropdown, Ripple });
const EditProduct = (props) => {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // Use null for image
  const [price, setPrice] = useState();
  const [category_id, setCategory_id] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [brand_id, setBrand_id] = useState([]);
  const [numofpeace, setNumofpeace] = useState(0);
  const [errors, setError] = useState('');
const navigate=useNavigate();
  useEffect(() => {
    axios.get('http://localhost:8000/api/show-category')
      .then(res => {
        setCategory_id(res.data.Category);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

    axios.get(`http://localhost:8000/api/update-product/${id}`)
      .then(res => {
        if (res.data.status === 200) {
          const productData = res.data.Product;
          setTitle(productData.title);
          setDescription(productData.description);
          setPrice(productData.price);
          setImage(productData.image);
    
          if (typeof productData.category_id === 'number') {
            setSelectedCategory(productData.category_id); // Set as a single value
          } else {
            // Handle the case where category_id is not a number
            console.error('category_id is not a number in the API response:', productData.category_id);
          }
   
        
          if (typeof productData.brand_id === 'number') {
            setSelectedBrand(productData.brand_id); // Set as a single value
          } else {
            // Handle the case where category_id is not a number
            console.error('brand_id is not a number in the API response:', productData.brand_id);
          }
       
          setNumofpeace(productData.numofpeace);
   
      
        }
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/show-brand')
      .then(res => {
        setBrand_id(res.data.Brand);
      })
      .catch(error => {
        console.error('Error fetching brands:', error);
      });
  }, []);

  async function updateproducts(e) {
    e.preventDefault();

    const formData = new FormData(); // Use FormData for sending files
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('price', price);
    formData.append('category_id', selectedCategory);
    formData.append('brand_id', selectedBrand);
    formData.append('numofpeace', numofpeace);
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/update-product/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        }
      });

      console.log('Product added successfully:', response.data);
      navigate('/show-product')
    } catch (error) {
      console.error('Error adding product:', error);
      setError('An error occurred while adding the product.');
    }
  }

    return (
      <div >
          <div className='sb-nav-fixed'>
       <Navbar/>
      <div id='layoutSidenav'>
        <div id="layoutSidenav_nav">
     <Sidebar/>
        </div>
     
        <div className="lg:w-full lg:ml-64 px-6 py-8">
        <h1 className='items-center text-3xl mb-5'>التعديل على منتج</h1>
      <form onSubmit={updateproducts} dir='rtl' className='container'>
            <div className="mb-4" >
              <label className="block text-gray-600 font-medium mb-2">العنوان</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brown"
                placeholder="Enter your name"
                name='title'
              />
          
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">الوصف</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brown"
                placeholder="Enter your email"
                name='description'
              />
          
            </div>
            <div className="mb-6">
              <label className="block text-gray-600 font-medium mb-2"> السعر</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brown"
                placeholder="Enter your password"
                name='price'
              />
            
            </div>
            <div className="mb-6">
              <label className="block text-gray-600 font-medium mb-2"> الكمية</label>
              <input
                type="number"
                value={numofpeace}
                onChange={(e) => setNumofpeace(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brown"
                placeholder="Enter your password"
                name='numofpeace'
              />
            
            </div>
            <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">صورة المنتج</label>
          <input
            type="file"
          
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brown"
            name='image'
          />
          <img
                          src={`http://localhost:8000/uploads/${image}`}
                          alt={title}
                          width="100" // Set the width as needed
                          height="100" // Set the height as needed
                        />
        
        </div>
        <div dir='rtl'>
      <form>
        {/* ... other form fields ... */}
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2"> القسم</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brown"
            name='category_id'
          >
            <option value="">Select a category</option>
            {category_id.map(category => (
              <option key={category.id} value={category.id}>{category.title}</option>
            ))}
          </select>
          
        </div>
        {/* ... other form fields ... */}
      </form>
    </div>
    <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2"> القسم</label>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brown"
            name='category_id'
          >
            <option value="">Select a brand</option>
            {brand_id.map(brand => (
              <option key={brand.id} value={brand.id}>{brand.brand}</option>
            ))}
          </select>
          
        </div>
            <button
              type="submit"
          
              className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-200 focus:outline-none focus:ring focus:ring-brown-dark"
            >
            تعديل منتج
            </button>
          </form>
        
       
        </div>
        </div>
        </div>
        </div>
    )
  }

  export default EditProduct
