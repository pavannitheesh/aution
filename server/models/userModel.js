const mongoose = require('mongoose')

  const userSchema = new mongoose.Schema({
    username: {
     type: String,
     required: [true, 'Please provide a username']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
     unique: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        "Please provide a valid email"
       ]
     },
     password: {
      type: String,
      required: [true, 'Please add a password'],
      minLength: 6,
    }
  })

 module.exports = mongoose.model('User', userSchema)