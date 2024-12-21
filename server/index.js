const express = require('express');
 const dotenv = require('dotenv').config();
 const cors = require('cors');
const connectDB = require('./config/db');
 const authRoutes = require('./routes/authRoutes')
 const auctionRoutes = require('./routes/auctionRoutes');
 const { errorHandler } = require('./middlewares/errorMiddleware');


  const port = process.env.PORT || 5000;

   connectDB();

   const app = express();

   //Middleware
   app.use(express.json());
   app.use(express.urlencoded({extended:false}))
   app.use(cors());


  // Routes
   app.use('/api/auth', authRoutes)
  app.use('/api/auctions', auctionRoutes)

  //Error Handling
  app.use(errorHandler)


  app.listen(port, () => console.log(`Server running on port ${port}`));