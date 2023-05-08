const { CreateTicket, getAllTickets, getSingleTicket } = require('../controller/TicketController');

const router = require('express').Router();


router.get('/health' , (_req,res)=> res.status(200).json({messgae : "API health is ok"}));
router.route('/tickets/:id').get(getSingleTicket);
router.route('/tickets').post(CreateTicket).get(getAllTickets);



module.exports =  router