import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../pages/Navbar';

import useAuthContext from '../context/AuthContext';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Get the functions and state from the context
  const { handleLogin, errors } = useAuthContext();

  async function handleLoginSubmit(e) {
    e.preventDefault();
    // Call the handleLogin function with the provided data
    handleLogin({ email, password });
 
  }

  return (
    <div >
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-silver to-brown">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-semibold mb-4">Welcome Back!</h1>
          <form>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brown"
                placeholder="Enter your email"
                name='email'
              />
            {errors && errors.email && <div className='text-red-500'>{errors.email[0]}</div>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-600 font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brown"
                placeholder="Enter your password"
                name='password'
              />
            {errors && errors.password && <div className='text-red-500'>{errors.password[0]}</div>}
            </div>
            <button
              type="submit"
              onClick={handleLoginSubmit} // Changed the function name
              className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-200 focus:outline-none focus:ring focus:ring-brown-dark"
            >
              Log In
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
           ليس لديك حساب ؟ <Link to="#" className="text-blue-500">قم بانشاء حساب من هنا</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
