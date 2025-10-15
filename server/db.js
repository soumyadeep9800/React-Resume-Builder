const mongoose=require('mongoose');
require('dotenv').config();
//const mongoURL='mongodb://localhost:27017/resume-builder'; // for local db

//const mongoURL='mongodb://admin:qwerty@mongo:27017/resume-builder?authSource=admin'; //for docker db

const mongoURL=process.env.DB_ATLAS_URL; //global db

mongoose.connect(mongoURL)
    .then(()=> console.log('connected to MongoDB server'))
    .catch((err)=> console.log('Mongodb connection error',err));

const db=mongoose.connection;

module.exports=db;