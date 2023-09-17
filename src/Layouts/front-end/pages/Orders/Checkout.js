import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { getUserNameFromLocalStorage } from '../getUserNameFromLocalStorage';

const Checkout = () => {
//get user info 
  const infouser = localStorage.getItem('user-info');
  const userData = JSON.parse(infouser);

 //Store info  checkout state
    const [Errors, setError] = useState([]);
    const [Carts, setCarts] = useState([]);
    
    const [Checkout, setCheckout] = useState({} );
    const [name, setName] = useState(userData['0'].name );
    const [email, setEmail] = useState(userData['0'].email  );
   
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [user_id, setUser_id] = useState(userData['0'].id);

    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Create an object containing the form data
      const formData = {
        name,
        email,
        user_id,
        address,
        phone
        // Add other form fields as needed
      };


      axios.post('http://127.0.0.1:8000/api/orders', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_Token')}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          console.log('Order placed successfully:', res.data.order);
          console.error('successfully:', res.data.message);
          navigate('/thankyou')
          // Redirect to a success page or perform other actions as needed
        } else {
          setError(res.data.message)
          console.error('Error placing order:', res.data.message);
          // Handle error conditions
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        // Handle network errors or other exceptions
      });
  
    }


    const navigate = useNavigate();
    const accessTokenString = localStorage.getItem('access_Token');
    if(!accessTokenString){
        navigate('/')
     
    }
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        Carts.forEach((item) => {
          totalPrice += item.product_qty * item.product.price;
        });
        return totalPrice;
      };
    useEffect(() => {
        axios
          .get('http://127.0.0.1:8000/api/cart', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_Token')}`,
            },
          })
          .then((res) => {
            if (res.data.status === 201) {
              console.log('Success', res.data.status);
              console.log('Your Cart:', res.data.cart);
              setCarts(res.data.cart);
    
              console.log('Success', res.data.message);
              setError(res.data.message);
            } else if (res.data.status === 401) {
              console.log(res.data.status, ':', res.data.message);
              navigate('/');
              setError(res.data.message);
            } else if (res.data.status === 404) {
              console.log(res.data.status, ':', res.data.message);
              setError(res.data.message);
            }else if (res.data.status === 405) {
              console.log(res.data.status, ':', res.data.message);
              setError(res.data.message);
            }
             else if (res.data.status === 409) {
              console.log(res.data.status);
              console.log(res.data.message);
              setError(res.data.message);
            }
          })
          .catch((error) => {
            console.error('An error occurred:', error);
            // Handle network errors or other exceptions
          });
      }, [navigate]);
    
  return (
    <div dir='rtl'>
      <div className="h-screen grid grid-cols-3">
        <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12">
          <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
            <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
              <div className="text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 sm:w-5 h-6 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-sm font-medium font-weight-bold ml-3">الدفع</div>
            </div>
          </div>
          <div className="rounded-md">
            <form  id="payment-form" method="POST">
           <h1 className='bg-red-600 text-white text'></h1>
              <section>
                <div className="bg-red-500 w-96 h-12 text-start rounded-pill  text-white text-3xl font-blod text-center px-5">
                {Errors}
                </div>
                <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">المعلومات الشخصية</h2>
                <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">الاسم</span>
                    <input name="name" className="focus:outline-none px-3" placeholder="Try Odinsson" required="" value={name}     onChange={(e) => setName(e.target.value)}/>
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center hidden">
                    <input type="hidden" name="user_id" className="focus:outline-none px-3" placeholder="Try Odinsson" required="" value={user_id}     onChange={(e) => setUser_id(e.target.value)}/>
                  </label>
                
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">الايميل</span>
                    <input name="email" type="email" className="focus:outline-none px-3" placeholder="try@example.com" required=""value={email}     onChange={(e) => setEmail(e.target.value)}/>
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2"> رقم الهاتف</span>
                    <input name="phone" type="phone" className="focus:outline-none px-3" placeholder="try@example.com" required=""value={phone}     onChange={(e) => setPhone(e.target.value)}/>
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2">العنوان</span>
                    <input name="address" type="text" className="focus:outline-none px-3" placeholder="جانب دوار القلعة" required="" value={address}  onChange={(e) => setAddress(e.target.value)} />
                  </label>
                 
                  
                
        

             
                  
               
                </fieldset>
              </section>
            </form>
          </div>
          <div className="mt-4 flex justify-end">
          <div className="text-xl font-semibold">Total: ${calculateTotalPrice()}</div>
        </div>
          <button type='submit' onClick={handleSubmit} className="submit-button px-4 py-3 rounded-full bg-blue-400 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
            اتمام العملية
          </button>
        </div>
        <div className="col-span-1 bg-white lg:block hidden">
  <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">تفاصيل الطلب</h1>
  <ul className="py-6 border-b space-y-6 px-8">
    {Carts.map((items) => (
      <li className="grid grid-cols-6 gap-2 border-b-1" key={items.id}>
        <div className="flex items-center">
          <img
            src={`http://localhost:8000/uploads/${items.product.image}`}
            alt={items.product.title}
            className="w-16 h-16 object-cover mr-4"
          />
        
        </div>
        <div className="flex flex-col col-span-3 pt-2">
          <span className="text-gray-400 font-bold">المنتج : </span>
          <input className="text-gray-600 text-md font-semi-bold" value={items.product.title} readOnly />
          <span className="text-gray-400 font-bold">العدد : </span>
          <input className="text-gray-600 text-md font-semi-bold" value={items.product_qty} readOnly  />
        </div>
        <div className="col-span-2 pt-3">
          <div className="items-center space-x-2 text-sm justify-between">
            <span className="text-gray-400 font-bold">السعر : </span>
            <input className="text-blue-400 font-semibold inline-block mt-5" value={items.product.price} readOnly />
          </div>

        </div>
      </li>
    ))}
  </ul>
  <div className="mt-4 flex justify-end">
          <div className="text-xl font-semibold mx-5">Total: ${calculateTotalPrice()}</div>
        </div>
</div>

      </div>
    </div>
  );
}

export default Checkout;
