const express = require('express');
require('dotenv').config()
const app = express();
const morgan =require('morgan');
const cors = require('cors')

// MIDDLEWARE ADD
app.use(express.json()); //parses incoming requests with JSON payloads 
app.use(express.urlencoded({extended : true})); // get form data from url
app.use(morgan('dev')) //log HTTP requests and errors, and simplifies the process
app.use(cors())
app.use(require('./router/web')) //router

// GLOBAL ERROR HANDELAR
app.use((_req,_res,next) => {
    const error = new Error('404 Not Found')
    error.status = 404
    next(error)
})

app.use((error,_req,res,_next)=>{
    if(error.status){
        res.status(error.status).send(`<h1>${error.message}</h1>`)
    }else{
        res.status(500).send('<h1>SERVER ERROR HAPPENS</h1>')
    }

})
// PORT
const PORT = process.env.SERVER_PORT || 4000

// SERVER IS LISTENING ON PORT 4000
app.listen(PORT , (req,res) => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})