import { useState } from 'react';
import axios from 'axios';

export function useFirebaseAuth(){
   const [ error, setError ] = useState(null);
   const [ loading, setLoading ] = useState(false);

   const signup = async (username, email, password) => {
       setLoading(true)
       try{
         const res = await axios.post('http://localhost:5000/api/auth/signup', { username, email, password })
          return res.data
       }catch (error){
         setError(error.response.data.message)
       }finally{
          setLoading(false)
       }
   }
   const login = async (email, password) => {
     setLoading(true);
     try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {email, password})
         return res.data
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
   };

   return {signup,login, error, loading }
}