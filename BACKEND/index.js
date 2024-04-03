const express = require('express');
const mongoose = require('mongoose'); 
const Users = require('./Routes/user');
const Product=require('./Routes/products')
const cors = require('cors');
require('dotenv').config();
const url = process.env.USER_DB;

const app = express();
app.use(cors());

mongoose.connect(url); 
const con = mongoose.connection;

con.on('open', () => {
    console.log("DB connected");
});
app.use(express.json());
app.use('/user', Users);
app.use(express.json());
app.use('/products',Product)

app.listen(9000, () => {
    console.log("Server listening on port 9000");
});
