import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Sidebar from '../../../admin/sidebar';

const ShowOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch the list of orders from the server
    axios
      .get('http://localhost:8000/api/show-order')
      .then((response) => {
        setOrders(response.data.Order); // Assuming the response directly contains the array of orders
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="sb-nav-fixed">
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <Sidebar />
          </div>

          <div className="lg:w-full lg:ml-64 px-6 py-8">
            <h2 className="font-semibold justify-center items-center">Order List</h2>

            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                        <tr>
                          <th scope="col" className="px-6 py-4">#</th>
                          <th scope="col" className="px-6 py-4">Name</th>
                          <th scope="col" className="px-6 py-4">Phone</th>
                          <th scope="col" className="px-6 py-4">Email</th>
                          <th scope="col" className="px-6 py-4">Address</th>
                          <th scope="col" className="px-6 py-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr
                            key={order.id}
                            className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{order.orders.id}</td>
                            <td className="whitespace-nowrap px-6 py-4">{order.orders.name}</td>
                            <td className="whitespace-nowrap px-6 py-4">{order.orders.phone}</td>
                            <td className="whitespace-nowrap px-6 py-4">{order.orders.email}</td>
                            <td className="whitespace-nowrap px-6 py-4">{order.orders.address}</td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <Link
                                to={`/order-detailes/${order.orders.id}`}
                                className="text-white mt-2 text-xl font-semibold bg-blue-400 rounded-3xl w-20 hover:bg-blue-950 mx-3"
                              >
                                View
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
}

export default ShowOrders;
