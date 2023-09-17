import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import Sidebar from '../../../admin/sidebar';

const Addpro = () => {
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
const navigate=useNavigate()
  useEffect(() => {
    axios.get('http://localhost:8000/api/show-category')
      .then(res => {
        setCategory_id(res.data.Category);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/show-brand').then(res=>{
      setBrand_id(res.data.Brand)
    })
  },[])

  async function Addproducts(e) {
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
      const response = await axios.post('http://127.0.0.1:8000/api/add-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set correct content type for FormData
          'Accept': 'application/json',
        }
      });

      console.log('Product added successfully:', response.data.product);
      navigate('/show-product')
    } catch (error) {
      console.error('Error adding product:', error);
      setError('An error occurred while adding the product.');
    }
  }
  
  
  return (
   
    <div dir=''>
     <div className='sb-nav-fixed'>
         <Navbar/>
      <div id='layoutSidenav'>
        <div id="layoutSidenav_nav">
     <Sidebar/>
        </div>
     
        <div className="lg:w-full lg:ml-64 px-6 py-8">

       


      <form onSubmit={Addproducts} dir='rtl' className='container'>
      <h1 className='text-3xl font-bold mb-2'>أضافة منتج جديد</h1>
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
          
              className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-yellow-200 focus:outline-none focus:ring focus:ring-brown-dark"
            >
            اضافة منتج
            </button>
          </form>
         
        </div>
        </div>
        </div>
        </div>
     
  
  )
}

export default Addpro
