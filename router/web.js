const router = require('express').Router();
const { error } = require('console');
const {readFile,write} = require('fs')


const sendStaticPageResponse = (res , {page='./pages/index.html' , status=200}) => {
    readFile(page , (err,data)=>{
        if(err){
            res.status(404)
            res.write('Error Eccours')
            res.end()
        }else{
            res.status(status)
            res.write(data)
            res.end()
        }
    })
}


// ROUTE DECLARE
router.get('/', (req, res) => {
    sendStaticPageResponse(res, {
        page: './pages/index.html',
        status: 200
    })
});

router.get('/about', (req, res,next) => {
    try {
        sendStaticPageResponse(res, {
            page: './pages/about.html',
            status: 200
        })
    } catch (err) {
        const error = new Error(err.mesaage);
        error.status = 401;
        throw error
    }
});

router.get('/contact', (req, res) => {
    sendStaticPageResponse(res, {
        page: './pages/contact.html',
        status: 200
    })
});

module.exports =  router