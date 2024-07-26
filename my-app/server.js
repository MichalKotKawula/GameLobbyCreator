const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")
require ("dotenv").config();
// {orgin:'https://festive-panini-792c33.netlify.app'}
app.use(cors({orgin:'http://localhost:3000'}));
app.use(express.json());
// "proxy": "http://localhost:3000",
 // https://festive-panini-792c33.netlify.app
//connect to mongoose
mongoose.connect("mongodb+srv://btrgrp:btr490@btr490.ekmnl.mongodb.net/accounts")

app.use("/", require("./routes/userRoute"));

app.use ((reqq,res,next)=>{
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Accesss-Control-Allow-Orgin','*');
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})
app.listen(process.env.PORT || 3001, function() {
    console.log("express server is running on port 3001")
})