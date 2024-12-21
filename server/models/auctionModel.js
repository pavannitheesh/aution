const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
name: { type: String, required: true },
imageUrl: { type: String, required: true },
description: { type: String },
currentBid: { type: Number, default: 0 },
endTime: { type: Date, required: true },
});

module.exports = mongoose.model('Auction', auctionSchema);