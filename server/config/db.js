const mongoose = require('mongoose')

const connectDB = async () => {
try{
const connect = await mongoose.connect(process.env.MONGO_URL);
console.log('MongoDB connected successfully:',connect.connection.host);
}catch(err){
console.log(`Error connecting to mongoDB:${err.message}`);
process.exit(1)
}
}

module.exports = connectDB;