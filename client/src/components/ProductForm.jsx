import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
const ProductForm = () => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
 const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);
 const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
     setLoading(true)
    try {
       await axios.post('http://localhost:5000/api/auctions', { name, imageUrl, description, endTime });
       navigate('/')
    } catch (error) {
        console.log(error.response.data.message)
     }finally{
         setLoading(false);
    }
  };

   if (loading) {
     return <LoadingSpinner/>
  }


 return (
     <div className="flex flex-col justify-center items-center h-screen">
       <h2 className="text-2xl mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
           <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        </div>
          <div className="mb-4">
           <label className="block text-gray-700 text-sm font-bold mb-2">Image URL:</label>
           <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
           <textarea value={description} onChange={(e) => setDescription(e.target.value)}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
         </div>
          <div className="mb-6">
           <label className="block text-gray-700 text-sm font-bold mb-2">End Time:</label>
             <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
         </div>
         <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Product</button>
        </form>
    </div>
  );
};

 export default ProductForm;