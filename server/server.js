const express=require('express');
const app=express();
const port=3001;
const db=require('./db');
const bodyParser=require('body-parser');
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
  });









app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
})