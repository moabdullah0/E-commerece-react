import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import useAuthContext from '../context/AuthContext';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const { handleSignup, errors } = useAuthContext();

  async function handlesignup(e) {
    e.preventDefault();
    handleSignup({ name, email, password, password_confirmation });
  }

  return (
    <div className=''>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-silver to-brown">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-semibold mb-4">اهلاً بك في موقعنا!</h1>
          <form>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">الاسم</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brown"
                placeholder="Enter your name"
                name='name'
              />
              {errors && errors.name && <div className='text-red-500'>{errors.name[0]}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">الايميل</label>
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
              <label className="block text-gray-600 font-medium mb-2">كلمة المرور</label>
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
            <div className="mb-6">
              <label className="block text-gray-600 font-medium mb-2">تأكيد كلمة المرور</label>
              <input
                type="password"
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-brown"
                placeholder="Enter your password"
                name='password_confirmation'
              />
              {errors && errors.password_confirmation && <div className='text-red-500'>{errors.password_confirmation[0]}</div>}
            </div>
            <button
              type="submit"
              onClick={handlesignup}
              className="w-full bg-blue-400 text-blue py-2 rounded-md hover:bg-blue-200 focus:outline-none focus:ring focus:ring-brown-dark"
            >
              انشاء حساب
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            هل لديك حساب ؟ <Link to="/login" className="text-blue-500">قم بتسجيل الدخول من هنا</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register;
