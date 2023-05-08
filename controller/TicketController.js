const {WriteFile, ReadFile} = require("../helper/file");
const Ticket = require("../model/Ticket");
const {createTicketService} = require("../service/TicketService");


//TODO:['draw','pagination','code structure','testing','remove file']

// Single ticket add to file
exports.CreateTicket = (req, res, next) => {
    try {
        const {price, username} = req.body;
        const body = new Ticket(price, username)
        createTicketService({body})
        res
            .status(201)
            .json({
                message: "Ticket Created Successfully",
                ticket: {
                    ...body
                }
            })
    } catch (err) {
        let error = err.message;
        error.status = 400;
        next(error)
    }
}

// All tickets get from file
exports.getAllTickets = (req, res, next) => {
    try {
        const {filter, sort, limit, skip, page} = req.query;
        let file = ReadFile('Ticket.json');
        let data = file.data;
        let result = [];
        if (Object.keys(req.query).length > 0) {
            if (filter) {
                if (filter.username) {
                    result = [
                        ...result,
                        ...data.filter((item) => item.username.toLowerCase() == filter.username.toLowerCase())
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

            if (page == 1 || !page) {
                result = {
                    data: [...result.splice(0, parseInt(limit) ?? 2)],
                    meta: {
                        pagination: {
                            page: 1,
                            pageSize: parseInt(limit) ?? 2,
                            pageCount: Math.ceil(result.length / limit ?? 2),
                            total: result.length
                        }
                    }
                }
            } else {
                result = {
                    data: [...result.splice(page - 1 * parseInt(limit) ?? 2, parseInt(limit) ?? 2)],
                    meta: {
                        pagination: {
                            page: parseInt(page),
                            pageSize: parseInt(limit) ?? 2, //5
                            pageCount: Math.ceil(result.length / limit ?? 2), // 2
                            total: result.length //10
                        }
                    }
                }
            }
        } else {
            if (page == 1 || !page) {
                result = {
                    data: [...data.splice(0, 2)],
                    meta: {
                        pagination: {
                            page: 1,
                            pageSize: 2,
                            pageCount: Math.ceil(data.length / 2),
                            total: data.length
                        }
                    }
                }
            } else {
                result = {
                    data: [...data.splice(page - 1 * 2, 2)],
                    meta: {
                        pagination: {
                            page: parseInt(page),
                            pageSize: 2, //5
                            pageCount: Math.ceil(data.length / 2), // 2
                            total: data.length //10
                        }
                    }
                }
            }
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
        const ticket = data
            .data
            .find((item) => item.id == id)
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
        const file = ReadFile('Ticket.json');
        const ticket = file
            .data
            .find((item) => item.id == id)
        if (!ticket) {
            const objNew = {
                data: [
                    ...file.data, {
                        ...new Ticket(name = "demo", price, qnty)
                    }
                ],
                meta: {
                    ...file.meta,
                    // ...file.meta.pagination.total = file.meta.pagination.total + 1
                }
            }
            WriteFile('./db/Ticket.json', objNew);
        } else {
            const t = {
                ...ticket,
                price: price ?? ticket.price,
                qnty: qnty ?? ticket.qnty
            }
            const objOld = {
                data: [
                    ...file.data, {
                        ...t
                    }
                ],
                meta: {
                    ...file.meta,
                    // ...file.meta.pagination.total = file.meta.pagination.total + 1
                }
            }
            WriteFile('./db/Ticket.json', objOld);
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
        const ticket = data
            .data
            .filter((item) => item.id !== id)
        WriteFile('./db/Ticket.json', {
            data: [...ticket],
            meta: {
                ...data.meta
            }
        });
        res
            .status(202)
            .json({message: "Data Deleted Successfully"})
    } catch (error) {
        next(error.message);
    }
}
