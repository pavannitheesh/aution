import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuctionItemCard = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
   navigate(`/auction/${item._id}`);
  };

return (
   <div className="auction-item-card cursor-pointer bg-white shadow-md rounded-lg p-4 m-2" onClick={handleClick}>
       <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
       <img src={item.imageUrl} alt={item.name} className="max-w-full h-48 object-cover rounded-md mb-2"/>
      <p className="text-gray-700 mb-1">Current Bid: ${item.currentBid}</p>
       <p className="text-gray-500">End Time : {item.endTime}</p>
   </div>
);
};

export default AuctionItemCard;