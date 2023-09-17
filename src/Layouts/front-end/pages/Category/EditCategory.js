import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../admin/navbar';
import Sidebar from '../../../admin/sidebar';

const EditCategory = () => {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // Use null for image
  const [errors, setError] = useState('');
const navigate = useNavigate()
  useEffect(() => {
    // Fetch category data using the category ID from the URL
    axios.get(`http://localhost:8000/api/update-category/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
            console.warn(res.data)
          const categoryData = res.data.Category;
          setTitle(categoryData.title);
          setDescription(categoryData.description);
         
          // You can update the image state here if needed
        }
      })
      .catch((error) => {
        console.error('Error fetching category:', error);
      });
  }, [id]);

  async function updateCategory(e) {
    e.preventDefault();

    const formData = new FormData(); // Use FormData for sending files
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/update-category/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });

      console.log('Category updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating category:', error);
      setError('An error occurred while updating the category.');
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
        <h1 className='items-center text-3xl mb-5'>التعديل على قسم</h1>
      <form onSubmit={updateCategory} dir='rtl' className='container'>
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
          <label className="block text-gray-600 font-medium mb-2">صورة القسم</label>
          <input
            type="file"
          
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brown"
            name='image'
          />
           <img
                          src={`http://localhost:8000/image/${image}`}
                          alt={title}
                          width="100" // Set the width as needed
                          height="100" // Set the height as needed
                        />
        </div>
         
       
            <button
              type="submit"
          
              className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-200 focus:outline-none focus:ring focus:ring-brown-dark"
            >
            تعديل القسم
            </button>
          </form>
        
       
        </div>
        </div>
        </div>
        </div>
    )
  }

  export default EditCategory
