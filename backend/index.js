const { json } = require('express');
const express = require('express');
require('dotenv').config()

const app = express();

app.use(json())

const connect = require('./src/config/db')

const controllers = require('./src/controller/user.controller')

app.use('',controllers)

const port = process.env.PORT || 4500

app.get('/',(req,res) => {
    res.send('Home page of Cointab')
})

app.listen(port,(req,res) => {
    connect();
    console.log("listning on "+`http://localhost:${port}`);
})

