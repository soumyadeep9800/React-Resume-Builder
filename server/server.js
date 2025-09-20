const express=require('express');
const app=express();
const db=require('./db');
const bodyParser=require('body-parser');
require('dotenv').config();
const port=process.env.PORT || 5000;

const cors = require("cors");
const corsOptions = {
  origin: ["https://react-resume-builder-seven.vercel.app/", "https://react-resume-builder.onrender.com", "http://localhost:3000"],
  methods: ['GET', 'POST', 'PUT'],
  credentials: true, // If using cookies or auth headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});


  const authRoutes = require('./routes/auth');
  app.use('/api', authRoutes);

  const forgetRoutes = require('./routes/reset');
  app.use('/forget', forgetRoutes);
  
  const googleAuth =require('./routes/googleAuth');
  app.use('/api', googleAuth);

  const sendMessage =require('./routes/contact');
  app.use('/api', sendMessage);

  const paymentRoutes=require('./routes/payment');
  app.use('/api',paymentRoutes);


app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
})