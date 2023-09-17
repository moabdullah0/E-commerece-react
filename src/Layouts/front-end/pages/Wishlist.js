import axios from 'axios'
import React, { useState ,useEffect} from 'react'
import { useNavigate , Link} from 'react-router-dom'
import Navbar from './Navbar'


const Wishlist = () => {
    const [wishlist,setwishlist]=useState([])
    const [Error,setError]=useState('')
    const navigate=useNavigate();
    useEffect(() => {
        axios
          .get('http://127.0.0.1:8000/api/whislist/show', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_Token')}`,
            },
          })
          .then((res) => {
            if (res.data.status === 201) {
              console.log('Success', res.data.status);
              console.log('Your Wishlist:', res.data.Wishlist);
              setwishlist(res.data.Wishlist);
    
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


      const handleRemoveItem = (e, WishlistId) => {
        e.preventDefault();
      
        const thisClicked = e.currentTarget;
        thisClicked.innerHTML = "removing item";
      
        axios.delete(`http://127.0.0.1:8000/api/wishlist/remove/${WishlistId}`, {
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
      
    
  return (
    <div>
      <div className="container mx-auto p-5">
        <Navbar />
        <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>
        <table className="w-full">
          <thead>
            <tr>
              <th>image</th>
              <th>prodcut_name</th>
              <th>price</th>
              <th>Action</th>
             
            </tr>
          </thead>
          <tbody>
            {wishlist.map((items) => (
              <tr key={items.id}>
                <td>
                  <div className="flex items-center">
                    <img
                      src={`http://localhost:8000/uploads/${items.product.image}`}
                      alt={items.product.title}
                      className="w-16 h-16 object-cover mr-4"
                    />
                   
                  </div>
                </td>
                <td> {items.product.title}</td>
                <td>${items.product.price}</td>
               
              
                <td>
                  <button className="text-red-500" onClick={(e) => handleRemoveItem(e,items.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <Link to={'/'}>
        <button className="mt-4 text-white bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-600" >
          Go To Home
        </button></Link>
      </div>
    </div>
  )
}

export default Wishlist
