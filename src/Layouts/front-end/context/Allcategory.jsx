import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const CategoryContext = createContext({});

export const AllCategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  

  useEffect(() => {
    // Fetch the list of categories from the server
    axios
      .get('http://127.0.0.1:8000/api/show-category')
      .then((response) => {
        setCategories(response.data.Category); // Assuming your API response directly contains an array of categories
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Define the deleteCategory function
  const deleteCategory = (id) => {
    axios
      .delete(`http://localhost:8000/api/delete-category/${id}`)
      .then((response) => {
        // Handle success, e.g., remove the deleted category from the UI
        console.log('Category deleted successfully.');
      })
      .catch((error) => {
        // Handle error, e.g., show an error message to the user
        console.error('Error deleting category:', error);
      });
  };

  // ...
  
  return (
    <CategoryContext.Provider value={{ categories, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default function useCategoryContext() {
  return useContext(CategoryContext);
}
