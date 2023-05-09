const {
    CreateTicket,
    getAllTickets,
    updateOrCreateTicket,
    deleteSingleTicket,
    bulkTicketCreate,
    getSingleTicketById,
    getTicketsByUsername,
    deleteTicketsByUsername,
    drawWinner
} = require('../app/controller/TicketController');

const router = require('express').Router();

router.get('/health', (_req, res) => res.status(200).json({messgae: "API health is ok"}));
router.get('/tickets/draw' , drawWinner)
router.post('/tickets/bulk' , bulkTicketCreate)
router.delete('/tickets/:username' , deleteTicketsByUsername)
router.get('/tickets/username/:username' , getTicketsByUsername)
router
    .route('/tickets/:id')
    .get(getSingleTicketById)
    .put(updateOrCreateTicket)
    .delete(deleteSingleTicket);
router
    .route('/tickets')
    .post(CreateTicket)
    .get(getAllTickets);


module.exports = router