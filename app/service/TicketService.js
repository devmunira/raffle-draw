const Ticket = require("../../model/Ticket");
const {WriteFile, ReadFile} = require("../helper/file");

/**
 * ReadFile & Write File with new data;
 * @param {Ticket{}} body
 */
exports.createTicketService = ({body}) => {
    const file = ReadFile('Ticket.json');
    const obj = {data: [...file.data, {...body}],
        meta: {...file.meta,}
    }
    WriteFile('./db/Ticket.json', obj);
}

/**
 * ReadFile & Write File with bulk data;
 * @param {Tickets[]} body
 */
exports.bulkCreateTicketService = ({price , username , qnty}) => {
    console.time('start')
    const file = ReadFile('Ticket.json');
    let newTicketsArray = [];
    for(let i = 0 ; i < qnty ; i++){
        const body = new Ticket(price, username)
        newTicketsArray.push(body);
    } 
    const obj = {data: [...file.data, ...newTicketsArray],
        meta: {...file.meta,}
    }
    WriteFile('./db/Ticket.json', obj);
    console.timeEnd('end')
}

/**
 * 
 * @param {string} id 
 * @returns single ticket by id
 */

exports.getSingleTicketService = (id) => {
    const data = ReadFile('Ticket.json');
    return data.data.find((item) => item.id == id)
}



/**
 * 
 * @param {string} val 
 * @param {string} key 
 * @returns delete tickets
 */

exports.deletetickets = (val , key) => {
    const data = ReadFile('Ticket.json');
        const ticket = data.data.filter((item) => item[key] !== val)
        WriteFile('./db/Ticket.json', {data: [...ticket],meta: {...data.meta}
    });
}
