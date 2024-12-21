import React, { useState } from 'react';
import { useFirebaseAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
 import LoadingSpinner from '../LoadingSpinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const { login, error, loading} = useFirebaseAuth();
  const { login:loginContext} = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData =  await login(email, password)
    if(userData) {
      loginContext(userData)
      navigate('/')
    }

  };

   if(loading){
     return <LoadingSpinner/>
   }


  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
         {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
      </form>
    </div>
  );
};

export default Login;