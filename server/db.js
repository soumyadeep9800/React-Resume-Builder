const mongoose=require('mongoose');
require('dotenv').config();
// const mongoURL='mongodb://localhost:27017/resume-builder'; //local
const mongoURL=process.env.DB_ATLAS_URL;

mongoose.connect(mongoURL)
    .then(()=> console.log('connected to MongoDB server'))
    .catch((err)=> console.log('Mongodb connection error',err));

const db=mongoose.connection;

module.exports=db;