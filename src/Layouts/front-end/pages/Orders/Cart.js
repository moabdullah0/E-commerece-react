import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const Cart = () => {
  const [Errors, setError] = useState('');
  const [Carts, setCarts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const accessTokenString = localStorage.getItem('access_Token');

  //Get All order in shopping Cart
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    Carts.forEach((item) => {
      totalPrice += item.product_qty * item.product.price;
    });
    return totalPrice;
  };

//Cahage quantity 
  const handleQuantityChange = (newQuantity, cardId, scope) => {
    if (newQuantity >= 0) {
      // Find the cart item that corresponds to cardId
      const updatedCartItems = Carts.map((cart) => {
        if (cart.id === cardId) {
          return { ...cart, product_qty: newQuantity };
        } else {
          return cart;
        }
      });
  
      // Update the cart items in state
      setCarts(updatedCartItems);
  
      // Call the API to update the quantity on the server-side
      updateQuantity(cardId, scope, newQuantity);
    }
  };
  
  const updateQuantity = (cardId, scope, newQuantity) => {
    axios
      .put(`http://127.0.0.1:8000/api/updatequantity/${cardId}/${scope}`, { newQuantity }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_Token')}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          console.log('Quantity updated successfully:', res.data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating quantity:', error);
      });
  };

  const handleRemoveItem = (e, cardId) => {
    e.preventDefault();
  
    const thisClicked = e.currentTarget;
    thisClicked.innerHTML = "removing item";
  
    axios.delete(`http://127.0.0.1:8000/api/delete-itemCard/${cardId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_Token')}`,
      },
    }).then((response) => {
      if (response.data.status === 200) {
        // Find the closest table row (tr) to the clicked button
        const rowToRemove = thisClicked.closest('tr');
        if (rowToRemove) {
          rowToRemove.remove();
        }
  
        setError("Successfully deleted", response.data.message);
      } else if (response.data.status === 404) {
        setError("The item was not found", response.data.message);
        thisClicked.innerHTML = "removing item";
      }
    });
  }
  

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
        } else if (res.data.status === 409) {
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
    <div>
      <div className="container mx-auto p-5">
        <Navbar />
        <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>
        <table className="w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Carts.map((items) => (
              <tr key={items.id}>
                <td>
                  <div className="flex items-center">
                    <img
                      src={`http://localhost:8000/uploads/${items.product.image}`}
                      alt={items.product.title}
                      className="w-16 h-16 object-cover mr-4"
                    />
                    {items.product.title}
                  </div>
                </td>
                <td>${items.product.price}</td>
                <td>
                  <div className="flex items-center">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded-l cursor-pointer"
                      onClick={() => handleQuantityChange(items.product_qty - 1, items.id, 'decrement')}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="border border-gray-400 rounded py-1 px-2 w-12 text-center"
                      value={items.product_qty}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10), items.id, 'input')}
                    />
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded-r cursor-pointer"
                      onClick={() => handleQuantityChange(items.product_qty + 1, items.id, 'increment')}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>${items.product_qty * items.product.price}</td>
                <td>
                  <button className="text-red-500" onClick={(e) => handleRemoveItem(e,items.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-end">
          <div className="text-xl font-semibold">Total: ${calculateTotalPrice()}</div>
        </div>
        <Link to={'/checkout'}>
        <button className="mt-4 text-white bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-600" >
          Checkout
        </button></Link>
      </div>
    </div>
  );
};

export default Cart;
