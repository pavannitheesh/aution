import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Timer from '../Timer';
import BidForm from './BidForm';
import LoadingSpinner from '../LoadingSpinner';



const AuctionDetails = () => {
 const { id } = useParams();
  const [item, setItem] = useState(null);
 const [loading, setLoading] = useState(true)

useEffect(() => {
     const fetchAuction = async () => {
      try{
          const res = await axios.get(`http://localhost:5000/api/auctions/${id}`)
          setItem(res.data)
         }catch(error){
             console.log(error)
        }finally {
          setLoading(false)
         }
    }
    fetchAuction();
  }, [id]);



  const handleBidSubmit = async (newBid) => {
    if (item && newBid > item.currentBid) {
        try{
           const res = await axios.put(`http://localhost:5000/api/auctions/${id}`,{currentBid:newBid})
           setItem(res.data);
         }catch (error){
           console.log(error.response.data.message)
          }
     }else {
      alert('bid should be higher than current bid');
    }
  };

  if(loading){
    return <LoadingSpinner/>
  }

  if (!item) {
     return <div>Item not found</div>;
  }

 return (
    <div className="container mx-auto p-4">
    <h2 className="text-3xl font-semibold mb-4">{item.name}</h2>
    <img src={item.imageUrl} alt={item.name} className="max-w-full h-96 object-cover rounded-md mb-4"/>
    <p className="text-gray-700 mb-2">Description: {item.description}</p>
     <p className="text-gray-700 mb-2">Current Bid: ${item.currentBid}</p>
    <Timer endTime={item.endTime}/>
     <BidForm onSubmitBid={handleBidSubmit} currentBid={item.currentBid} />
   </div>
   );
};

 export default AuctionDetails;