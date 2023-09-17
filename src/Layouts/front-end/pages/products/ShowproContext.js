import React from 'react';
import { Link } from 'react-router-dom';
import useProductContext from '../../context/Allproduct';
import Navbar from '../Navbar';
import Sidebar from '../../../admin/sidebar';

const ShowproContext = () => {
  const { products, deleteProduct } = useProductContext(); 


  return (
    <div className="">
      <div className="sb-nav-fixed">
        <Navbar />
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <Sidebar />
          </div>
          <div className="lg:w-full lg:ml-64 px-6 py-8">
            <h2 className="font-semibold justify-center items-center">Product List</h2>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Image</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr
                            key={product.id}
                            className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                          >
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>
                              <img
                                src={`http://localhost:8000/uploads/${product.image}`}
                                alt={product.title}
                                width="100"
                                height="100"
                              />
                            </td>
                            <td>
                              <Link
                                to={`/product-details/${product.id}`}
                                className="text-white mt-10 text-xl font-semibold bg-blue-400 rounded-3xl w-20 hover:bg-blue-950 mx-3"
                              >
                                View
                              </Link>
                              <button
                                type="button"
                                onClick={() => deleteProduct(product.id)}
                                className="text-white mt-10 text-xl font-semibold bg-red-400 rounded-3xl w-20 hover:bg-red-950"
                              >
                                Delete
                              </button>
                              <Link
                                to={`/edit-product/${product.id}`}
                                className="text-white mt-10 text-xl font-semibold bg-blue-400 rounded-3xl w-20 hover:bg-blue-950 mx-3"
                              >
                                Edit
                              </Link>
                            </td>
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

export default ShowproContext;
