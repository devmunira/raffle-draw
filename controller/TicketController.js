const {WriteFile, ReadFile} = require("../helper/file");
const Ticket = require("../model/Ticket")

// Ticket Add to file
exports.CreateTicket = (req, res, next) => {
    try {
        const {name, price, qnty} = req.body;
        const data = ReadFile('Ticket.json');
        const body = new Ticket(name, price, qnty)
        WriteFile('./db/Ticket.json', [
            ...data, {
                ...body
            }
        ]);
        res
            .status(201)
            .json({message: "Ticket Created Successfully", ticket: {
                    body
                }})

    } catch (err) {
        let error = err.message;
        error.status = 400;
        next(error)
    }
}

// All tickets get from file
exports.getAllTickets = (_, res, next) => {
    try {
        const data = ReadFile('Ticket.json');
        if (data.length == 0) {
            let error = 'No Tickets Found';
            error.status = 404;
            next(error);
        } else {
            res
                .status(200)
                .send(data)
        }
    } catch (error) {
        next(error.message);
    }

}

// get single ticket
exports.getSingleTicket = (req, res, next) => {
    try {
        const {id} = req.params;
        const data = ReadFile('Ticket.json');
        const ticket = data.find((item) => item.id == id)
        if (!ticket) {
            let error = 'No Ticket Found';
            error.status = 404;
            next(error);
        } else {
            res
                .status(200)
                .send(ticket)
        }
    } catch (error) {
        next(error.message);
    }
}

// create or update ticket by put request
exports.CreateTicket = (req, res, next) => {
    try {
        const {name, price, qnty} = req.body;
        const data = ReadFile('Ticket.json');
        const body = new Ticket(name, price, qnty)
        WriteFile('./db/Ticket.json', [
            ...data, {
                ...body
            }
        ]);
        res
            .status(201)
            .json({message: "Ticket Created Successfully", ticket: {
                    body
                }})

    } catch (err) {
        let error = err.message;
        error.status = 400;
        next(error)
    }
}

