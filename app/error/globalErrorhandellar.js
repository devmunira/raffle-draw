const notFoundHandellar = (_req,_res,next) => {
    const error = new Error('404 Not Found')
    error.status = 404
    next(error)
}

const globalErrorHandellar = (error,_req,res,_next)=>{
    if(error.status){
        res.status(error.status).json({
            message : error.message
        })
    }else{
        res.status(500).json({message : error})
    }

};


module.exports = {
    notFoundHandellar,
    globalErrorHandellar
}
