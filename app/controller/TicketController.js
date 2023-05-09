const {WriteFile, ReadFile} = require("../helper/file");
const Ticket = require("../../model/Ticket");
const {createTicketService, getSingleTicketService, deleteSingleTicketById, bulkCreateTicketService, deletetickets} = require("../service/TicketService");

// TODO:['pagination','testing'] 

// ticket add to file
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

// bulk ticket add to file
exports.bulkTicketCreate = (req, res, next) => {
    try {
        const {price, username , qnty} = req.body;
        bulkCreateTicketService({price, username , qnty})
        res.status(201).json({message: qnty + " Tickets Created Successfully"})
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

        if (filter !== undefined) {
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
                if (limit) {
                    result = result.splice(0, limit)
                }                
                
                result = {
                    meta: {
                        pagination: {
                            page: parseInt(page),
                            pageSize: parseInt(limit) ?? 5, //5
                            pageCount: Math.ceil(result.length / limit ?? 5), // 2
                            total: result.length //10
                        },
                    data: [...result],
                    }
                }
        }else {
            if (skip) {
                data = data.splice(skip)
            }
            if (sort) {
                if (sort == 'asc') {
                    data = data.sort((a, b) => {
                        return parseFloat(a.price) - parseFloat(b.price);
                    })
                } else {
                    data = data.sort((a, b) => {
                        return parseFloat(b.price) - parseFloat(a.price);
                    })
                }

            }
            if (limit) {
                data = data.splice(0, limit)
            }
            result = {
                meta: {
                    pagination: {
                        page: 1,
                        pageSize: parseInt(limit) ?? 5,
                        pageCount: Math.ceil(data.length / parseInt(limit) ?? 5),
                        total: data.length
                    }
                },
                data: [...data],
            }
        }



        if (Object.keys(result).length == 0) {
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


// get single ticket by id
exports.getSingleTicketById = (req, res, next) => {
    try {
        const {id} = req.params;
        const ticket = getSingleTicketService(id)
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

// get tickets collection by username
exports.getTicketsByUsername = (req, res, next) => {
    try {
        const {username} = req.params;
        const tickets = ReadFile('Ticket.json').data.filter((item,index) => item.username == username);
        res.status(200).send(tickets)
    } catch (error) {
        next(error.message);
    }
}

// create or update ticket by put request
exports.updateOrCreateTicket = (req, res, next) => {
    try {
        const {price, username} = req.body;
        const {id} = req.params;
        const file = ReadFile('Ticket.json');
        const ticket = getSingleTicketService(id)
        if (!ticket) {
            const objNew = {
                data: [
                    ...file.data, {
                        ...new Ticket("demo", price)
                    }
                ],
                meta: {
                    ...file.meta
                }
            }
            WriteFile('./db/Ticket.json', objNew);
        } else {
            const t = {
                price: price ?? ticket.price,
                username: username ?? ticket.username,
                createAt: ticket.createAt,
                updatedAt: ticket.updatedAt,
                id: ticket.id
            }
            const objOld = {
                data: [
                    ...file.data, {
                        ...t
                    }
                ],
                meta: {
                    ...file.meta
                }
            }
            WriteFile('./db/Ticket.json', objOld);
        }

        res
            .status(201)
            .json({message: "Ticket Updated Successfully", data: file})

    } catch (err) {
        console.log(err)
        let error = err.message;
        error.status = 400;
        next(error)
    }
}

// delete tickets collection by username
exports.deleteTicketsByUsername = (req, res, next) => {
    try {
        const {username} = req.params;
        deletetickets(username,'username')
        res
            .status(202)
            .json({message: "Data Deleted Successfully"})
    } catch (error) {
        next(error.message);
    }
}
// delete single ticket by id
exports.deleteSingleTicket = (req, res, next) => {
    try {
        const {id} = req.params;
        deletetickets(id,'id')
        res
            .status(202)
            .json({message: "Data Deleted Successfully"})
    } catch (error) {
        next(error.message);
    }
}

// draw winner
exports.drawWinner = (req,res,next) => {
    try {
        let data = ReadFile('Ticket.json').data;
        console.log(data)
        let count = req.query.count ?? 3;
        const winners = [];
        if(data.length > 0){
            for(let i = 0 ; i < count ; i++){
                var item = data[Math.floor(Math.random()*data.length)];
                if(!winners.includes(item)){
                    winners.push(item)
                }else{
                    i--;
                }
            }

            res.status(202)
            .json({message: "Hurray! Winners are here" , winners : {...winners}})
        }else{
            res.status(202)
            .json({message: "Plaese Add some tickets to your db first"})
        }
        
    } catch (error) {
        next(error.message);
    }
}

