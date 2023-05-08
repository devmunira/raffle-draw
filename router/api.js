const { CreateTicket, getAllTickets, getSingleTicket, updateOrCreateTicket, deleteSingleTicket } = require('../controller/TicketController');

const router = require('express').Router();


router.get('/health' , (_req,res)=> res.status(200).json({messgae : "API health is ok"}));
router.route('/tickets/:id').get(getSingleTicket).put(updateOrCreateTicket).delete(deleteSingleTicket);
router.route('/tickets').post(CreateTicket).get(getAllTickets);



module.exports =  router