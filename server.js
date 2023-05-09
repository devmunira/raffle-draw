const express = require('express');
const { notFoundHandellar, globalErrorHandellar } = require('./app/error/globalErrorhandellar');
require('dotenv').config()
const app = express();

// MIDDLEWARE ADD
app.use(require('./app/middleware/middleware'))
app.use('/api/v1' , require('./router/api'))
app.use(notFoundHandellar)
app.use(globalErrorHandellar)


// PORT
const PORT = process.env.SERVER_PORT || 4000

// SERVER IS LISTENING ON PORT 4000
app.listen(PORT , (req,res) => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})