const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


//@desc Register a user
//@route POST /api/auth/signup
//@access Public
const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

    if(!username || !email || !password){
      res.status(400);
      throw new Error('Please add all fields');
    }

  const userExists = await User.findOne({ email });

  if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
   //Hash Password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);


   const user = await User.create({
      username,
      email,
      password: hashedPassword,
   })

   if(user){
      res.status(201).json({
        _id: user.id,
       username: user.username,
       email: user.email,
       token: generateToken(user._id)
     })
   }else {
      res.status(400);
      throw new Error('Invalid User data')
   }
})


//@desc Login a user
//@route POST /api/auth/login
//@access Public
const login = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

    if(!email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

   const user = await User.findOne({ email })

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
          _id: user.id,
          username: user.username,
          email: user.email,
         token: generateToken(user._id)
        })
     }else{
          res.status(400)
         throw new Error('Invalid credentials')
     }
 })


 //@desc Logout a user
//@route POST /api/auth/logout
//@access Public
  const logout = (req, res) => {
    res.status(200).json({message:'logout successful'})
  }

 const generateToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  })
 }
module.exports = { signup, login, logout };