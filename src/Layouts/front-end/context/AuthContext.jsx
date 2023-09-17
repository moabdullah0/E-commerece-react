import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});


 


export const AuthProvider = ({ children  }) => {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const csrf = async () => {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie',{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_Token')}`,
      },
    });
  };
  console.log("css",csrf())
  const getUser = async () => {
   
  const {data} = await axios.get('http://localhost:8000/api/user', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_Token')}`,
      },
    });
    
    setUser(data);
  };
 


  async function handleLogin({ ...data }) {
  try {
  


    // Now, send the POST request with the login data
    axios.post('http://localhost:8000/api/login', data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then(response => {
      if (response.data.status === 200) {
     
        const token = response.data.token.split('|')[1];


        axios.get('http://127.0.0.1:8000/api/user', {
        
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((userResponse) => {
          // Handle the response from the /api/user endpoint here
          console.log(userResponse.data);
        }).catch((userError) => {
          // Handle errors for the /api/user request here
          console.error(userError);
        });

        localStorage.setItem('user-info', JSON.stringify(response.data));
        localStorage.setItem('access_Token', token);
        navigate('/');
      }
    }).catch(error => {
      console.error('Login Error:', error);
    });
  } catch (error) {
    // Handle any errors here
    console.error('CSRF Cookie Error:', error);
  }
}

  
async function handleSignup({ ...data }) {
  try {
    // First, get the CSRF token cookie
  

    // Now, send the POST request with the registration data
    axios.post('http://localhost:8000/api/register', data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then(response => {
      if (response.data.status === 200) {
        // Extract the Bearer token from the response data and remove double quotes
        const token = response.data.token.split('|')[1];

        axios.get('http://127.0.0.1:8000/api/user', {
          // Include the Bearer token in the headers
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((userResponse) => {
          // Handle the response from the /api/user endpoint here
          console.log(userResponse.data);
        }).catch((userError) => {
          // Handle errors for the /api/user request here
          console.error(userError);
        });

        localStorage.setItem('user-info', JSON.stringify(response.data));
        localStorage.setItem('access_Token', token);
        navigate('/');
      }
    }).catch(error => {
      console.error('Login Error:', error);
    });
  } catch (error) {
    // Handle any errors here
    console.error('CSRF Cookie Error:', error);
  } 
}

  

  return (
    <AuthContext.Provider value={{ user, errors, getUser, handleLogin, handleSignup }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
