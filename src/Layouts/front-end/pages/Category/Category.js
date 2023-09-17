import axios from 'axios';
import React, { useState } from 'react'
import Navbar from '../Navbar'
import Sidebar from '../../../admin/sidebar';
import { useNavigate } from 'react-router-dom';

export const Category = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate=useNavigate();
  async function AddCategory(e){
    e.preventDefault();

    const formData = new FormData(); // Use FormData for sending files
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    try{
await axios.post('http://127.0.0.1:8000/api/add-category',formData).then(res=>{
  console.warn(res.data)
  navigate=('/show-category')
})
    }catch(e){
console.log(e)
    }
  }
  return (
    <div>
  
      <div >
      <div className='sb-nav-fixed'>
         <Navbar/>
      <div id='layoutSidenav'>
        <div id="layoutSidenav_nav">
     <Sidebar/>
        </div>
     
        <div className="lg:w-full lg:ml-64 px-6 ">
      <form onSubmit={AddCategory} dir='rtl' className='container'>
      <h1 className='text-center mt-10 font-bold text-3xl font-mono'>اضافة الاقسام</h1>
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
        
        </div>
        <div dir='rtl'>

    </div>
  
            <button
              type="submit"
           
              className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-200 focus:outline-none focus:ring focus:ring-brown-dark"
            >
            اضافة قسم
            </button>
          </form>
         
        </div>
     
  
  
    </div>
    </div>
    </div>
    </div>
  )
}

export default Category
