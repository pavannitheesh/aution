const express = require('express');
    const { getAuctions, getAuctionById, updateBid, createAuction} = require('../controllers/auctionController');
    const { protect } = require('../middlewares/authMiddleware')

   const router = express.Router();

   router.get('/', getAuctions)
   router.get('/:id', getAuctionById);
   router.put('/:id', updateBid);
   router.post('/', createAuction);


   module.exports = router;