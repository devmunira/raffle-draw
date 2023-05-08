const express = require('express');
require('dotenv').config()
const app = express();
const morgan =require('morgan');
const cors = require('cors')

// MIDDLEWARE ADD
app.use([express.json() , express.urlencoded({extended : true}) , morgan('dev') , cors()]);
app.use('/api/v1' , require('./router/api'))

// GLOBAL ERROR HANDELAR
app.use((_req,_res,next) => {
    const error = new Error('404 Not Found')
    error.status = 404
    next(error)
})

app.use((error,_req,res,_next)=>{
    if(error.status){
        res.status(error.status).json({
            message : error.message
        })
    }else{
        res.status(500).json({message : error})
    }

})
// PORT
const PORT = process.env.SERVER_PORT || 4000

// SERVER IS LISTENING ON PORT 4000
app.listen(PORT , (req,res) => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})