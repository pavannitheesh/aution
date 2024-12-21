import React, { useState } from 'react';
 import { useAuth } from '../../contexts/AuthContext';
const BidForm = ({ onSubmitBid, currentBid }) => {
  const [newBid, setNewBid] = useState(currentBid + 1);
  const { user } = useAuth()

   const handleSubmit = (e) => {
      e.preventDefault();
      if(user)
        onSubmitBid(newBid);
      else{
          alert('Please Log in first')
       }
   };

return (
   <form onSubmit={handleSubmit} className="mt-4 flex items-center">
        <input
          type="number"
          value={newBid}
         onChange={(e) => setNewBid(parseInt(e.target.value, 10))}
          min={currentBid + 1}
         className="border rounded p-2 mr-2"
       />
       <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Place Bid</button>
      </form>
  );
 };

 export default BidForm;