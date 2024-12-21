const asyncHandler = require('express-async-handler');
const Auction = require('../models/auctionModel')


//@desc Get all auctions
//@route GET /api/auctions
//@access Public
const getAuctions = asyncHandler(async (req, res) => {
 const auctions = await Auction.find()
 res.status(200).json(auctions)
})

//@desc Get a single auction by id
//@route GET /api/auctions/:id
//@access Public
const getAuctionById = asyncHandler(async (req, res) => {
 const auction = await Auction.findById(req.params.id)
 if(auction){
   res.status(200).json(auction)
 }else{
   res.status(404)
   throw new Error('Auction not found');
 }

})
//@desc Update bid in the auction
//@route PUT /api/auctions/:id
//@access Private

const updateBid = asyncHandler(async (req, res) => {
const auction = await Auction.findById(req.params.id)
if (!auction) {
  res.status(404);
  throw new Error('Auction not found');
}
 if(req.body.currentBid > auction.currentBid){
  const updatedAuction =  await Auction.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedAuction)
 }else{
    res.status(400);
    throw new Error('Bid must be higher than current bid');
 }
})
// @desc Create a new auction
// @route POST /api/auctions
//@access Private
const createAuction = asyncHandler(async (req, res) => {
  const { name, imageUrl, description, endTime} = req.body;
  if(!name || !imageUrl || !description || !endTime){
  res.status(400);
  throw new Error('Please add all the fields')
  }
  //console.log(name+" "+imageUrl+" "+description+" "+endTime);
  const auction = await Auction.create(req.body);
  res.status(201).json(auction);
  })
  
  module.exports = {
      getAuctions,
     getAuctionById,
    updateBid,
    createAuction
  }