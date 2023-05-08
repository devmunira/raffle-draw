const shortId = require("shortid")

/**
 * Create New Ticket object
 * @param {string} username
 * @param {number} price
 * @return {Tickets[]} Tickets Collections
 */

class Ticket {
    constructor(price,username){
        this.id = shortId.generate();
        this.username = username
        this.price = price
        this.createdAt = new Date()
        this.updatedAt = new Date()
    };
}

module.exports = Ticket

