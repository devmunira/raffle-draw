const shortId = require("shortid")

/**
 * Create New Ticket object
 * @param {string} name
 * @param {number} price
 * @param {number} qnty
 * @return {Tickets[]} Tickets Collections
 */

class Ticket {
    constructor(name,price,qnty){
        this.id = shortId.generate();
        this.name = name
        this.price = price
        this.qnty = qnty
        this.soldQnty = 0
        this.createdAt = new Date()
        this.updatedAt = new Date()
    };
}

module.exports = Ticket

