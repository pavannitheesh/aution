import React, { useState, useEffect } from 'react';
import AuctionItemCard from '../components/AuctionItem/AuctionItemCard';
 import axios from 'axios';
 import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';

  const HomePage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAuctions = async () => {
     try{
           const res = await axios.get('http://localhost:5000/api/auctions');
          setItems(res.data)
      }catch(error){
        console.log(error.message)
      }finally {
          setLoading(false);
      }
   };
      fetchAuctions();
    }, []);

     if(loading){
      return <LoadingSpinner/>
     }

    return (
        <div className="container mx-auto p-4">
         <div className='flex justify-between items-center'>
           <h1 className="text-3xl font-semibold mb-4">Auction Items</h1>
           <Link to='/add-product' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Add Product</Link>
          </div>
         <div className='flex flex-wrap justify-center'>
            {items.map((item) => (
             <AuctionItemCard key={item._id} item={item} />
            ))}
          </div>
        </div>
     );
  };

   export default HomePage;