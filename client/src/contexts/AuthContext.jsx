import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
       const storedUser = localStorage.getItem('user')

        if(storedUser){
         setUser(JSON.parse(storedUser))
       }
       setLoading(false)

   }, [])


  const login = async (userData) =>{
       localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
  }


  const logout = () => {
      localStorage.removeItem('user')
    setUser(null)
  }



  const value = {
    user,
    loading,
    login,
     logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}