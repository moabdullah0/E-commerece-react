import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const ProductContext = createContext({});
export const AllProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the list of products from the server
    axios
      .get('http://127.0.0.1:8000/api/show-product')
      .then((response) => {
        setProducts(response.data.Product); // Assuming "product" is the key containing the array
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Define the deleteProduct function
  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:8000/api/delete-product/${id}`)
      .then((response) => {
        // Handle success, e.g., remove the deleted product from the UI
        console.log('Product deleted successfully.');
      })
      .catch((error) => {
        // Handle error, e.g., show an error message to the user
        console.error('Error deleting product:', error);
      });
  };

  return (
    <ProductContext.Provider value={{ products, deleteProduct }}>
    {children}
  </ProductContext.Provider>
  );
};


export default function useProductContext() {
    return useContext(ProductContext);
  }