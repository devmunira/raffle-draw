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
exports.getAllTickets = (req, res, next) => {
    try {
        const {filter, sort, limit, skip} = req.query;
        const data = ReadFile('Ticket.json');
        let result = [];

        if (Object.keys(req.query).length > 0) {
            if (filter) {
                if (filter.name) {
                    result = [
                        ...result,
                        ...data.filter((item) => item.name.toLowerCase() == filter.name.toLowerCase())
                    ];
                }
                if (filter.price) {
                    result = result.length == 0
                        ? data.filter((item) => parseInt(item.price) === parseInt(filter.price))
                        : result.filter((item) => parseInt(item.price) === parseInt(filter.price))
                }
                if (filter.qnty) {
                    result = result.length == 0
                        ? data.filter((item) => parseInt(item.qnty) === parseInt(filter.qnty))
                        : result.filter((item) => parseInt(item.qnty) === parseInt(filter.qnty))
                }

                if (skip) {
                    result = result.splice(skip)
                }

                if (limit) {
                    result = result.splice(0, limit)
                }

                if (sort) {
                    if (sort == 'asc') {
                        result = result.sort((a, b) => {
                            return parseFloat(a.price) - parseFloat(b.price);
                        })
                    } else {
                        result = result.sort((a, b) => {
                            return parseFloat(b.price) - parseFloat(a.price);
                        })
                    }

                }
            } else if (!filter) {
                if (skip) {
                    result = data.splice(skip)
                }
                if (limit) {
                    result = result.length == 0
                        ? data.splice(0, limit)
                        : result.splice(0, limit)
                }

                if (sort) {
                    result = result.length == 0
                        ? data
                        : result;
                    if (sort == 'asc') {
                        result = result.sort((a, b) => {
                            return parseFloat(a.price) - parseFloat(b.price);
                        })
                    } else {
                        result = result.sort((a, b) => {
                            return parseFloat(b.price) - parseFloat(a.price);
                        })
                    }

                }
            }

            result = [...result , result['meta'] => {count : 1}]
        } else {
            result = [...data , {count : data.length}];
        }

        if (result.length == 0) {
            let error = 'No Tickets Found';
            error.status = 404;
            next(error);
        } else {
            res
                .status(200)
                .send(result)
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
exports.updateOrCreateTicket = (req, res, next) => {
    try {
        const {price, qnty} = req.body;
        const {id} = req.params;
        const data = ReadFile('Ticket.json');
        const ticket = data.find((item) => item.id == id)
        if (!ticket) {
            WriteFile('./db/Ticket.json', [
                ...data, {
                    ...new Ticket(name = "demo", price, qnty)
                }
            ]);
        } else {
            ticket.price = price ?? ticket.price
            ticket.qnty = qnty ?? ticket.qnty
            WriteFile('./db/Ticket.json', data);
        }

        res
            .status(201)
            .json({message: "Ticket Updated Successfully"})

    } catch (err) {
        let error = err.message;
        error.status = 400;
        next(error)
    }
}

// delete single ticket by id
exports.deleteSingleTicket = (req, res, next) => {
    try {
        const {id} = req.params;
        const data = ReadFile('Ticket.json');
        const ticket = data.filter((item) => item.id !== id)
        WriteFile('./db/Ticket.json', ticket);
        res
            .status(202)
            .json({message: "Data Deleted Successfully"})
    } catch (error) {
        next(error.message);
    }
}
