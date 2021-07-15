require("dotenv").config();
const mongoose  = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-Parser");
const compression = require("compression");
const routes = require("../backend/routes/index.router");
const uri = process.env.DB_URL;

// let test = (req,res) => {
//     res.send ("Hey");
// } 
// app.get('/',test)

// app.get('/contact',(req,res) => {
//     res.send('welcome to contact');
// })

// const uri = "mongodb+srv://project1:harsh1234@cluster0.digtr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// const uri = "DB_URL";

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then((data) => {
        console.log("DB_CONNECTED");
    })
    .catch((err) => {
        console.log(err);
    });

    app.use(cors());
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(compression());
    app.use("/uploads", express.static("uploads"));

    app.use("/api",routes);
    const port = process.env.port || 4000;
    app.listen(port,() => {
    console.log('Server is Listening');
})