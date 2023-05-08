const fs = require('fs')
const path = require('path')


/**
 * Fatch data from file
 * @param {string} path 
 * @returns {data[]} filedata Collection
 */
exports.ReadFile = (url) => {
    let data = fs.readFileSync(path.resolve('db' , url));
    return JSON.parse(data)
}


/**
 * Update data in file
 * @param {string} path
 * @param {string{}} data
 * @returns {data[]} filedata Collection
 */
exports.WriteFile =  (url,data) => {
    return fs.writeFileSync(path.resolve(url) , JSON.stringify(data));
}