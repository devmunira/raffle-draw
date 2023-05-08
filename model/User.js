/**
 * Create New User object
 * @param {string} name
 * @param {string} email
 * @return {Users{}} Users Collections
 */

class User {
    constructor(name,email){
        this.name = name
        this.email = email
        this.createdAt = new Date()
        this.updatedAt = new Date()
    };
}

module.exports = User

