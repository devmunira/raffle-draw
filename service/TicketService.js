const { WriteFile, ReadFile } = require("../helper/file");

/**
 * ReadFile & Write File with new data;
 * @param {Ticket{}} body 
 */
exports.createTicketService = ({body}) => {
    const file = ReadFile('Ticket.json');
    const obj = {
        data: [
            ...file.data, {
                ...body
            }
        ],
        meta: {
            ...file.meta,
            ...file.meta.pagination.total = file.meta.pagination.total + 1
        }
    }
   WriteFile('./db/Ticket.json', obj);
}
