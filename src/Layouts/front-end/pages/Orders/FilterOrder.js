import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Sidebar from '../../../admin/sidebar';
import { Link } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    // Fetch orders when the component mounts
    fetchOrders();
  }, []);
  console.log('Month:', month);
console.log('Year:', year);

  const fetchOrders = () => {
    // Make a GET API request to fetch orders based on month and year
    axios.get(`http://localhost:8000/api/sailesfilter`, {
        params: {
          month,
          year,
        },
      })
      .then((response) => {
        console.log('Response:', response.data);
        setOrders(response.data.order);
        setTotalSales(response.data.total_sales);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fetch orders when the form is submitted
    fetchOrders();
  };


  return (
    <div className="mt-12 px-4">
      <Navbar/>
   
    <form onSubmit={handleSubmit} className="mb-6 px-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="month" className="block text-sm font-medium text-gray-700">Month</label>
          <select
            id="month"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            name="month"
            required
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">-- Select Month --</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
          <select
            id="year"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            name="year"
            required
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
               <option value="">-- Select Year --</option>
            {Array.from({ length: new Date().getFullYear() - 2009 }, (_, i) => (
              <option key={i} value={new Date().getFullYear() - i}>
                {new Date().getFullYear() - i}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Filter
      </button>
    </form>

    <h2 className="text-xl font-semibold text-blue-600 mt-6">
      Total Sales for {month && year ? `${month}/${year}` : 'Selected Month and Year'}: {totalSales}$
    </h2>

    <div className="mt-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-600">
          <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              id
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Phone
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Address
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              <button >Action</button>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.orders.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.orders.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.orders.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.orders.address}</td>
             <Link to={`/order-detailes/${order.orders.id}`}>
             <td className="px-6 py-4 whitespace-nowrap bg-blue-300 w-10 rounded-full">View Order</td></Link>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default OrderList;
