const express = require("express");
const app = express();

let test = (req,res) => {
    res.send (`"Hey Harsh" from Ghanasvi`);
} 
app.get('/',test)

app.get('/contact',(req,res) => {
    res.send('welcome to contact');
})

const port = 3000;
app.listen(port,() => {
    console.log('server is listening');
})

// const express=require("express");
// const app=express();

// app.get('/',(req,res) => {
//     res.send('welcome');
// }) 

// const port = 3000;
// app.listen(port,()=>{
//     console.log('server is listening');
// })
