import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import Sidebar from '../../../admin/sidebar';

const Orderdetailes = () => {
  const [orderdtailes, setorderdtailes] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/order-detailes/${id}`).then((res) => {
      if (res.data.status === 200) {
        console.log(res.data);
        setorderdtailes(res.data.Order);
      }
    })
  }, []);

  return (
    <div>
      <Navbar />
      <div className="sb-nav-fixed">
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <Sidebar />
          </div>

          <div className="lg:w-full lg:ml-64 px-6 py-8 container">
            <h2 className="font-semibold justify-center items-center">Order List</h2>
            <h1 className='mt-20 text-3xl font-bold'>Order Info</h1>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                        <tr>
                          <th scope="col" className="px-6 py-4">#</th>
                          <th scope="col" className="px-6 py-4">order_id</th>
                          <th scope="col" className="px-6 py-4">product Name</th>
                          <th scope="col" className="px-6 py-4">quantity</th>
                          <th scope="col" className="px-6 py-4">price</th>
                          <th scope="col" className="px-6 py-4">totalprice</th>
                        </tr>
                      </thead>
                      <tbody>
                   
                        {orderdtailes.map((order) => (
                          <tr
                            key={order.id}
                            className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{order.id}</td>
                            <td className="whitespace-nowrap px-6 py-4">{order.order_id}</td>
                            <td className="whitespace-nowrap px-6 py-4">{order.product.title}</td>
                            <td className="whitespace-nowrap px-6 py-4">{order.quantity}</td>
                            <td className="whitespace-nowrap px-6 py-4">{order.price}</td>
                            <td className="whitespace-nowrap px-6 py-4">{order.total_price} </td>
                            
                          </tr>
                          
                        ))}
                        <h1 className='mt-20 text-3xl font-bold'>User Info</h1>
                        <tr>
                          
                          <th scope="col" className="px-6 py-4">user_id</th>
                          <th scope="col" className="px-6 py-4">userName</th>
                          <th scope="col" className="px-6 py-4">Email</th>
                          <th scope="col" className="px-6 py-4">Phone</th>
                          <th scope="col" className="px-6 py-4">Address</th>
                       
                        </tr>
                        {orderdtailes.map((order) => (
                          <tr
                            key={order.id}
                            className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                          >
                          
                            <td className="whitespace-nowrap px-6 py-4">{order.orders.user_id}</td>
                            <td className="whitespace-nowrap px-6 py-4">{order.orders.name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{order.orders.email}</td>
                            <td className="whitespace-nowrap px-6 py-4">{order.orders.phone}</td>
                            <td className="whitespace-nowrap px-6 py-4">{order.orders.address}</td>
                            <td className="whitespace-nowrap px-6 py-4">
                            
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
  )
}

export default Orderdetailes
