import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Sidebar from '../../../admin/sidebar';
import useCategoryContext from '../../context/Allcategory';

const ShowCategory = () => {


  const { categories, deleteCategory } = useCategoryContext();
  

  return (
    <div className=''>
        <div className='sb-nav-fixed'>
         <Navbar/>
      <div id='layoutSidenav'>
        <div id="layoutSidenav_nav">
     <Sidebar/>
        </div>
     
        <div claclassNamess="lg:w-full lg:ml-64 px-6 py-8 container mt-20">
      <h2 className='font-semibold justify-center items-center'>Category List</h2>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                  <tr>
                    <th scope="col" className="px-6 py-4">#</th>
                    <th scope="col" className="px-6 py-4">Title</th>
                    <th scope="col" className="px-6 py-4">Description</th>
                    <th scope="col" className="px-6 py-4">Image</th>
                    <th scope="col" className="px-6 py-4">action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{category.id}</td>
                      <td className="whitespace-nowrap px-6 py-4">{category.title}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-base w-10">{category.description}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <img
                          src={`http://localhost:8000/image/${category.image}`}
                          alt={category.title}
                          width="100" // Set the width as needed
                          height="100" // Set the height as needed
                        />
                      </td>
                      <button type='submit' onClick={() => deleteCategory(category.id)} className='text-white mt-10 text-xl font-semibold bg-red-400 rounded-3xl w-20 hover:bg-red-950'>Delete</button>
                      <Link to={`/edit-category/${category.id}`}  className='text-white mt-10  text-xl font-semibold bg-blue-400 rounded-3xl w-20 hover:bg-blue-950 mx-3'>Edit</Link>
                    </tr>
                   
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default ShowCategory;
